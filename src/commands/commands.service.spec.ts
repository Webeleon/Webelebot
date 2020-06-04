import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';
import { DiscordModule } from '../discord/discord.module';
import { HelpHandler } from './help/help.handler';
import { WebelecoinBalanceHandler } from './webelecoin/webelecoin-balance/webelecoin-balance.handler';
import { WebelecoinDailyHandler } from './webelecoin/webelecoin-daily/webelecoin-daily.handler';
import { WebelecoinModule } from '../webelecoin/webelecoin.module';
import { MemberModule } from '../member/member.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DiscordModule,
        WebelecoinModule,
        MemberModule,
        MongooseModule.forRoot('mongodb://localhost/commands_service_test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      ],
      providers: [
        CommandsService,
        HelpHandler,
        WebelecoinBalanceHandler,
        WebelecoinDailyHandler,
      ],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
  });
  afterAll(() => {
    mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
