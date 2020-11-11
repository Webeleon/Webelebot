import { Test, TestingModule } from '@nestjs/testing';
import { FollowTwitchHandler } from './follow-twitch.handler';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { TwitchModule } from '../../../twitch/twitch.module';

describe('FollowTwitchHandler', () => {
  let service: FollowTwitchHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), TwitchModule],
      providers: [FollowTwitchHandler],
    }).compile();

    service = module.get<FollowTwitchHandler>(FollowTwitchHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
