const { MessageEmbed } = require("discord.js");
const db = require(`pro.db`);

module.exports = {
  name: 'allbans',
  run: (client, message, args) => {
    const Pro = require(`pro.db`);
    const Data = db.get(`Allow - Command allbans = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(Data);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

    if (!isAuthorAllowed && message.author.id !== Data && !message.member.permissions.has('ADMINISTRATOR')) {
      return message.react('❌');
    }

    const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;

    message.guild.bans.fetch()
      .then(bans => {
        let list = '';
        let count = 1;
        bans.forEach(ban => {
          const user = ban.user;
          const reason = ban.reason || '❌';
          list += ` \`${count}\` - <@${user.id}> - Reason : ${reason}\n`;
          count++;
        });

        if (list.length >= 1950) list = `${list.slice(0, 1948)}`;

        const embed = new MessageEmbed()
          .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
          .setTitle(`قائمه الإعضاء المحظورة : \`${bans.size}\``)
          .setDescription(`**${list}**`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
      })
      .catch(console.error);
  }
};
