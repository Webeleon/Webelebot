import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TwitchBroadcastService } from './twitch-broadcast.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test-utils/mongo/MongooseTestModule';
import { TwitchBroadcastSchema } from './twitch-broadcast.model';

describe('TwitchBroadcastService', () => {
  let service: TwitchBroadcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'TwitchBroadcast', schema: TwitchBroadcastSchema },
        ]),
      ],
      providers: [TwitchBroadcastService],
    }).compile();

    service = module.get<TwitchBroadcastService>(TwitchBroadcastService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
