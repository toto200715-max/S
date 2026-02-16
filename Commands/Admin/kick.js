const Pro = require(`pro.db`);
const { MessageEmbed } = require(`discord.js`);
const { prefix, owners } = require(`${process.cwd()}/config`);

module.exports = {
    name: `kick`,
    aliases: ["طرد"],
    run: async function (client, message) {
        const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
        if (!Color) return;

            const args = message.content.split(' ');
        const db = Pro.get(`Allow - Command kick = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('KICK_MEMBERS')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}

              const memberArg = args[1];
              const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === memberArg || member.user.tag === memberArg || member.user.username === memberArg);
              if (!member) {
                const embed = new MessageEmbed()
                  .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
                  .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}طرد <@${message.author.id}>**`);
                return message.reply({ embeds: [embed] });
              }
              if (member.roles.highest.position >= message.member.roles.highest.position) { return message.react('❌'); }
              await member.kick();
              return message.react('✅');
            



    }
};
