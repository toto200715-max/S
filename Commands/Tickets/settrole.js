const { Client, Collection, MessageAttachment, WebhookClient, Intents, MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageModal, Role, Modal, TextInputComponent } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const db = require(`pro.db`)

module.exports = {
    name: "settrole",
    description: "A simple ping command.",
    run: async (Client, Message) => {
        if (Message.author.bot) return;
        if(!owners.includes(Message.author.id)) return Message.react('❌');
        if (!Message.guild) return;
        const Role = Message.mentions.roles.first() || Message.content.split(` `)[1];
        if (!Role) return Message.reply({ content: `**يرجى ارفاق منشن الرول او الايدي .**` })
        Message.react("✅").then(() => {
          db.set(`Role = [${Message.guild.id}]`, Role.id)
        })
    }
}