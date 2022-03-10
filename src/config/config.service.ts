import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

@Injectable()
export class ConfigService {
  public readonly port: number;
  public readonly discordToken: string;
  public readonly discordClientId: string;
  public readonly mongoURL: string;

  public readonly twitchId: string;
  public readonly twitchSecret: string;

  constructor() {
    config();
    this.port = parseInt(process.env.PORT) || 5000;
    this.mongoURL =
      process.env.MONGO_URL ||
      process.env.MONGO_ADDON_URI ||
      'mongodb://localhost/webelebot';

    this.discordToken = process.env.DISCORD_API_TOKEN || '';
    this.discordClientId = process.env.DISCORD_CLIENT_ID || '';

    this.twitchId = process.env.TWITCH_ID || 'invalid twitch id';
    this.twitchSecret = process.env.TWITCH_SECRET || 'invalid twitch secret';
  }
}
