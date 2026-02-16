const d5b = require("pro.db");
const {owners } = require(`${process.cwd()}/config`);
module.exports = {
    name: "imagechat",
    description: "To set Url room",
    usage: "!set-Url <Url>",
    run: async (client, message) => {


        const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command imagechat = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
const isOwner = owners.includes(message.author.id);

if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`);
}

        let Url = message.content.split(` `)[1];
         if (!Url) return message.reply({ content: "**يرجى ارفاق رابط الصوره .**" });
        d5b.set(`Url = [ Colors ]`, Url);
        message.react(`✅`)
    }
};

