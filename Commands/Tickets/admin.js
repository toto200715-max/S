const { Client, Collection, MessageAttachment, WebhookClient, Intents, MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageModal, Role, Modal, TextInputComponent } = require("discord.js");
const db = require(`pro.db`)
module.exports = {
  name: "admin",
  aliases: ["تيكت"], // Add the alias here
    description: "A simple ping command.",
    run: async (Client, Message) => {
        
const B = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId(`DD`)
      .setStyle(`DANGER`)
      .setEmoji(`🗑`),
    new MessageButton()
      .setCustomId(`D`)
      .setStyle(`SECONDARY`)
      .setEmoji(`➕`),
  )
        const Image = db.get(`Image = [${Message.guild.id}]`)
        const Channel = db.get(`Channel = [${Message.guild.id}]`)
        const Role = db.get(`Role = [${Message.guild.id}]`)
        const Cat = db.get(`Cat = [${Message.guild.id}]`)
        const Parent = Message.guild.channels.cache.find(C => C.id === Cat);
        if (db.get(`member${Message.author.id}`) === true) return Message.reply({ content: `**عذرًا لا يمكنك فتح تذكرة لوجود تذكرة خاصة بك .**`, ephemeral: true })
        await Message.guild.channels.create(`ticket ${Message.author.username}`, {
          type: 'text',
          parent: Parent.id,
          permissionOverwrites: [
            {
              id: Message.author.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
            },
            {
              id: `${Role}`,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
            },
            {
              id: Message.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
          ],
        }).then(async Cahnnels => {
          db.set(`channel${Cahnnels.id}`, Message.author.id)
          db.set(`member${Message.author.id}`, true)
          await Message.react(`✅`)
          Cahnnels.send({ files: [Image], components: [B], content: `${Message.author} | <@&${Role}>` })
        })
    }
}











