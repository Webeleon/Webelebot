import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { ConfigModule } from '../config/config.module';
import { DiscordModule } from '../discord/discord.module';
import { HelpHandler } from './help/help.handler';
import { WebelecoinDailyHandler } from './webelecoin/webelecoin-daily/webelecoin-daily.handler';
import { MemberModule } from '../member/member.module';
import { WebelecoinModule } from '../webelecoin/webelecoin.module';
import { WebelecoinBalanceHandler } from './webelecoin/webelecoin-balance/webelecoin-balance.handler';
import { WebelecoinGrantHandler } from './webelecoin/webelecoin-grant/webelecoin-grant.handler';
import { FollowTwitchHandler } from './twitch/follow-twitch/follow-twitch.handler';
import { UnfollowTwitchHandler } from './twitch/unfollow-twitch/unfollow-twitch.handler';
import { TwitchModule } from '../twitch/twitch.module';

@Module({
  imports: [
    ConfigModule,
    DiscordModule,
    MemberModule,
    WebelecoinModule,
    TwitchModule,
  ],
  providers: [
    CommandsService,
    HelpHandler,
    WebelecoinDailyHandler,
    WebelecoinBalanceHandler,
    WebelecoinGrantHandler,
    FollowTwitchHandler,
    UnfollowTwitchHandler,
  ],
  exports: [CommandsService],
})
export class CommandsModule {}
