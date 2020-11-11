import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TwitchFollowDocument } from './twitch-follow.model';

@Injectable()
export class TwitchFollowService {
  constructor(
    @InjectModel('TwitchFollow')
    private readonly twitchFollowModel: Model<TwitchFollowDocument>,
  ) {}

  async getFollowByUserLogin(userLogin: string): Promise<TwitchFollowDocument> {
    const twitchFollow = await this.twitchFollowModel.findOne({
      userLogin: userLogin.toLowerCase(),
    });
    if (!twitchFollow) {
      return this.twitchFollowModel.create({
        userLogin: userLogin.toLowerCase(),
        notificationChannels: [],
      });
    }
    return twitchFollow;
  }

  async getAllUserLogins(): Promise<string[]> {
    const twitchFollows = await this.twitchFollowModel.find({});
    return twitchFollows.map((follow) => follow.userLogin);
  }

  async follow(userLogin: string, channelId: string): Promise<void> {
    const twitchFollow = await this.getFollowByUserLogin(userLogin);
    twitchFollow.notificationChannels.push(channelId);
    await twitchFollow.save();
  }

  async unfollow(userLogin: string, channelId: string): Promise<void> {
    const twitchFollow = await this.getFollowByUserLogin(userLogin);
    if (twitchFollow.notificationChannels.length <= 1) {
      await this.twitchFollowModel.deleteOne({ userLogin });
    } else {
      twitchFollow.notificationChannels = twitchFollow.notificationChannels.filter(
        (chan) => chan === channelId,
      );
      await twitchFollow.save();
    }
  }
}
