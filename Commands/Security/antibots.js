const d2b = require('pro.db');
module.exports = {
    name: `antibots`,
    run: async (Client, message) => {


               const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command antibots = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}


        if (!message.guild) return;
    //    if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const args = message.content.split(` `)
        let onoroff = args[1]
        if (!onoroff) return message.reply(`Example: antibots on/off`)
        if (onoroff == 'on') {
            if (d2b.get(`antibots-${message.guild.id}`) == 'on') {
                return message.channel.send(`AntiBot is already turned on ✅`);
            } else {
                d2b.set(`antibots-${message.guild.id}`, 'on');
                message.channel.send(`AntiBot has been successfully turned on ✅`);
            }
        } else if (onoroff == 'off') {
            if (d2b.get(`antibots-${message.guild.id}`) == 'off') {
                return message.channel.send(`AntiBot is already turned off ❎`);
            } else {
                d2b.set(`antibots-${message.guild.id}`, 'off');
                message.channel.send(`AntiBot has been successfully turned off ❎`);
            }

        }
    }
}