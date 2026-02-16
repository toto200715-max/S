const { MessageAttachment } = require('discord.js');
const Data = require("pro.db");

module.exports = {
  name: 'avatar',
  aliases: ["A","a","افتار","افتاري","av","avt"],
  run: async (client, message, args) => {
    let setChannel = Data.get(`setChannel_${message.guild.id}`);
    if (setChannel && message.channel.id !== setChannel) return;

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (message.content.split(" ")[1]) {
      try {
        user = await client.users.fetch(message.content.split(" ")[1]);
      } catch (error) {
        console.error("Error fetching user:", error);
        return;
      }
    } else {
      user = message.author;
    }

    const avatarURL = user.avatarURL({ dynamic: true, format: 'png', size: 512 });
    const attachment = new MessageAttachment(avatarURL, 'avatar.png');

    const downloadButton = {
      type: 2,
      style: 5,
      label: "تحميل",
      url: avatarURL
    };

    message.reply({ content: `**أفتار .. ${user.username}**`, files: [attachment], components: [{ type: 1, components: [downloadButton] }] });
  }
};
