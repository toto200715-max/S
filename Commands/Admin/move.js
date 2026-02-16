const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);
module.exports = {
    name: 'move', // هنا اسم الامر
  aliases: ["سحب","اسحب"],
    run : (client, message, args) => {

      const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
      if (!Color) return;

        const db = Pro.get(`Allow - Command move = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('MOVE_MEMBERS')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react('❌');
}

   
  const a9rgs = message.content.split(' ');
  const command = a9rgs[0];
  //  if (!message.member.permissions.has('MOVE_MEMBERS')) { return message.react('❌'); }
    const memberArg = a9rgs[1];
    const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === memberArg || member.user.tag === memberArg || member.user.username === memberArg);
    if (!member) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}سحب <@${message.author.id}>**`);
      return message.reply({ embeds: [embed] });
    }






    const authorVoiceChannel = message.member.voice.channel;
    const memberVoiceChannel = member.voice.channel;
    if (!memberVoiceChannel || authorVoiceChannel === memberVoiceChannel) { return message.react('❌'); }
    member.voice.setChannel(authorVoiceChannel);
    return message.react('✅');

 }   
}
