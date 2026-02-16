const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);

module.exports = {
  name: 'ban',
  aliases: ['برا', 'بنعالي', 'باند', 'حظر', 'طير', 'فشخ'],
  run: async (client, message) => {
    const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;

    const db = Pro.get(`Allow - Command ban = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

    if (!isAuthorAllowed && message.member.id !== db && !message.member.permissions.has('BAN_MEMBERS')) {
      
      return message.react(`❌`);
    }

    const args = message.content.trim().split(/ +/);
    const member = message.mentions.members.first() || await client.users.fetch(args[1]).catch(() => null);
    if (!member) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}حظر <@${message.author.id}>**`);
      return message.reply({ embeds: [embed] });
    }

    if (member.permissions && member.permissions.has('BAN_MEMBERS')) {
      return message.reply('**لا يمكنك حظر هذا العضو.**');
    }

    const reason = args.slice(2).join(' '); // Extract the reason from the command arguments

    try {
      await message.guild.members.ban(member, { reason }); // Pass the reason as an option to the ban method
      message.react(`✅`);
    } catch (error) {
      console.error(error);
    }
  }
};
