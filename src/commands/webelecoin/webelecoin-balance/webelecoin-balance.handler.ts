import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { ICommandHandler } from '../../ICommandHandler';
import { WebelecoinService } from '../../../webelecoin/webelecoin.service';

@Injectable()
export class WebelecoinBalanceHandler implements ICommandHandler {
  constructor(private readonly webelecoinService: WebelecoinService) {}

  name: 'webelecoin balance';
  test(content: string): boolean {
    return /^webelecoin balance.*/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    const [command, target] =
      message.content.match(/^webelecoin balance <@!(\d+)>/i) || [];
    const wallet = target || message.author.id;
    const balance = await this.webelecoinService.balance(wallet);
    const lastTransactions = await this.webelecoinService.getLastTransactions(
      wallet,
    );

    const title = target ? `**<@!${target}> wallet**\n` : '';
    message.channel.send({
      embed: {
        color: 'GOLD',
        description: `${title}**Current balance \`${balance}\` webelecoin**`,
        fields: lastTransactions.map(t => ({
          name: `[${t.createdAt.toDateString()}] from: ${t.from} to: ${t.to}`,
          value: `**${t.amount}** webelecoin (${t.message})`,
        })),
      },
    });
  }
}
