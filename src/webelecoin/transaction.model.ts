import * as mongoose from 'mongoose';

export const transactionSchema = new mongoose.Schema(
  {
    sequence: {
      type: Number,
      default: 0,
      unique: true,
    },
    amount: Number,
    from: String,
    to: String,
    message: String,
    lastTransactionHash: String,
  },
  {
    timestamps: true,
  },
);

export interface ITransaction {
  sequence: number;
  amount: number;
  from: string;
  to: string;
  lastTransactionHash: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionDocument extends ITransaction, mongoose.Document {}
