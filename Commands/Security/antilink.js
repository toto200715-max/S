const d99b = require(`pro.db`)
module.exports = {
    name: `antilink`,
    run: async (Client, message) => {


               const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command antilink = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}


      
        if (!message.guild) return;
   //     if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const args = message.content.split(` `)
        let onoroff =args[1]
        if (!onoroff) return message.reply(`Example: antilinks on/off`);
        if (onoroff == 'on') {
            if (d99b.get(`antilinks-${message.guild.id}`) == 'on') {
                return message.channel.send(`AntiLinks Is already turned on ✅`);
            } else {
                d99b.set(`antilinks-${message.guild.id}`, 'on');
                message.channel.send(`AntiLinks has been successfully turned on ✅`);
            }

        } else if (onoroff == 'off') {
            if (d99b.get(`antilinks-${message.guild.id}`) == 'off') {
                return message.channel.send(`AntiLinks Is already turned off ❎`);
            } else {
                d99b.set(`antilinks-${message.guild.id}`, 'off');
                message.channel.send(`AntiLinks has been successfully turned off ❎`);
            }
        }
    }
}