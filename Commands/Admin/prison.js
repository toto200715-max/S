const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const { prefix, owners } = require(`${process.cwd()}/config`);
const ms = require('ms');
const moment = require('moment');
const Data = require('pro.db');
const db = require('pro.db');

module.exports = {
  name: 'سجن',
  aliases: ['prison'],
  run: async (client, message) => {
    const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
    if (!Color) return;

    const Pro = require(`pro.db`);
    const allowDb = Pro.get(`Allow - Command prison = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(allowDb);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

    if (!isAuthorAllowed && message.author.id !== allowDb && !message.member.permissions.has('MUTE_MEMBERS')) {
      return message.react(`❌`);
    }

    let args = message.content.split(' ').slice(1);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member) {
      const embed = new MessageEmbed()
        .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
        .setDescription(`**يرجى استعمال الأمر بالطريقة الصحيحة .\n${prefix}سجن <@${message.author.id}>**`);
      return message.reply({ embeds: [embed] });
    }

    if (member.id === message.member.id) return message.react('❌');
    if (message.member.roles.highest.position < member.roles.highest.position) return message.react('❌');

    const menuOptions = [
      { label: 'مشاكل متكررة.', description: `يوم`, value: 'v1' },
      { label: 'قذف , سب , تشفير.', description: `يومين.`, value: 'v2' },
      { label: 'يدخل حسابات وهمية', description: `يومين.`, value: 'v3' },
      { label: 'يُروج فالخاص لسيرفر', description: `ثلاث ايام.`, value: 'v4' },
    ];

    const menu = new MessageSelectMenu()
      .setCustomId('prison_menu')
      .setPlaceholder('اختر عقوبة العضو ووقت السجن')
      .addOptions(menuOptions);

    const deleteButton = new MessageButton()
      .setCustomId('Cancel')
      .setLabel('الغاء')
      .setStyle('SECONDARY');

    const menuRow = new MessageActionRow().addComponents(menu);
    const buttonRow = new MessageActionRow().addComponents(deleteButton);

    message.reply({ content: `**يرجي تحديد سبب العقوبه.**\n** * <@${member.id}>**`, components: [menuRow, buttonRow] });

    const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', (interaction) => {
      const selectedOption = interaction.values[0];

      if (selectedOption === 'v1') {
        const time = '1d';
        applyMute(member, time);
      } else if (selectedOption === 'v2') {
        const time = '2d';
        applyMute(member, time);
      } else if (selectedOption === 'v3') {
        const time = '2d';
        applyMute(member, time);
      } else if (selectedOption === 'v4') {
        const time = '2d';
        applyMute(member, time);
      } 

      message.react("✅");
      interaction.message.delete();
    });


    function applyMute(member, time) {
      let muteRole = message.guild.roles.cache.find((role) => role.name == 'prison');
      if (!muteRole) {
        message.guild.roles.create({
          name: 'prison',
        }).then((createRole) => {
          message.guild.channels.cache.filter((c) => c.type === 'GUILD_TEXT').forEach(c => {
            c.permissionOverwrites.edit(createRole, { SEND_MESSAGES: false, VIEW_CHANNEL: false });
          });
          message.guild.channels.cache.filter((c) => c.type === 'GUILD_VOICE').forEach(c => {
            c.permissionOverwrites.edit(createRole, { VIEW_CHANNEL: false });
          });
          message.guild.members.cache.get(member.id)?.roles.add(createRole);
          Data.set(`MutedMember_${member.id}`, 'True', ms(time));
          setTimeout(() => {
            message.guild.members.cache.get(member.id)?.roles.remove(createRole);
            Data.delete(`MutedMember_${member.id}`);
          }, ms(time));
        });
      } else {
        message.guild.members.cache.get(member.id)?.roles.add(muteRole);
        Data.set(`MutedMember_${member.id}`, 'True', ms(time));
        setTimeout(() => {
          message.guild.members.cache.get(member.id)?.roles.remove(muteRole);
          Data.delete(`MutedMember_${member.id}`);
        }, ms(time));
      }
    }

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isButton()) return;

      if (interaction.customId === 'Cancel') {
        interaction.message.delete();
      }
    });
  }
};
