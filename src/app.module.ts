import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DiscordModule } from './discord/discord.module';
import { ConfigService } from './config/config.service';
import { MemberModule } from './member/member.module';
import { CommandsModule } from './commands/commands.module';
import { WebelecoinModule } from './webelecoin/webelecoin.module';

const config = new ConfigService();
@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
    ConfigModule,
    DiscordModule,
    ScheduleModule.forRoot(),
    MemberModule,
    CommandsModule,
    WebelecoinModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
