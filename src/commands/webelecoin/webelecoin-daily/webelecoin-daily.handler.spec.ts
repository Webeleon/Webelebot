import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinDailyHandler } from './webelecoin-daily.handler';
import { MemberModule } from '../../../member/member.module';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('WebelecoinDailyHandler', () => {
  let service: WebelecoinDailyHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MemberModule,
        WebelecoinModule,
        MongooseModule.forRoot('mongodb://localhost/webelecoin_daily_test'),
      ],
      providers: [WebelecoinDailyHandler],
    }).compile();

    service = module.get<WebelecoinDailyHandler>(WebelecoinDailyHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
