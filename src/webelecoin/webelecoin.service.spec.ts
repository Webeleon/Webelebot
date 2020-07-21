import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinService } from './webelecoin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { walletSchema } from './wallet.model';
import { transactionSchema } from './transaction.model';
import * as mongoose from 'mongoose';

describe('WebelecoinService', () => {
  let service: WebelecoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/webelecoin_test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }),
        MongooseModule.forFeature([
          { name: 'Wallet', schema: walletSchema },
          { name: 'Transaction', schema: transactionSchema },
        ]),
      ],
      providers: [WebelecoinService],
    }).compile();

    service = module.get<WebelecoinService>(WebelecoinService);
  });
  afterAll(() => {
    mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});