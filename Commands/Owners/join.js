let { Client } = require("discord.js");
let { joinVoiceChannel } = require("@discordjs/voice");
const Setting_ = require('pro.db');
const { owners } = require(`${process.cwd()}/config`);

module.exports = {
  name: "bot-setvoice",
  description: '〡Join To Voice Channel..',
  aliases: ["setvoice", "247"],
  example: ["setvoice"],
  run: async (client, message) => {
    const Pro = require(`pro.db`);
    const db = Pro.get(`Allow - Command setvoice = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
    const isOwner = owners.includes(message.author.id);

    if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
      return message.react(`❌`);
    }

    try {
      let args = message.content.split(" ");
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if (!channel || channel.type !== 'GUILD_VOICE') {
        return await message.reply({ content: `**يرجى ارفاق منشن الفويس او الايدي .**` });
      }
      Setting_.set(`Voice_${client.user.id}`, channel.id);
      let connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfMute: true, // يصمت البوت
        selfDeaf: true
      });
      connection.on('ready', () => {
        message.react("✅");
      });
      connection.on('error', (error) => {
        console.log(error);
        message.reply({ content: `**هناكَ خطأٌ يرجى إصلاحهُ**\n\n\`\`\`js\n${error}\`\`\`` });
      });
    } catch (e) {
      return;
    }
  }
};
