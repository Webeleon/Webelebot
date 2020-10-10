import { Test, TestingModule } from '@nestjs/testing';

import { ScheduledService } from './scheduled.service';
import { DiscordService } from '../discord.service';
import { ConfigModule } from '../../config/config.module';

describe('ScheduledService', () => {
  let service: ScheduledService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ScheduledService, DiscordService],
    }).compile();

    service = module.get<ScheduledService>(ScheduledService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
