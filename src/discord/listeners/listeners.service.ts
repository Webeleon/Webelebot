import { Injectable, Logger } from '@nestjs/common';
import { Client, GuildMember, TextChannel, MessageEmbed } from 'discord.js';

@Injectable()
export class ListenersService {
  registerAll(client: Client) {
    this.registerGreetings(client);
    this.registerMessageSpy(client);
  }
  registerMessageSpy(client: Client) {
    // client.on('message', (message: Message) => {
    //     Logger.debug(message);
    // });
  }

  registerGreetings(client: Client) {
    const greeting = `
*For any question DM <@!319169441382268928>**

:twitch: [Live coding](https://www.twitch.tv/webeleon)
:github: [Webeleon open source project](https://github.com/Webeleon)

:handshake: [knowledge sharing](https://ub.stream/webeleon/view/762d930d-0a0c-4482-a897-ba27d0642e40/share/index.html?type=view&l=en&token=0be62205-7b49-4e20-a186-4c23a365ebd3)

:webelecoin: get you daily webelecoin using the command \`webelecoin daily\` (gift shop coming soon)

Test our new game #colonie
    `;
    client.on('guildMemberAdd', (member: GuildMember) => {
      Logger.log(member, 'guildMemberAdd');
      const channel = member.guild.channels.cache.find(
        (chan) => chan.name === 'lobby',
      );
      if (!channel) {
        Logger.error(
          `Channel lobby not found... ${member.user.username} has not been greeted`,
        );
        return;
      }
      (channel as TextChannel).send({
        content: `Welcome <@!${member.user.id}> to webeleon discord server`,
        embed: {
          description: greeting,
        },
      });

      const adminLogChannel = member.guild.channels.cache.find(
        (chan) => chan.name === 'log',
      );
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${member.user.username} join the server`)
        .setDescription(JSON.stringify(member));

      (adminLogChannel as TextChannel).send(embed);
    });

    client.on('guildMemberRemove', (member: GuildMember) => {
      Logger.log(member, 'guildMemberRemove');
      const adminLogChannel = member.guild.channels.cache.find(
        (chan) => chan.name === 'log',
      );
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`${member.user.username} left the server`)
        .setDescription(JSON.stringify(member));

      (adminLogChannel as TextChannel).send(embed);
    });
  }
}
