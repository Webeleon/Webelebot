import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinBalanceHandler } from './webelecoin-balance.handler';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('WebelecoinBalanceService', () => {
  let service: WebelecoinBalanceHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WebelecoinModule,
        MongooseModule.forRoot('mongodb://localhost/webelecoin_balance_test'),
      ],
      providers: [WebelecoinBalanceHandler],
    }).compile();

    service = module.get<WebelecoinBalanceHandler>(WebelecoinBalanceHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
