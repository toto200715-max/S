const { MessageEmbed } = require("discord.js");
const Pro = require(`pro.db`)
const { prefix, owners } = require(`${process.cwd()}/config`);
module.exports = {
    name: "addrole",
    run: async (client, message) => {

        const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
        if (!Color) return;
        
const db = Pro.get(`Allow - Command addrole = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('MANAGE_ROLES')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`)
}


              const roleName = message.content.slice(8).trim(); 
              if (!roleName) {
                const embed = new MessageEmbed()
                .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
                .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}addrole اسم الرول**`);
                message.reply({ embeds: [embed] });
                return;
              }
              message.guild.roles.create({
                name: roleName,
              })
                .then(role => {
                  message.react("✅");
                })
        

    }
}
