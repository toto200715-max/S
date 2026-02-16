const { Message, Client, MessageEmbed } = require("discord.js");
const deb = require('pro.db')

module.exports = {
  name: "warn",
  aliases: ["انذار","تحذير"],
  description: "يعطي تحذيرًا لعضو ما.",
  aliases: ["تحذير", "تح"],
  run: async (client, message, args) => {




    const Color = deb.get(`Guild_Color = ${message.guild?.id}`) || `#000000`
    if (!Color) return;


    const Pro = require(`pro.db`)
    const db = Pro.get(`Allow - Command warn = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('MANAGE_MESSAGES')) {
// إجراءات للتصرف عندما لا يتحقق الشرط
return message.react(`❌`);
}



    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason_msg = args.slice(1).join(' ');



    if (!args[0]) {
      return message.reply({ content: `**يرجى ارفاق منشن العضو او الايدي .**`, allowedMentions: { parse: [] } }).catch((err) => {
        console.log(`لم أتمكن من الرد على الرسالة: ` + err.message)
      })
    }

    if (!member) {
      return message.reply({ content: `🙄 **لا يمكنني العثور على هذا العضو**`, allowedMentions: { parse: [] } }).catch((err) => {
        console.log(`لم أتمكن من الرد على الرسالة: ` + err.message)
      })
    }

    if (member.id === message.author.id) {
      return message.reply({ content: `🙄 **${member.user.username} لا يمكنك إعطاء تحذير لـ **`, allowedMentions: { parse: [] } }).catch((err) => {
        console.log(`لم أتمكن من الرد على الرسالة: ` + err.message)
      })
    }

    if (message.member.roles.highest.position < member.roles.highest.position) {
      return message.reply({ content: `🙄 **${member.user.username} لا يمكنك إعطاء تحذير لـ **`, allowedMentions: { parse: [] } }).catch((err) => {
        console.log(`لم أتمكن من الرد على الرسالة: ` + err.message)
      })
    }

    if (!reason_msg) {
      return message.reply({ content: `🙄**يرجى كتابة سبب للتحذير**`, allowedMentions: { parse: [] } })
    }

    deb.add(`warns_${member.id}`, 1)
    let Warn = deb.get(`warns_${member.id}`)
    deb.set(`messageauthor_${member.id}`, message.author.id)

    console.log(Warn)
    message.reply({ content: `✅ **${member.user.username} تم إعطاء تحذير لـ **`, allowedMentions: { parse: [] } })

    let embed = new MessageEmbed()
      .setThumbnail(member.displayAvatarURL({ dynamic: true }))
      .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
      .setDescription(`> **لقد تم إعطاؤك تحذيرًا في السيرفر: ${message.guild.name}**
> **السبب: ${reason_msg}**
> **المحذر: <@${message.author.id}>**
> ** لديك (${Warn}) تحذير**`)
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setFooter(`طلب بواسطة ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

    member.send({ embeds: [embed] }).catch((err) => {
      console.log(`لم أتمكن من الرد على الرسالة: ` + err.message)
    });
  },
};