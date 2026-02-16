const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const Pro = require(`pro.db`);
const ms = require(`ms`);

module.exports = {
  name: "mute",
  aliases: ["mute", "اسكات", "اسكت"],
  description: "A simple ping command.",
  category: "Informations",
  example: ["ping"],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   */
  run: async (client, message) => {
    const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;

    const Data = Pro;
    const db = Pro.get(`Allow - Command mute = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

    if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.react('❌');
    }

    const MemberID = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(` `)[1]);
    if (!MemberID) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}اسكات <@${message.author.id}>**`);
      return message.reply({ embeds: [embed] });
    }

    const Menu = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId(`Mute`)
        .setPlaceholder(`الاسباب`)
        .addOptions([
          { label: `فذف`, description: `1h`, value: `kzf` },
          { label: `ازعاج`, description: `10m`, value: `az3ag` },
          { label: `سب`, description: `30m`, value: `sb` },
          { label: `تسبب بمشاكل`, description: `15m`, value: `m4akl` },
          { label: `الغاء`, value: `el8a` },
        ])
    );

    message.reply({ content: `يرجي تحديد سبب العقوبه. \n** * ${MemberID}**`, components: [Menu] });

    client.on(`interactionCreate`, async function (interaction) {
      if (!interaction.isSelectMenu()) return;
      if (interaction.customId === `Mute`) {
        if (interaction.values[0] === `kzf`) {
          if (MemberID.id === message.member.id) return message.react('❌');
          if (message.member.roles.highest.position < MemberID.roles.highest.position) return message.react('❌');
          let muteRole = message.guild.roles.cache.find((role) => role.name == "Muted");
          if (!muteRole) {
            message.guild.roles.create({
              name: "Muted",
            }).then((createRole) => {
              message.guild.channels.cache.filter((c) => c.type == "GUILD_TEXT").forEach(c => {
                c.permissionOverwrites.edit(createRole, { SEND_MESSAGES: false, ADD_REACTIONS: false });
              });
              message.react('❌');
            });
          } else {
            await message.react('✅');
            await MemberID.roles.add(muteRole);
            Data.set(`Muted_Member_${MemberID.id}`, 'True'), ms(`1h`);
            await interaction.message.delete();
          }
        } else if (interaction.values[0] === `az3ag`) {
          if (MemberID.id === message.member.id) return message.react('❌');
          if (message.member.roles.highest.position < MemberID.roles.highest.position) return message.react(':x:');
          let muteRole = message.guild.roles.cache.find((role) => role.name == "Muted");
          if (!muteRole) {
            message.guild.roles.create({
              name: "Muted",
            }).then((createRole) => {
              message.guild.channels.cache.filter((c) => c.type == "GUILD_TEXT").forEach(c => {
                c.permissionOverwrites.edit(createRole, { SEND_MESSAGES: false, ADD_REACTIONS: false });
              });
              message.react('❌');
            });
          } else {
            await message.react('✅');
            await MemberID.roles.add(muteRole);
            Data.set(`Muted_Member_${MemberID.id}`, 'True');
          }
        }
      }
    });
  },
};
