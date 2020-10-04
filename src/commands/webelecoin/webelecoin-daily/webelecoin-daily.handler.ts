import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { AMOUNT_DAILY, MemberService } from '../../../member/member.service';
import { WebelecoinService } from '../../../webelecoin/webelecoin.service';

@Injectable()
export class WebelecoinDailyHandler implements ICommandHandler {
  constructor(
    private readonly memberService: MemberService,
    private readonly webelecoinService: WebelecoinService,
  ) {}

  name: 'webelecoin daily';
  test(content: string): boolean {
    return /^webelecoin daily$/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    try {
      await this.memberService.grantDaily(message.author.id);
      const balance = await this.webelecoinService.balance(message.author.id);
      message.reply({
        embed: {
          color: 'GREEN',
          title: `You've just got ${AMOUNT_DAILY} webelecoin.`,
          description: `** New account balance ${balance} webelecoin.**
Come back in 24h for more!`,
        },
      });
    } catch (error) {
      message.reply({
        embed: {
          color: 'RED',
          description: error.message,
        },
      });
    }
  }
}
