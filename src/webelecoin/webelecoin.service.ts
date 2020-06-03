import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash } from 'crypto';

import { IWalletDocument } from './wallet.model';
import { ITransaction, ITransactionDocument } from './transaction.model';

export const SYSTEM_WALLET = 'SYSTEM';
export const WEBELECOIN_SUPPLY = 1000000000;

@Injectable()
export class WebelecoinService {
  constructor(
    @InjectModel('Wallet') private walletModel: Model<IWalletDocument>,
    @InjectModel('Transaction')
    private transactionModel: Model<ITransactionDocument>,
  ) {}

  async balance(owner: string): Promise<number> {
    return (await this.getWallet(owner)).balance;
  }

  async getLastTransactions(
    owner: string,
    count = 10,
  ): Promise<ITransaction[]> {
    return this.transactionModel
      .find({
        $or: [{ from: owner }, { to: owner }],
      })
      .limit(count)
      .sort('-createdAt');
  }

  async transfer(from: string, to: string, amount: number, message = '') {
    if (amount <= 0)
      throw new Error('Invalid amount, only positive number are accepted');
    const senderWallet = await this.getWallet(from);
    const recipientWallet = await this.getWallet(to);
    if (senderWallet.balance < amount)
      throw new Error(`Insufficient balance in wallet ${from}`);
    const lastTransaction = await this.getLastTransaction();
    const lastTransactionHash = this.hashTransaction(lastTransaction);
    await this.transactionModel.create({
      sequence: lastTransaction.sequence + 1,
      amount,
      from,
      to,
      message,
      lastTransactionHash,
    });

    senderWallet.balance -= amount;
    recipientWallet.balance += amount;
    await senderWallet.save();
    await recipientWallet.save();
  }

  async getLastTransaction(): Promise<ITransactionDocument> {
    const transaction = await this.transactionModel
      .findOne({})
      .sort('-sequence');
    if (!transaction)
      return this.transactionModel.create({
        sequence: 0,
        amount: WEBELECOIN_SUPPLY,
        from: SYSTEM_WALLET,
        to: SYSTEM_WALLET,
        lastTransactionHash: SYSTEM_WALLET,
        message: 'init transaction history',
      });
    return transaction;
  }

  hashTransaction(transaction: ITransaction): string {
    const hash = createHash('sha256');
    hash.update(
      JSON.stringify({
        sequence: transaction.sequence,
        amount: transaction.amount,
        from: transaction.from,
        to: transaction.to,
        lastTransactionHash: transaction.lastTransactionHash,
        message: transaction.message,
        createdAt: transaction.createdAt.toUTCString(),
        updatedAt: transaction.updatedAt.toUTCString(),
      }),
    );
    return hash.digest('hex');
  }

  async getWallet(owner: string): Promise<IWalletDocument> {
    const wallet = await this.walletModel.findOne({ owner });
    if (!wallet)
      return this.walletModel.create({
        owner,
        balance: owner === SYSTEM_WALLET ? WEBELECOIN_SUPPLY : 0,
      });
    return wallet;
  }
}
