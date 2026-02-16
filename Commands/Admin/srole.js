const { MessageEmbed } = require("discord.js");
const Pro = require(`pro.db`);
const { prefix, owners } = require(`${process.cwd()}/config`);

module.exports = {
  name: "srole",
  run: async (client, message) => {
    const Color =
      Pro.get(`Guild_Color = ${message.guild.id}`) ||
      message.guild.me.displayHexColor ||
      `#000000`;
    if (!Color) return;

    const db = Pro.get(`Allow - Command srole = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
    if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has("MANAGE_ROLES")) {
      return message.react(`❌`);
    }

    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}srole <@${message.author.id}> rose**`);

      message.reply({ embeds: [embed] });
      return;
    }

    const roleName = message.content.slice(message.content.indexOf(mentionedUser.toString()) + mentionedUser.toString().length).trim();
    if (!roleName) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}srole <@${message.author.id}> rose**`);

      message.reply({ embeds: [embed] });
      return;
    }

    const member = message.guild.members.cache.get(mentionedUser.id);
    if (!member) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**لا يمكن العثور على العضو .**`);
      message.reply({ embeds: [embed] });
      return;
    }

    message.guild.roles
      .create({
        name: roleName,
      })
      .then((role) => {
        member.roles.add(role);
        message.react("✅");
      });
  },
};
