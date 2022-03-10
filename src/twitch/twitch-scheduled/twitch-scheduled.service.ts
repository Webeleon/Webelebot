import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MessageEmbed, TextChannel } from 'discord.js';

import { TwitchService } from '../twitch.service';
import { TwitchFollowService } from '../twitch-follow/twitch-follow.service';
import {
  TwitchClientCredentials,
  TwitchGame,
  TwitchStream,
} from '../twitch.interfaces';
import { DiscordService } from '../../discord/discord.service';
import { TwitchBroadcastService } from '../twitch-broadcast/twitch-broadcast.service';
import { TWITCH_URL } from '../twitch.constants';

const debug = (message) => Logger.debug(message, 'TwitchScheduledService');
@Injectable()
export class TwitchScheduledService {
  constructor(
    private readonly twitch: TwitchService,
    private readonly twitchFollow: TwitchFollowService,
    private readonly twitchBroadcast: TwitchBroadcastService,
    private readonly discord: DiscordService,
  ) {}

  @Cron('* * * * *')
  async streamWatcher() {
    Logger.verbose(
      `discord ready? ${this.discord.ready}`,
      TwitchScheduledService.name,
    );
    if (!this.discord.ready) return;

    const followedChannels = await this.twitchFollow.getAllUserLogins();
    Logger.verbose(
      `followed channel count ${followedChannels.length}`,
      TwitchScheduledService.name,
    );
    if (followedChannels.length === 0) return;

    const credentials = await this.twitch.getClientCredientials();
    debug(credentials);
    const streamsUnfiltered = await this.twitch.fetchStreamByUserLogins(
      followedChannels,
      credentials,
    );
    if (!streamsUnfiltered) return;

    const streams = streamsUnfiltered.filter((stream) =>
      followedChannels.includes(stream.user_name.toLowerCase()),
    );
    if (streams.length === 0) return;

    for (const stream of streams) {
      if (await this.twitchBroadcast.hasBeenMotified(stream.id)) continue;
      await this.notify(stream, credentials);
      await this.twitchBroadcast.markAsNotified(stream.id);
    }
  }

  async notify(
    stream: TwitchStream,
    credentials: TwitchClientCredentials,
  ): Promise<void> {
    // check if already notified

    // get all channels to notify
    const game = await this.twitch.fetchGameById(stream.game_id, credentials);
    const embed = this.formatEmbed(stream, game);
    const discordClient = this.discord.client;

    const followedChannel = await this.twitchFollow.getFollowByUserLogin(
      stream.user_name.toLowerCase(),
    );
    for (const notificationChannelId of followedChannel.notificationChannels) {
      const discordChannel = await discordClient.channels.fetch(
        notificationChannelId,
      );
      await (discordChannel as TextChannel).send({ embeds: [embed] });
    }
  }

  formatEmbed(stream: TwitchStream, game: TwitchGame): MessageEmbed {
    const embed = new MessageEmbed()
      .setTitle(stream.title)
      .addField('Playing', game.name)
      .setImage(
        stream.thumbnail_url
          .replace('{width}', '1920')
          .replace('{height}', '1080'),
      )
      .setColor('GREEN')
      .setURL(`${TWITCH_URL}/${stream.user_name.toLowerCase()}`);

    if (game.box_art_url) {
      embed.setThumbnail(
        game.box_art_url.replace('{width}', '285').replace('{height}', '380'),
      );
    }

    return embed;
  }
}
