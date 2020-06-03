import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberService } from './member.service';
import { memberSchema } from './member.model';
import { WebelecoinModule } from '../webelecoin/webelecoin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: memberSchema }]),
    WebelecoinModule,
  ],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
