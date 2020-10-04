import { Test, TestingModule } from '@nestjs/testing';

import { WebelecoinGrantHandler } from './webelecoin-grant.handler';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';

describe('WebelecoinGrantService', () => {
  let service: WebelecoinGrantHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), WebelecoinModule],
      providers: [WebelecoinGrantHandler],
    }).compile();

    service = module.get<WebelecoinGrantHandler>(WebelecoinGrantHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
