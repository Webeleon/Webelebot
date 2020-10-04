import { Test, TestingModule } from '@nestjs/testing';
import { WebelecoinBalanceHandler } from './webelecoin-balance.handler';
import { WebelecoinModule } from '../../../webelecoin/webelecoin.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';

describe('WebelecoinBalanceService', () => {
  let webelecoinBalanceHandler: WebelecoinBalanceHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WebelecoinModule, rootMongooseTestModule()],
      providers: [WebelecoinBalanceHandler],
    }).compile();

    webelecoinBalanceHandler = module.get<WebelecoinBalanceHandler>(
      WebelecoinBalanceHandler,
    );
  });

  it('should be defined', () => {
    expect(webelecoinBalanceHandler).toBeDefined();
  });

  it('test for command case insensitive', () => {
    expect(webelecoinBalanceHandler.test('webelecoin balance')).toBeTruthy();
    expect(webelecoinBalanceHandler.test('WEBELECOIN BALANCE')).toBeTruthy();
    expect(
      webelecoinBalanceHandler.test('should not responde webelecoin balance'),
    ).toBeFalsy();
    expect(
      webelecoinBalanceHandler.test('webelecoin balance targetWallet'),
    ).toBeTruthy();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
