const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);
module.exports = {
    name: 'setnick', // هنا اسم الامر
  aliases: ["لقب","na"],
    run : (client, message, args) => {

      const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
      if (!Color) return;

      const db = Pro.get(`Allow - Command setnick = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('MANAGE_NICKNAMES')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react('❌')
}


      
    const member = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(' ')[1]);
    const name = message.content.split(" ").slice(2).join(" ")


    if (!member) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}setnick <@${message.author.id}> ;فيروز **`);
      return message.reply({ embeds: [embed] });
    }

    if (!name) return message.react('❌')

    member.setNickname(name).then(() => {
      message.react('✅')
    }).catch(() => { message.react('❌') })

    }
}
