module.exports = {
  name: "rooms",
  description: "اظهار الاعضاء يلي بروم الصوتي",
  run: async (client, message, args) => {
    const Pro = require(`pro.db`);
    const db = Pro.get(`Allow - Command rooms = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

    if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has('BAN_MEMBERS')) {
      return message.react(`❌`);
    }

    const voiceMembers = message.guild.members.cache.filter(member => member.voice.channel);
    const sortedMembers = voiceMembers.sort((a, b) => a.voice.channel.position - b.voice.channel.position);

    let msg = "";
    sortedMembers.forEach((member) => {
      msg += `${member}\n`;
    });

    if (msg.length > 0) {
      message.channel.send(`**الاعضاء المتواجدين بالرومات :**\n ${msg}`);
    } else {
      message.reply(`** لا يوجد اعضاء بالرومات الصوتيه .**`);
    }
  }
};


