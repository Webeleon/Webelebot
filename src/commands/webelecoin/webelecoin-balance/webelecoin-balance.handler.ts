import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { ICommandService } from '../../../discord/interfaces/ICommandService';
import {
  SYSTEM_WALLET,
  WebelecoinService,
} from '../../../webelecoin/webelecoin.service';

@Injectable()
export class WebelecoinBalanceHandler implements ICommandService {
  constructor(private readonly webelecoinService: WebelecoinService) {}

  name: 'webelecoin balance';
  test(content: string): boolean {
    return /^webelecoin balance/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    const balance = await this.webelecoinService.balance(message.author.id);
    const lastTransactions = await this.webelecoinService.getLastTransactions(
      message.author.id,
    );
    message.reply({
      embed: {
        color: 'GOLD',
        description: `**Current balance \`${balance}\` :webelecoin:**`,
        fields: lastTransactions.map(t => ({
          name: `[${t.createdAt.toDateString()}] from: ${t.from} to: ${t.to}`,
          value: `**${t.amount}**:webelecoin: (${t.message})`,
        })),
      },
    });
  }
}
