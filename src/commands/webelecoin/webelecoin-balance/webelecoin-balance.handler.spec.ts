import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinBalanceHandler } from './webelecoin-balance.handler';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

describe('WebelecoinBalanceService', () => {
  let service: WebelecoinBalanceHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WebelecoinModule,
        MongooseModule.forRoot('mongodb://localhost/webelecoin_balance_test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      ],
      providers: [WebelecoinBalanceHandler],
    }).compile();

    service = module.get<WebelecoinBalanceHandler>(WebelecoinBalanceHandler);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
