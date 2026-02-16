const { owners } = require(`${process.cwd()}/config`);

module.exports = {
  name: 'log-creat',
  run: async (client, message) => {
    if (!owners.includes(message.author.id)) return;

    let guild = message.guild;
    let channels = ["log-join-leave", "log-ban-unban", "log-kick", "log-messages", "log-pic", "log-roles", "log-links", "log-nickname", "log-channels", "log-vjoin-vexit", "log-move", "log-tmute-untmute", "log-bots", "log-prison-unprison"];
    let category = guild.channels.cache.find(channel => channel.name === "logs" && channel.type === "GUILD_CATEGORY");

    if (!category) {
      category = await guild.channels.create("logs", {
        type: "GUILD_CATEGORY",
        permissionOverwrites: [
          { id: guild.roles.everyone, deny: ["SEND_MESSAGES", "VIEW_CHANNEL"] }
        ]
      });
    }

    for (let ch of channels) {
      let existingChannel = guild.channels.cache.find(channel => channel.name === ch && channel.type === "GUILD_TEXT" && channel.parentId === category.id);
      if (!existingChannel) {
        await guild.channels.create(ch, { type: "GUILD_TEXT", parent: category });
      }
    }

    await message.react("✅");
  }
}
