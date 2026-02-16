const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);
const ms = require('ms');
const moment = require('moment');

module.exports = {
  name: "timeout",
  aliases: ["تايم"],
  description: "timeout a member",
  usage: ["!timeout @user"],
  run: async (client, message, args, config) => {

    const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;
    const db = Pro.get(`Allow - Command timeout = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

    if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has('MUTE_MEMBERS')) {
      return message.react(`❌`);
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}تايم <@${message.author.id}> 1h**`);
      return message.reply({ embeds: [embed] });
    }

    if (!member) {
      return message.reply({ content: `**لا يمكنني اعطاء ميوت لهاذا العضو .**` }).catch((err) => {
        console.log(`**لم أتمكن من الرد على الرسالة:**` + err.message);
      });
    }

    if (member.id === message.author.id) {
      return message.reply({ content: `**لا يمكنك اعطاء ميوت لنفسك .**` }).catch((err) => {
        console.log(`**لم أتمكن من الرد على الرسالة:**` + err.message);
      });
    }

    if (message.member.roles.highest.position < member.roles.highest.position) {
      return message.reply({ content: `:rolling_eyes: **You can't timeout ${member.user.username} have higher role than you**` }).catch((err) => {
        console.log(`**لم أتمكن من الرد على الرسالة:**` + err.message);
      });
    }

    if (!args[1]) {
      return message.reply({ content: `**يرجي تحديد وقت الميوت .**` });
    }

    if (!args[1].endsWith('s') && !args[1].endsWith('m') && !args[1].endsWith('h') && !args[1].endsWith('d') && !args[1].endsWith('w')) {
      return message.reply({ content: `** يجب أن ينتهي الوقت بـ .** \`s / m / h / d / w\` ` });
    }
    message.reply({ content: `**✅ تم إسكات ${member.user.username} من السيرفر! 🤐**` })

    const timeoutDuration = ms(args[1]);
    const timeoutMessage = `**${message.member.nickname}** has timed you out for ${args[1]}.`;
    
    const chatName = 'log-tmute-untmute'; 
    member.timeout(timeoutDuration, timeoutMessage)
      .then(() => {
        const embed = new MessageEmbed()
      
          .setTitle("Text Mute")
          .setDescription(`✅ تم إسكات  من السيرفر! 🤐`)
          .addField("**Time**", args[1])
          .setDescription(`**To : <@${member.user.id}>**\n**By : <@${message.member.id}>**\n**In : [Message Link](${message.url})**\n**Giving : ${moment().format('HH:mm')}\n\`\`\`Reason : No reason\`\`\`\ **`)   
          .setColor(`#312e5d`)
          .setFooter({ text: `حُلم`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
          .setThumbnail(`https://cdn.discordapp.com/attachments/1091536665912299530/1153875266066710598/image_1.png`);

          setTimeout(() => {
            const timeoutEndMessage = `**${member.user.username}**'s mute has ended.`;
            const chat = client.channels.cache.find(channel => channel.name === chatName);
            if (chat) {
              chat.send(timeoutEndMessage);
            } else {
              console.log(`Chat '${chatName}' not found.`);
            }
          }, timeoutDuration);
          
        // Find the chat by name and send the message
        const chat = client.channels.cache.find(channel => channel.name === chatName);
        if (chat) {
          chat.send({ embeds: [embed] });
        } else {
          console.log(`Chat '${chatName}' not found.`);
        }
      })

      .catch((err) => {
        console.log(`Failed to timeout member: ${err.message}`);
      });
  },
};
