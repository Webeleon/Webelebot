import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';
import { DiscordModule } from '../discord/discord.module';
import { FollowTwitchHandler } from './twitch/follow-twitch/follow-twitch.handler';
import { UnfollowTwitchHandler } from './twitch/unfollow-twitch/unfollow-twitch.handler';
import { TwitchModule } from '../twitch/twitch.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), DiscordModule, TwitchModule],
      providers: [CommandsService, FollowTwitchHandler, UnfollowTwitchHandler],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
