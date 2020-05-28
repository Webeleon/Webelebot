import { Injectable, Logger } from '@nestjs/common';
import { Client, Message } from 'discord.js';

import { ICommandService } from '../discord/interfaces/ICommandService';
import { HelpHandler } from './help/help.handler';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandService[] = [];

  constructor(private readonly helpHandler: HelpHandler) {
    this.commandHandlers = [helpHandler];
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
        await handler.execute(message);
      }
    }
  }
}
