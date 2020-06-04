import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinDailyHandler } from './webelecoin-daily.handler';
import { MemberModule } from '../../../member/member.module';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

describe('WebelecoinDailyHandler', () => {
  let service: WebelecoinDailyHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MemberModule,
        WebelecoinModule,
        MongooseModule.forRoot('mongodb://localhost/webelecoin_daily_test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      ],
      providers: [WebelecoinDailyHandler],
    }).compile();

    service = module.get<WebelecoinDailyHandler>(WebelecoinDailyHandler);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
