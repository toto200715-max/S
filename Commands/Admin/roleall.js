module.exports = {
    name: 'allrole', // هنا اسم الامر
    run : (client, message, args) => {



              const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command allrole = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`)
}

//     if (!message.member.permissions.has('ADMINISTRATOR')) return message.react(`❌`)
    var rrole = message.content.split(" ").slice(1).join(" ");
    var role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === rrole)||message.guild.roles.cache.find(r => r.id === rrole);
    if(!role) return message.reply(`**🤨 - يرجى ارفاق منشن الرول او الايدي .**`);
    message.guild.members.cache.forEach(async m => {
        await m.roles.add(role)
    })
    message.reply({content : `**يتم اعضاء الرول لـ جميع الاعضاء الَان .**`})
 
    }
}

