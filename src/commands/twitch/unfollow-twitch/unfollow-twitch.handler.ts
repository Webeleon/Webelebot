import { Injectable, Logger } from '@nestjs/common';
import { Message, MessageEmbed, Permissions } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { TwitchFollowService } from '../../../twitch/twitch-follow/twitch-follow.service';

const debug = (...messages) =>
  Logger.debug(messages.join('\n'), 'UnfollowTwitchHandler');

@Injectable()
export class UnfollowTwitchHandler implements ICommandHandler {
  constructor(private readonly twitchFollowService: TwitchFollowService) {}
  name = 'webelebot twitch unfollow <channel name>';
  description = 'unfollow the specified twitch channel in the current channel';
  regex = /^webelebot twitch unfollow (.*)/i;

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    const requester = message.guild.members.resolve(message.author.id);
    if (!requester.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      throw new Error(
        `Only user with administrator permissions can configure twitch follow`,
      );
    }

    const [cmd, twtichUserLogin] = message.content.match(this.regex);
    debug(`unfollowing ${twtichUserLogin}`);

    await this.twitchFollowService.unfollow(
      twtichUserLogin,
      message.channel.id,
    );
    const embed = new MessageEmbed()
      .setColor('YELLOW')
      .setDescription(
        `${twtichUserLogin} will no longer be notified in this channel!`,
      );
    await message.channel.send({ embeds: [embed] });
  }
}
