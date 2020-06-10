import { Injectable, Logger } from '@nestjs/common';
import { Client, Message } from 'discord.js';

import { ICommandService } from '../discord/interfaces/ICommandService';
import { HelpHandler } from './help/help.handler';
import { WebelecoinDailyHandler } from './webelecoin/webelecoin-daily/webelecoin-daily.handler';
import { WebelecoinBalanceHandler } from './webelecoin/webelecoin-balance/webelecoin-balance.handler';
import { WebelecoinGrantHandler } from './webelecoin/webelecoin-grant/webelecoin-grant.handler';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandService[] = [];

  constructor(
    private readonly helpHandler: HelpHandler,
    private readonly webelecoinDailyHandler: WebelecoinDailyHandler,
    private readonly webelecoinBalanceHandler: WebelecoinBalanceHandler,
    private readonly webelecoinGrantHandler: WebelecoinGrantHandler,
  ) {
    this.commandHandlers = [
      helpHandler,
      webelecoinDailyHandler,
      webelecoinBalanceHandler,
      webelecoinGrantHandler,
    ];
  }
  register(client: Client) {
    client.on('message', async message => await this.messageHandler(message));
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
          message.reply({
            embed: {
              color: 'RED',
              title: 'Unhandled error...',
              description: `**${error.message}**

${error.stack}`,
            },
          });
        }
      }
    }
  }
}
