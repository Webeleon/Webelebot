import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TwitchBroadcastDocument } from './twitch-broadcast.model';

@Injectable()
export class TwitchBroadcastService {
  constructor(
    @InjectModel('TwitchBroadcast')
    private readonly twitchBroadcastModel: Model<TwitchBroadcastDocument>,
  ) {}

  async getBroadcast(broadcastId: string): Promise<TwitchBroadcastDocument> {
    const broadcast = await this.twitchBroadcastModel.findOne({
      broadcastId,
    });
    if (!broadcast)
      return this.twitchBroadcastModel.create({
        broadcastId,
        notified: false,
      });
    return broadcast;
  }

  async hasBeenMotified(broadcastId: string): Promise<boolean> {
    return !!(await this.twitchBroadcastModel.findOne({
      broadcastId,
      notified: true,
    }));
  }

  async markAsNotified(broadcastId: string): Promise<void> {
    const broadcast = await this.getBroadcast(broadcastId);
    broadcast.notified = true;
    await broadcast.save();
  }
}
