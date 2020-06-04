import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberService } from './member.service';
import { memberSchema } from './member.model';
import { WebelecoinModule } from '../webelecoin/webelecoin.module';
import * as mongoose from 'mongoose';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/memeberservice_test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        MongooseModule.forFeature([{ name: 'Member', schema: memberSchema }]),
        WebelecoinModule,
      ],
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });
  afterAll(() => {
    mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
