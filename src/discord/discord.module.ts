import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ScheduledService } from './scheduled/scheduled.service';
import { ListenersService } from './listeners/listeners.service';

@Module({
  imports: [ConfigModule],
  providers: [
    DiscordService,
    ConfigService,
    ScheduledService,
    ListenersService,
  ],
  exports: [DiscordService, ListenersService],
  controllers: [DiscordController],
})
export class DiscordModule {}
