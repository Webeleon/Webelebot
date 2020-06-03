import * as mongoose from 'mongoose';

export const walletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    owner: String,
  },
  {
    timestamps: true,
  },
);

export interface IWallet {
  balance: number;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWalletDocument extends IWallet, mongoose.Document {}
