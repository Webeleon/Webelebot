import { Test, TestingModule } from '@nestjs/testing';
import { TwitchService } from './twitch.service';
import { ConfigModule } from '../config/config.module';

describe('TwitchService', () => {
  let service: TwitchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [TwitchService],
    }).compile();

    service = module.get<TwitchService>(TwitchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
