import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MessageEmbed } from 'discord.js';

import { DiscordService } from '../discord.service';

@Injectable()
export class ScheduledService {
  constructor(private readonly discordService: DiscordService) {}

  @Cron('0 8,18 * * *')
  async bassochetteDailyCoding(): Promise<void> {
    const bassochetteDiscordId = '319169441382268928';
    const codingActivityLink =
      'https://wakatime.com/share/@bassochette/6abd325b-3029-4584-8b2a-404e106d66f1.png';
    const languagesStatLink =
      'https://wakatime.com/share/@bassochette/92c20176-f8ab-465e-903e-2de205e4ed20.png';
    const editorStatLink =
      'https://wakatime.com/share/@bassochette/2caf6375-35da-49da-9039-f1af288dcd6f.png';

    Logger.debug('Sending daily coding activity to bassochette');

    const makeEmbed = (title: string, image: string): MessageEmbed =>
      new MessageEmbed()
        .setTitle(title)
        .setImage(image)
        .setAuthor('Wakatime')
        .setURL('https://wakatime.com/dashboard');

    const bassochette = await this.discordService.client.users.fetch(
      bassochetteDiscordId,
      false,
    );

    await bassochette.send(
      makeEmbed('Editor stats! u need more vim!', editorStatLink),
    );
    await bassochette.send(
      makeEmbed('Languages stats make it shiny', languagesStatLink),
    );
    await bassochette.send(
      makeEmbed('And now the coding activity', codingActivityLink),
    );
  }
}
