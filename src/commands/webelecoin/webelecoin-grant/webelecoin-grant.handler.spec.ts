import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { WebelecoinGrantHandler } from './webelecoin-grant.handler';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';

describe('WebelecoinGrantService', () => {
  let service: WebelecoinGrantHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WebelecoinModule,
        MongooseModule.forRoot('mongodb://localhost/webelecoin_balance_test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      ],
      providers: [WebelecoinGrantHandler],
    }).compile();

    service = module.get<WebelecoinGrantHandler>(WebelecoinGrantHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
