const d8b = require("pro.db");
const {owners } = require(`${process.cwd()}/config`);
module.exports = {
  name: "evaluation",
  description: "To set channel room",
  usage: "!set-channel <channel>",
  run: async (client, message, args) => {



        const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command ochat = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
const isOwner = owners.includes(message.author.id);

if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}


    
 //   if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`**😕 - You don't have permission**`);
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content.split(" ")[1])

    if (!channel) {
      return message.reply("**يرجى ارفاق منشن الشات او الايدي .**");
    }

    d8b.set(`setevaluation_${message.guild.id}`, channel.id);
    message.react(`✅`);
  }
};

