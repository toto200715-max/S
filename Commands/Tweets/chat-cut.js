const Pro = require(`pro.db`);
const { owners } = require(`${process.cwd()}/config`);

module.exports = {
  name: "chat-cuts",
  run: async (client, message, args) => {
    const db = Pro.get(`Allow - Command chat-cuts = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
    const isOwner = owners.includes(message.author.id);
  
    if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
      return message.react(`❌`);
    }
  
    if (args[0] === "list") {
      const savedChannel = Pro.get(`chat-cuts_${message.guild.id}`);
      if (!savedChannel) {
        return message.reply("**No channel is currently saved.**");
      }
      return message.channel.send(`**Saved Channel:** <#${savedChannel}>`);
    }
  
    if (args[0] === "remove") {
      const savedChannel = Pro.get(`chat-cuts_${message.guild.id}`);
      if (!savedChannel) {
        return message.reply("**No channel is currently saved.**");
      }
      Pro.delete(`chat-cuts_${message.guild.id}`);
      return message.react(`✅`);
    }
  
    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(message.content.split(" ")[1]);
  
    if (!channel) {
      return message.reply("**يرجى ارفاق منشن الشات او الايدي .**");
    }
  
    Pro.set(`chat-cuts_${message.guild.id}`, channel.id);
    message.react(`✅`);
  },
  
};
