import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinService } from './webelecoin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { walletSchema } from './wallet.model';
import { transactionSchema } from './transaction.model';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';

describe('WebelecoinService', () => {
  let service: WebelecoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Wallet', schema: walletSchema },
          { name: 'Transaction', schema: transactionSchema },
        ]),
      ],
      providers: [WebelecoinService],
    }).compile();

    service = module.get<WebelecoinService>(WebelecoinService);
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
