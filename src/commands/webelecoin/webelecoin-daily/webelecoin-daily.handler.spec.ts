import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';

import { WebelecoinDailyHandler } from './webelecoin-daily.handler';
import { MemberModule } from '../../../member/member.module';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';

describe('WebelecoinDailyHandler', () => {
  let service: WebelecoinDailyHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MemberModule, WebelecoinModule],
      providers: [WebelecoinDailyHandler],
    }).compile();

    service = module.get<WebelecoinDailyHandler>(WebelecoinDailyHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
