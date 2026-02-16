
module.exports = {
    name: 'roleremove', // هنا اسم الامر
    run : async (client, message ) => {



              const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command roleremove = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`)
}

  // if (!message.member.permissions.has('ADMINISTRATOR')) return message.react(`❌`)
    let args = message.content.split(" ");
    let Removed = message.guild.roles.cache.find((role) => role.id === args[1]);
    if (!Removed) {
      message.reply({ content: "**يرجى ارفاق ايدي الرول .**" });
      return;
    }
    let Members = 0;
    for (const member of message.guild.members.cache) {
      if (member[1].roles.cache.has(Removed.id)) {
        try {
          await member[1].roles.remove(Removed);
          Members++;
        } catch (error) {
          console.error(error);
        }
      }
    }
    message.reply({content: `تمت إزالة رول **${Removed.name}** من **${Members}** عضو (s).`});



    }
}
