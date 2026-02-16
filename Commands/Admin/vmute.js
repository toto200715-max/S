const { Message, Client } = require("discord.js");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);

module.exports = {
  name: "vmute",
  aliases: ["ميوت"],
  description: "mute a member from the voice channel",
  usage: ["!vmute @user"],
  run: async (client, message, args) => {

        const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
        if (!Color) return;

        const db = Pro.get(`Allow - Command vmute = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('BAN_MEMBERS')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}
    
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!args[0]) {
        const embed = new MessageEmbed()
          .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
          .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}ميوت <@${message.author.id}>**`);
        return message.reply({ embeds: [embed] });
      }

                if (!member) return message.reply({ content: `**لا يمكنك اعطاء ميوت لهاذا العضو .**` }).catch((err) => {
                        console.log(`**لم أتمكن من الرد على الرسالة:**` + err.message)
                })

                if (message.member.roles.highest.position < member.roles.highest.position) return message.reply({ content: `:rolling_eyes: **${member.user.username} have higher role than you**` }).catch((err) => {
                        console.log(`**لم أتمكن من الرد على الرسالة:**` + err.message)
                })


                
                if (!member.voice.channel) return message.reply({ content: `**المستخدم ليس في قناة صوتية .**` })
                member.voice.setMute(true).then(() => {
                        message.reply({ content: `**✅ تم إسكات ${member.user.username} من الرومات الصوتية! 🤐**` })
                })

        },
};