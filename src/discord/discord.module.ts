import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [DiscordService],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
