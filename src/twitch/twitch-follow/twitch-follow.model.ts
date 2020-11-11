import { Schema, Document } from 'mongoose';

export interface TwitchFollow {
  userLogin: string;
  notificationChannels: string[];
  createdAt?: Date;
  updateAt?: Date;
}

export interface TwitchFollowDocument extends TwitchFollow, Document {}

export const TwitchFollowSchema = new Schema(
  {
    userLogin: String,
    notificationChannels: [String],
  },
  { timestamps: true },
);
