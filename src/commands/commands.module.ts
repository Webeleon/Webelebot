import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { ConfigModule } from '../config/config.module';
import { DiscordModule } from '../discord/discord.module';
import { FollowTwitchHandler } from './twitch/follow-twitch/follow-twitch.handler';
import { UnfollowTwitchHandler } from './twitch/unfollow-twitch/unfollow-twitch.handler';
import { TwitchModule } from '../twitch/twitch.module';

@Module({
  imports: [ConfigModule, DiscordModule, TwitchModule],
  providers: [CommandsService, FollowTwitchHandler, UnfollowTwitchHandler],
  exports: [CommandsService],
})
export class CommandsModule {}
