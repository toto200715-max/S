const { MessageAttachment, MessageEmbed } = require('discord.js');
const { inviteTracker } = require("discord-inviter");
const db = require("pro.db");
const Data = require("pro.db");

module.exports = {
  name: 'user',
  aliases: ["يوزر","u","يوزري"],
  run: async (client, message, args) => {

        const Color = db.get(`Guild_Color = ${message.guild?.id}`) || `#000000`;
        if (!Color) return;
      
        let setchannek = Data.get(`setChannel_${message.guild.id}`);
        if (setchannek && message.channel.id !== setchannek) return; // Check if setChannel is defined and if the message is not in the specified channel
      
        let mentionedMember;
        if (args[0]) {
          const userID = args[0].replace(/[<@!>]/g, ''); 
          mentionedMember = message.guild.members.cache.get(userID);
        } else {
          mentionedMember = message.member;
        }
        
        if (!mentionedMember) {
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        const createdAt = mentionedMember.user.createdAt.toLocaleDateString('en-US', options);
        var invite = await inviteTracker.getMemberInvites(mentionedMember);
      
        let embed = new MessageEmbed()
          .setColor(`${Color || `#000000`}`)
          .setAuthor(`${mentionedMember.user.tag}`)
          .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
          .addFields(
            { name: '**تاريخ دخول السيرفر :**', value: `** <t:${Math.floor(mentionedMember.joinedAt / 1000)}:R> **`, inline: true },
            { name: '**تاريخ انشاء الحساب :**', value: `** <t:${Math.floor(mentionedMember.user.createdTimestamp / 1000)}:R> **` },
            { name: '**عدد الدعوات :**', value: `**${invite.count}**` }
          );
      
        message.channel.send({ embeds: [embed] });
        
  }
};
