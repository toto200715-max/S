const Pro = require(`pro.db`)
const {owners } = require(`${process.cwd()}/config`);
module.exports = {
    name: "image-cut",
    description: "To set Url room",
    usage: "!set-Url <Url>",
    run: async (client, message) => {


        const db = Pro.get(`Allow - Command image-cut = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
const isOwner = owners.includes(message.author.id);

if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}

        let cut = message.content.split(` `)[1];
         if (!cut) return message.reply({ content: "**يرجى ارفاق رابط الصوره .**" });
         Pro.set(`cut`, cut);
        message.react(`✅`)
    }
};

