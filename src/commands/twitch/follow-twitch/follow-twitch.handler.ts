import { Injectable, Logger } from '@nestjs/common';
import { Message, MessageEmbed, Permissions } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { TwitchFollowService } from '../../../twitch/twitch-follow/twitch-follow.service';

const debug = (...messages) =>
  Logger.debug(messages.join('\n'), 'FollowTwitchHandler');
@Injectable()
export class FollowTwitchHandler implements ICommandHandler {
  constructor(private readonly twitchFollowService: TwitchFollowService) {}

  name = 'webelebot twitch follow <channel name>';
  description = 'follow the specified twitch channel in the current channel';
  regex = /^webelebot twitch follow (.*)/i;

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
    debug(`stating to follow ${twtichUserLogin} in channel ${message.channel}`);

    await this.twitchFollowService.follow(twtichUserLogin, message.channel.id);
    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(
        `${twtichUserLogin} lives will be notified in this channel`,
      );
    await message.channel.send({ embeds: [embed] });
  }
}
