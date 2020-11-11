import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TwitchService } from './twitch.service';
import { ConfigModule } from '../config/config.module';
import { TwitchScheduledService } from './twitch-scheduled/twitch-scheduled.service';
import { TwitchFollowService } from './twitch-follow/twitch-follow.service';
import { TwitchFollowSchema } from './twitch-follow/twitch-follow.model';
import { TwitchBroadcastService } from './twitch-broadcast/twitch-broadcast.service';
import { TwitchBroadcastSchema } from './twitch-broadcast/twitch-broadcast.model';
import { DiscordModule } from '../discord/discord.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'TwitchFollow', schema: TwitchFollowSchema },
      { name: 'TwitchBroadcast', schema: TwitchBroadcastSchema },
    ]),
    DiscordModule,
  ],
  providers: [
    TwitchService,
    TwitchScheduledService,
    TwitchFollowService,
    TwitchBroadcastService,
  ],
  exports: [TwitchService, TwitchFollowService],
})
export class TwitchModule {}
