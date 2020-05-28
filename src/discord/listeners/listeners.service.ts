import { Injectable, Logger } from '@nestjs/common';
import { Client, GuildMember, TextChannel } from 'discord.js';

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
**Pour toute question DM <@!319169441382268928>**

:handshake: [Partage de connaissances](https://ub.stream/webeleon/view/762d930d-0a0c-4482-a897-ba27d0642e40/share/index.html?type=view&l=en&token=0be62205-7b49-4e20-a186-4c23a365ebd3)
:helmet_with_cross: Entraide entre développeurs remote

:spider_web: Développement d'applications web et mobile
:robot: [Développement de bot discord](https://www.fiverr.com/webeleon?up_rollout=true)
:book: Cours sur demande

**For any question DM <@!319169441382268928>**

:handshake: [knowledge sharing](https://ub.stream/webeleon/view/762d930d-0a0c-4482-a897-ba27d0642e40/share/index.html?type=view&l=en&token=0be62205-7b49-4e20-a186-4c23a365ebd3)
:helmet_with_cross: Remote software developers help

:spider_web: Web and mobile application development
:robot: [Discord bot development](https://www.fiverr.com/webeleon?up_rollout=true)
:book: Learning sessions on demand  
    `;
    client.on('guildMemberAdd', (member: GuildMember) => {
      const channel = member.guild.channels.cache.find(
        chan => chan.name === 'lobby',
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
    });
  }
}
