import { Module } from '@nestjs/common';
import { WebelecoinService } from './webelecoin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { walletSchema } from './wallet.model';
import { transactionSchema } from './transaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Wallet', schema: walletSchema },
      { name: 'Transaction', schema: transactionSchema },
    ]),
  ],
  providers: [WebelecoinService],
  exports: [WebelecoinService],
})
export class WebelecoinModule {}
