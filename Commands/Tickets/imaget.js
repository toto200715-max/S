const { Client, Collection, MessageAttachment, WebhookClient, Intents, MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageModal, Role, Modal, TextInputComponent } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const db = require(`pro.db`)

module.exports = {
    name: "imaget",
    description: "A simple ping command.",
    run: async (Client, Message) => {
        if(!owners.includes(Message.author.id)) return Message.react('❌');
        if (Message.author.bot) return;
        if (!Message.guild) return;
        const Url = Message.content.split(` `).slice(1).join(` `);
        if (!Url) return Message.reply({ content: `**يرجى ارفاق رابط الصوره .**` })
        Message.react("✅").then(() => {
            db.set(`Image = [${Message.guild.id}]`, Url)
        })
    }
}