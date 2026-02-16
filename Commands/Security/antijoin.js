const dnb = require(`pro.db`)
module.exports = {
    name: `antijoin`,
    run: async (Client, message) => {


               const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command antijoin = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}


      

    const args = message.content.split(' ');
    if (args[1] === 'off') {
      await dnb.set(`antijoinEnabled_${message.guild.id}`, false);
      message.reply('AntiJoin has been successfully turned off ❎');
    } else if (args[1] === 'on') {
      await dnb.set(`antijoinEnabled_${message.guild.id}`, true);
      message.reply('AntiJoin has been successfully turned on ✅');
    } else {
      await message.reply('Example: antijoin on/off');
    }
  

    }
}