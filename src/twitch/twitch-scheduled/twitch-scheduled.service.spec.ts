import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TwitchScheduledService } from './twitch-scheduled.service';
import { TwitchFollowSchema } from '../twitch-follow/twitch-follow.model';
import { TwitchBroadcastSchema } from '../twitch-broadcast/twitch-broadcast.model';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test-utils/mongo/MongooseTestModule';
import { TwitchBroadcastService } from '../twitch-broadcast/twitch-broadcast.service';
import { TwitchFollowService } from '../twitch-follow/twitch-follow.service';
import { TwitchService } from '../twitch.service';
import { DiscordModule } from '../../discord/discord.module';
import { ConfigModule } from '../../config/config.module';

describe('TwitchScheduledService', () => {
  let service: TwitchScheduledService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'TwitchFollow', schema: TwitchFollowSchema },
          { name: 'TwitchBroadcast', schema: TwitchBroadcastSchema },
        ]),
        DiscordModule,
        ConfigModule,
      ],
      providers: [
        TwitchScheduledService,
        TwitchBroadcastService,
        TwitchFollowService,
        TwitchService,
      ],
    }).compile();

    service = module.get<TwitchScheduledService>(TwitchScheduledService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
