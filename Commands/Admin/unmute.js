const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);const Data = require('pro.db');

module.exports = {
  name: 'unmute',
  aliases: ['معفو', 'تكلم'],
  run: async (client, message, args) => {

    const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;

        const db = Pro.get(`Allow - Command unmute = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('MUTE_MEMBERS')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}


    let member;
    if (message.mentions.members.size > 0) {
      member = message.mentions.members.first();
    } else {
      const memberId = args[0];
      member = message.guild.members.cache.get(memberId);
    }

    if (!member) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}تكلم <@${message.author.id}>**`);
      return message.reply({ embeds: [embed] });
    }


    let role = member.guild.roles.cache.find((role) => role.name === 'Muted');
    if (!role) {
      return message.react('❎');
    }

    member.roles.remove(role)
      .then(() => {
        message.react('✅');
      })
      .catch((error) => {
        console.error(error);
        console.log('An error occurred while unmuting the member.');
      });

    await Data.delete(`Muted_Member_${member.id}`);
  },
};
