import { Test, TestingModule } from '@nestjs/testing';
import { UnfollowTwitchHandler } from './unfollow-twitch.handler';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { TwitchModule } from '../../../twitch/twitch.module';

describe('UnfollowTwitchHandler', () => {
  let service: UnfollowTwitchHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), TwitchModule],
      providers: [UnfollowTwitchHandler],
    }).compile();

    service = module.get<UnfollowTwitchHandler>(UnfollowTwitchHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
