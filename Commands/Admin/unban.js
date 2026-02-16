const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);
module.exports = {
  name: "unban",
  aliases: ["مسماحك"],
  description: "فك الحظر عن عضو",
  usage: ["!unban @user"],
  run: async (client, message, args, config) => {

    const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;

    const db = Pro.get(`Allow - Command unban = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
// إجراءات للتصرف عندما لا يتحقق الشرط
return message.react('❌')
}
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      return message.reply({
        content: "🙄 **لا يمكنني فك الحظر لهذا العضو. يرجى التحقق من صلاحياتي وموقع دوري.**",
        allowedMentions: { parse: [] },
        ephemeral: true,
      });
    }
    // التأكد من توفر منشن العضو المحظور
    const userArg = args[0];
    if (!userArg) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}unban <@${message.author.id}>**`);
      return message.reply({ embeds: [embed] });
    }


    let userID = userArg.match(/\d+/); 
    if (!userID) {
      return message.reply({
        content: "🙄 **يرجى ذكر منشن العضو المحظور أو استخدام الآيدي**",
        allowedMentions: { parse: [] },
        ephemeral: true,
      });
    }

    // فك الحظر عن المستخدم المحدد
    message.guild.members.unban(userID[0])
      .then(() => {
        const embed = new MessageEmbed()
          .setDescription(`**تم فك حظره بنجاح** <@${userID[0]}> ✅`)
          .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`);
        message.reply({ embeds: [embed], allowedMentions: { parse: [] } });
      })
      .catch((error) => {
        console.error(`Failed to unban user: ${error}`);
        message.reply({
          content: "🙄 **حدث خطأ أثناء محاولة إزالة الحظر عن العضو المحدد**",
          allowedMentions: { parse: [] },
          ephemeral: true,
        });
      });
  },
};