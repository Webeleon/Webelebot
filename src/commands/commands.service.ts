import { Injectable, Logger } from '@nestjs/common';
import { Client, Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from './ICommandHandler';
import { HelpHandler } from './help/help.handler';
import { WebelecoinDailyHandler } from './webelecoin/webelecoin-daily/webelecoin-daily.handler';
import { WebelecoinBalanceHandler } from './webelecoin/webelecoin-balance/webelecoin-balance.handler';
import { WebelecoinGrantHandler } from './webelecoin/webelecoin-grant/webelecoin-grant.handler';
import { FollowTwitchHandler } from './twitch/follow-twitch/follow-twitch.handler';
import { UnfollowTwitchHandler } from './twitch/unfollow-twitch/unfollow-twitch.handler';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandHandler[] = [];

  constructor(
    private readonly helpHandler: HelpHandler,
    private readonly webelecoinDailyHandler: WebelecoinDailyHandler,
    private readonly webelecoinBalanceHandler: WebelecoinBalanceHandler,
    private readonly webelecoinGrantHandler: WebelecoinGrantHandler,

    private readonly followTwitchHandler: FollowTwitchHandler,
    private readonly unfollowTwitchHandler: UnfollowTwitchHandler,
  ) {
    this.commandHandlers = [
      helpHandler,
      webelecoinDailyHandler,
      webelecoinBalanceHandler,
      webelecoinGrantHandler,
      followTwitchHandler,
      unfollowTwitchHandler,
    ];

    for (const cmd of this.commandHandlers) {
      Logger.log(
        `${cmd.name}: ${cmd.regex || cmd.description || ''}`,
        'command loader',
      );
    }
  }
  register(client: Client) {
    client.on('message', async (message) => await this.messageHandler(message));
  }

  async messageHandler(message: Message) {
    if (message.author.bot) return;
    const { content } = message;
    for (const handler of this.commandHandlers) {
      if (handler.test(content)) {
        Logger.debug(`executing command [${handler.name}] => ${content}`);
        try {
          await handler.execute(message);
        } catch (error) {
          const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(error.message);
          message.channel.send(errorEmbed);
          Logger.error(error.message, error.stack, 'messageHandler');
        }
      }
    }
  }
}
