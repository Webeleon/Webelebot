import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';
import { DiscordModule } from '../discord/discord.module';
import { HelpHandler } from './help/help.handler';
import { WebelecoinBalanceHandler } from './webelecoin/webelecoin-balance/webelecoin-balance.handler';
import { WebelecoinDailyHandler } from './webelecoin/webelecoin-daily/webelecoin-daily.handler';
import { WebelecoinModule } from '../webelecoin/webelecoin.module';
import { MemberModule } from '../member/member.module';
import { WebelecoinGrantHandler } from './webelecoin/webelecoin-grant/webelecoin-grant.handler';
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
      imports: [
        rootMongooseTestModule(),
        DiscordModule,
        WebelecoinModule,
        MemberModule,
        TwitchModule,
      ],
      providers: [
        CommandsService,
        HelpHandler,
        WebelecoinBalanceHandler,
        WebelecoinDailyHandler,
        WebelecoinGrantHandler,

        FollowTwitchHandler,
        UnfollowTwitchHandler,
      ],
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
