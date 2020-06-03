import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { ConfigModule } from '../config/config.module';
import { DiscordModule } from '../discord/discord.module';
import { HelpHandler } from './help/help.handler';
import { WebelecoinDailyHandler } from './webelecoin/webelecoin-daily/webelecoin-daily.handler';
import { MemberModule } from '../member/member.module';
import { WebelecoinModule } from '../webelecoin/webelecoin.module';
import { WebelecoinBalanceHandler } from './webelecoin/webelecoin-balance/webelecoin-balance.handler';

@Module({
  imports: [ConfigModule, DiscordModule, MemberModule, WebelecoinModule],
  providers: [
    CommandsService,
    HelpHandler,
    WebelecoinDailyHandler,
    WebelecoinBalanceHandler,
  ],
  exports: [CommandsService],
})
export class CommandsModule {}
