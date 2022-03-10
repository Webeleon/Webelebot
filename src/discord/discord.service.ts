import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { Client, Intents } from 'discord.js';

@Injectable()
export class DiscordService {
  client: Client;
  ready: boolean;

  constructor(private readonly config: ConfigService) {}

  async connect(): Promise<Client> {
    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    this.client.on('ready', () => {
      Logger.log(`Discord connected with handle ${this.client.user.tag}`);
      this.ready = true;
    });

    await this.client.login(this.config.discordToken);
    Logger.log(this.getBotInviteLink(), DiscordService.name);

    return this.client;
  }

  getBotInviteLink(permissions = '1075305537'): string {
    return `https://discordapp.com/oauth2/authorize?client_id=${this.config.discordClientId}&scope=bot&permissions=${permissions}`;
  }
}
