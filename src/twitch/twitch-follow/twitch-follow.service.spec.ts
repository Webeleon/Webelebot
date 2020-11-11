import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TwitchFollowService } from './twitch-follow.service';
import { TwitchFollowSchema } from './twitch-follow.model';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test-utils/mongo/MongooseTestModule';

describe('TwitchFollowService', () => {
  let service: TwitchFollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'TwitchFollow', schema: TwitchFollowSchema },
        ]),
      ],
      providers: [TwitchFollowService],
    }).compile();

    service = module.get<TwitchFollowService>(TwitchFollowService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
