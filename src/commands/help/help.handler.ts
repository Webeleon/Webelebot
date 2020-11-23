import { Injectable } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';
import { ICommandHandler } from '../ICommandHandler';
import { AMOUNT_DAILY } from '../../member/member.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../../package.json');

@Injectable()
export class HelpHandler implements ICommandHandler {
  name = 'help';
  test(content: string): boolean {
    return /^webelebot help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    const embed = new MessageEmbed()
      .setTitle('Webelebot at your service')
      .setDescription(`v${version}`)
      .addFields([
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
          value: `Display current account balance and last 10 transactions`,
        },
      ]);
    await message.channel.send(embed);
  }
}
