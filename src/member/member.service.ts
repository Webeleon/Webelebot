import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { IMemberDocument } from './member.model';
import {
  SYSTEM_WALLET,
  WebelecoinService,
} from '../webelecoin/webelecoin.service';

export const AMOUNT_DAILY = 1;

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private memberModel: Model<IMemberDocument>,
    private readonly webelecoinService: WebelecoinService,
  ) {}

  async grantDaily(discordUserId: string): Promise<void> {
    const member = await this.getMember(discordUserId);
    if (
      !member.lastDaily ||
      moment(member.lastDaily).add(1, 'days') <= moment()
    ) {
      await this.webelecoinService.transfer(
        SYSTEM_WALLET,
        discordUserId,
        AMOUNT_DAILY,
        `daily free coin`,
      );
    } else {
      throw new Error(
        `next daily ${moment(member.lastDaily)
          .add(1, 'days')
          .fromNow()}`,
      );
    }

    member.lastDaily = new Date();
    await member.save();
  }

  async getMember(discordUserId: string): Promise<IMemberDocument> {
    const member = await this.memberModel.findOne({
      discordUserId,
    });
    if (!member) {
      return this.memberModel.create({
        discordUserId,
      });
    }
    return member;
  }
}
