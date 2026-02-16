const { MessageEmbed } = require('discord.js');
const db = require('pro.db');

module.exports = {
  name: 'top-invites',
  aliases: ['topinv'],
  run: async (client, message) => {
    const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || '#000000';
    if (!Color) return;

    const invites = await message.guild.invites.fetch();
    const sortedInvites = invites.sort((a, b) => b.uses - a.uses);
    const topInvites = sortedInvites.first(20);

    const uniqueNames = new Set();
    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle('Top Invites');

    topInvites.forEach((invite, index) => {
      const inviter = invite.inviter;
      if (!uniqueNames.has(inviter.id)) {
        uniqueNames.add(inviter.id);
        embed.addField(`#${index + 1} - ${inviter.username}`, `Has ${invite.uses} uses`);
      }
    });

    message.channel.send({ embeds: [embed] });
  },
};
