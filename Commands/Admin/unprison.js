
const {  MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);
const moment = require('moment');
const Data = require('pro.db');

module.exports = {
  name: 'unprison',
  aliases: ['عفو',],
  run: async (client, message, args) => {
    
    const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;

    const db = Pro.get(`Allow - Command unprison = [ ${message.guild.id} ]`)
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
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}عفو <@${message.author.id}>**`);
      return message.reply({ embeds: [embed] });
    }

    let role = member.guild.roles.cache.find((role) => role.name === 'prison');
    if (!role) {
      return message.react('❎');
    }

    member.roles.remove(role)
      .then(() => {
        message.react('✅');
        const logChannelName = 'log-prison-unprison';
        const logChannel = message.guild.channels.cache.find(channel => channel.name === logChannelName);

        if (logChannel) {
            const logEmbed = new MessageEmbed()
                .setColor('#4b6691')
                .setTitle('unPrison')
                .setDescription(`**To :** ${member}\n**By :** ${message.author}\n**Message :** [**Jump to Message**](${message.url})\n**Un Prison At :** \`${moment().format('HH:mm')}\`\n\`\`\`Prison : not yet\`\`\` `)       
                .setThumbnail('https://cdn.discordapp.com/attachments/1091536665912299530/1157860838833659985/B1DF7F1C-78BB-480C-BC93-C77AC0CC5231.png?ex=651a256f&is=6518d3ef&hm=6b2145a1536bbd35209f34f01471ca5cec7a2ca7950c5d3e85e0407ec384ad07&')

                .setTimestamp();
            logChannel.send({ embeds: [logEmbed] });
        }
      })
      .catch((error) => {
        console.error(error);
        console.log('An error occurred while unmuting the member.');
      });

    await Data.delete(`MutedMember_${member.id}`);
  },
};
