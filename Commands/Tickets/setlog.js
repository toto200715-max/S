const { Client, Collection, MessageAttachment, WebhookClient, Intents, MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageModal, Role, Modal, TextInputComponent } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const db = require(`pro.db`)

module.exports = {
    name: "ticlog",
    description: "A simple ping command.",
    run: async (Client, Message) => {
        if (Message.author.bot) return;
        if(!owners.includes(Message.author.id)) return Message.react('❌');
        if (!Message.guild) return;
        const Channel = Message.mentions.channels.first() || Message.content.split(` `)[1];
        if (!Channel) return Message.reply({ content: `**يرجى ارفاق منشن الشات او الايدي .**` })
        Message.react("✅").then(() => {
          db.set(`Channel = [${Message.guild.id}]`, Channel)
        })
    }
}