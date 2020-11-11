import { Schema, Document } from 'mongoose';

export interface TwitchBroadcast {
  broadcastId: string;
  notified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TwitchBroadcastDocument extends TwitchBroadcast, Document {}

export const TwitchBroadcastSchema = new Schema(
  {
    broadcastId: String,
    notified: Boolean,
  },
  { timestamps: true },
);
