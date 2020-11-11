import { Injectable, Logger } from '@nestjs/common';
import fetch from 'node-fetch';

import { ConfigService } from '../config/config.service';
import {
  TwitchClientCredentials,
  TwitchGame,
  TwitchStream,
} from './twitch.interfaces';
import { TWITCH_API_BASE_URL } from './twitch.constants';

const debug = (data) => Logger.debug(data, 'TwitchService');

@Injectable()
export class TwitchService {
  constructor(private readonly configService: ConfigService) {}

  async getClientCredientials(): Promise<TwitchClientCredentials> {
    const scopes = `analytics:read:games+user:read:broadcast+channel:read:subscriptions`;
    const clientCredentialsUrl = `https://id.twitch.tv/oauth2/token?client_id=${this.configService.twitchId}&client_secret=${this.configService.twitchSecret}&grant_type=client_credentials&scope=${scopes}`;

    const res = await fetch(clientCredentialsUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  }

  async fetchStreamByUserLogins(
    userLogins: string[],
    crendentials: TwitchClientCredentials,
  ): Promise<TwitchStream[] | undefined> {
    const apiStreamURL = `${TWITCH_API_BASE_URL}/streams?${userLogins
      .map((u) => `user_login=${u}`)
      .join('&')}`;
    const streamsResponse = await fetch(apiStreamURL, {
      headers: {
        'Client-ID': this.configService.twitchId,
        Authorization: `Bearer ${crendentials.access_token}`,
      },
    });
    const streams = await streamsResponse.json();
    return streams.data;
  }

  async fetchGameById(
    gameId: string,
    credentials: TwitchClientCredentials,
  ): Promise<TwitchGame | undefined> {
    const getGameURL = `${TWITCH_API_BASE_URL}/games?id=${gameId}`;
    const gameResponse = await fetch(getGameURL, {
      headers: {
        'Client-ID': this.configService.twitchId,
        Authorization: `Bearer ${credentials.access_token}`,
      },
    });
    const games = await gameResponse.json();
    debug(games);
    const [game] = games.data;
    return game;
  }
}
