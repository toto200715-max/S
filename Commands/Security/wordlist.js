const { Message, Client } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const dtb = require(`pro.db`);
module.exports = {
    name: "wordlist",
    aliases: ["wordlist"],
    description: "Show all words in the database.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
  
    run: async (client, message) => {

        const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command wordlist = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
const isOwner = owners.includes(message.author.id);

if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}

      
      //  if (!message.member.permissions.has(`ADMINISTRATOR`)) return;
        const words = dtb.get(`word_${message.guild.id}`);
        if (!Array.isArray(words) || words.length === 0) {
            return message.reply({ content : "**لا يوُجد كلمات يعاقب كاتبها .**"});
        }
        
        const wordsList = words.join(" , ");
        
        message.reply({ content : `|| ${wordsList} ||`});
    }
}