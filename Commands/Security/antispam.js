const dzb = require(`pro.db`)
module.exports = {
    name: `antispam`,
    run: async (Client, message) => {


               const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command antibots = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}

      
  if (message.author.bot) return;


    const args = message.content.split(' ');
    const command = args[1];

    if (command === 'on') {
      spamProtectionEnabled = true;
      await dzb.set('spamProtection', true);
      await message.reply('AntiSpam has been successfully turned on ✅');
    } else if (command === 'off') {
      spamProtectionEnabled = false;
      await dzb.set('spamProtection', false);
      await message.reply('AntiSpam has been successfully turned off ❎');
    } else {
      await message.reply('Example: antispam on/off');
    }
  


    }
}

