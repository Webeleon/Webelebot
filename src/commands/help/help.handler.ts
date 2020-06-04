import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { ICommandService } from '../../discord/interfaces/ICommandService';
import { AMOUNT_DAILY } from '../../member/member.service';

@Injectable()
export class HelpHandler implements ICommandService {
  name = 'help';
  test(content: string): boolean {
    return /^!help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply({
      embed: {
        title: 'Webelebot',
        fields: [
          {
            name: '!help',
            value: 'display this message',
          },
          {
            name: 'webelecoin daily',
            value: `Grant ${AMOUNT_DAILY} webelecoins`,
          },
          {
            name: 'webelecoin balance',
            values: `Display current account balance and last 10 transactions`,
          },
        ],
      },
    });
  }
}
