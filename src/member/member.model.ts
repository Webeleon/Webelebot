import * as mongoose from 'mongoose';

export const memberSchema = new mongoose.Schema(
  {
    discordUserId: String,
    username: String,
    lastDaily: Date,
  },
  {
    timestamps: true,
  },
);

export interface IMember {
  discordUserId: string;
  username?: string;
  lastDaily?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMemberDocument extends IMember, mongoose.Document {}
