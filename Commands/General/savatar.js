const { MessageAttachment } = require('discord.js');
const Data = require("pro.db");

module.exports = {
    name: 'savatar',
  run: async (client, message, args) => {

          let setchannek = Data.get(`setChannel_${message.guild.id}`);
          if (setchannek && message.channel.id !== setchannek) return; // Check if setChannel is defined and if the message is not in the specified channel
          let serverId = message.content.split(" ")[1];
          let guild;
          if (serverId) {
            try {
              guild = await client.guilds.fetch(serverId);
            } catch (error) {
              console.error("Error fetching server:", error);
              return;
            }
          } else {
            guild = message.guild;
          }
      
          const serverIcon = guild.iconURL({ dynamic: true, size: 2048 });
          const serverName = guild.name;
      
          const downloadButton = {
            type: 2,
            style: 5,
            label: "تحميل",
            url: serverIcon
          };
      
          message.reply({
            content: `📸 **${serverName} Avatar**`,
            files: [serverIcon],
            components: [{ type: 1, components: [downloadButton] }]
          });
        

  }
};
