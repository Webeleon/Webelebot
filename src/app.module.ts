import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DiscordModule } from './discord/discord.module';
import { ConfigService } from './config/config.service';
import { CommandsModule } from './commands/commands.module';
import { TwitchModule } from './twitch/twitch.module';

const config = new ConfigService();
@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
    ConfigModule,
    DiscordModule,
    ScheduleModule.forRoot(),
    CommandsModule,
    TwitchModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
