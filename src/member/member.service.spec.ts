import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberService } from './member.service';
import { ConfigService } from '../config/config.service';
import { memberSchema } from './member.model';
import { WebelecoinModule } from '../webelecoin/webelecoin.module';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/memeberservice_test', {
          useNewUrlParser: true,
        }),
        MongooseModule.forFeature([{ name: 'Member', schema: memberSchema }]),
        WebelecoinModule,
      ],
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
