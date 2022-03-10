import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import {
  TwitchClientCredentials,
  TwitchGame,
  TwitchStream,
} from './twitch.interfaces';
import { TWITCH_API_BASE_URL } from './twitch.constants';
import { HttpService } from '@nestjs/axios';
import { TwitchScheduledService } from './twitch-scheduled/twitch-scheduled.service';

const debug = (data) => Logger.debug(data, 'TwitchService');

@Injectable()
export class TwitchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getClientCredientials(): Promise<TwitchClientCredentials> {
    const scopes = `analytics:read:games+user:read:broadcast+channel:read:subscriptions`;
    const clientCredentialsUrl = `https://id.twitch.tv/oauth2/token?client_id=${this.configService.twitchId}&client_secret=${this.configService.twitchSecret}&grant_type=client_credentials`;
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const res = await this.httpService
        .post(clientCredentialsUrl, undefined, { headers })
        .toPromise();
      const credentials = res.data;

      return credentials as TwitchClientCredentials;
    } catch (error) {
      Logger.error(error, TwitchService.name);
      throw error;
    }
  }

  async fetchStreamByUserLogins(
    userLogins: string[],
    crendentials: TwitchClientCredentials,
  ): Promise<TwitchStream[] | undefined> {
    const apiStreamURL = `${TWITCH_API_BASE_URL}/streams?${userLogins
      .map((u) => `user_login=${u}`)
      .join('&')}`;

    const headers = {
      'Client-ID': this.configService.twitchId,
      Authorization: `Bearer ${crendentials.access_token}`,
    };

    const res = await this.httpService
      .get<{ data: TwitchStream[] }>(apiStreamURL, {
        headers,
      })
      .toPromise();
    debug(res.data);
    const streams = res.data;
    return streams.data || [];
  }

  async fetchGameById(
    gameId: string,
    credentials: TwitchClientCredentials,
  ): Promise<TwitchGame | undefined> {
    const getGameURL = `${TWITCH_API_BASE_URL}/games?id=${gameId}`;
    const headers = {
      'Client-ID': this.configService.twitchId,
      Authorization: `Bearer ${credentials.access_token}`,
    };
    const response = await this.httpService
      .get(getGameURL, { headers })
      .toPromise();
    const games = await response.data;
    Logger.debug(games, 'DEBUG');
    const [game] = games.data;
    return game;
  }
}
