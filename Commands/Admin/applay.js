const Pro = require(`pro.db`)
module.exports = {
    name: "applay",
    run: async (client, message) => {

const db = Pro.get(`Allow - Command applay = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`)
}
     
      message.channel.permissionOverwrites.create(message.guild.roles.everyone, {
        MENTION_EVERYONE: true,
        ATTACH_FILES: true
  
      });

      message.reply("**تم تفعيل المنشن والصور بالشات .**")

    }
}
