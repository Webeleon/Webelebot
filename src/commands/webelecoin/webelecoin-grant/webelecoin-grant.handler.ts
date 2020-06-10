import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../../../discord/interfaces/ICommandService';
import {
  SYSTEM_WALLET,
  WebelecoinService,
} from '../../../webelecoin/webelecoin.service';

const WEBELEON_ADMIN_ID = `319169441382268928`;

@Injectable()
export class WebelecoinGrantHandler implements ICommandService {
  constructor(private readonly webelecoinService: WebelecoinService) {}
  name: 'webelecoin grant <@user> <amount>';
  test(content: string): boolean {
    return /^webelecoin grant <@!\d+> \d+ .*/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    if (message.author.id !== WEBELEON_ADMIN_ID) {
      this.sendError(message, `only webeleon admins can grant webelecoins...`);
      return;
    }
    const [command, wallet, amountRaw, reason] = message.content.match(
      /^webelecoin grant <@!(\d+)> (\d+) (.*)/i,
    );

    const amount = parseInt(amountRaw);
    if (!amount) {
      this.sendError(message, `invalid amount`);
      return;
    }

    const target = message.client.users.cache.find(user => user.id === wallet);
    if (!target) {
      this.sendError(message, `invalid target user <@!${wallet}>`);
      return;
    }

    await this.webelecoinService.transfer(
      SYSTEM_WALLET,
      wallet,
      amount,
      reason,
    );
    const balance = await this.webelecoinService.balance(wallet);

    message.channel.send({
      embed: {
        color: 'GOLD',
        description: `<@!${wallet}> have been granted: ${amount} :webelecoin:
*${reason}*`,
        fields: [{ name: `balance`, value: `${balance} :webelecoin:` }],
      },
    });
  }

  sendError(message: Message, reason: string): void {
    message.reply({
      embed: {
        title: `Grant failed: ${reason}`,
        description: `**Usage:** \`webelecoin grant @user <amount> <reason>\`
*you did:* \`${message.content}\``,
        color: 'RED',
      },
    });
  }
}
