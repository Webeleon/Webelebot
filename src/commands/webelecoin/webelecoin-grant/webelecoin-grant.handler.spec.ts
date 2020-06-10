import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinGrantHandler } from './webelecoin-grant.service';

describe('WebelecoinGrantService', () => {
  let service: WebelecoinGrantHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebelecoinGrantHandler],
    }).compile();

    service = module.get<WebelecoinGrantHandler>(WebelecoinGrantHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
