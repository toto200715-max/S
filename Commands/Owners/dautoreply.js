const { MessageEmbed, MessageActionRow, MessageButton, Message, Client } = require("discord.js");
const db = require(`pro.db`)
module.exports = {
    name: "dautoreply",
    aliases: ["حذف"],
    description: "A simple ping command.",
    category: "Informations",
    example: ["2"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (Client, Message) => {
        const Args = Message.content.split(` `).slice(1).join(' ')
        if(!Message.member.permissions.has(`ADMINISTRATOR`)) return
        if (!db.get(`Replys_${Args}`)) return await Message.reply({ content: `**ارسل الرد المُراد حذفه .**` });
        db.delete(`Replys_${Args}`);
        Message.react(`✅`)
    }
}
