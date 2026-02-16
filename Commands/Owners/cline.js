const dub = require("pro.db");
const { owners } = require(`${process.cwd()}/config`);
module.exports = {
  name: "cline",
  description: "To set channel room",
  usage: "!set-channel <channel>",
  run: async (client, message, args) => {
    const Pro = require(`pro.db`);
    const db = Pro.get(`Allow - Command cline = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
    const isOwner = owners.includes(message.author.id);

    if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
      return message.react(`❌`);
    }

    const channels = message.mentions.channels; // Get the mentioned channels

    if (channels.size === 0) {
      return message.reply("**يرجى ارفاق منشن الشات او الايدي .**");
    }

    let storedChannels = await dub.get("Channels") || [];

    channels.forEach((channel) => {
      if (storedChannels.includes(channel.id)) {
        message.reply(`** هذا الشات موجود بالفعل ."${channel.name}**"`);
      } else {
        storedChannels.push(channel.id);
        dub.set("Channels", storedChannels);
      }
    });

    message.react(`✅`);
  },
};
