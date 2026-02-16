const { owners } = require(`${process.cwd()}/config`);

module.exports = {
  name: 'log-delete',
  run: async (client, message) => {
    if (!owners.includes(message.author.id)) return;

    let channelsToDelete = ["log-join-leave", "log-ban-unban", "log-kick", "log-messages", "log-pic", "log-roles", "log-links", "log-nickname", "log-channels", "log-vjoin-vexit", "log-move", "log-tmute-untmute", "log-bots", "log-prison-unprison"];

    let skipNext = false;

    for (let i = 0; i < channelsToDelete.length; i++) {
      let channelName = channelsToDelete[i];
      if (skipNext) {
        skipNext = false;
        continue;
      }

      let channel = message.guild.channels.cache.find(ch => ch.name === channelName && ch.type === 'GUILD_TEXT');
      if (channel) {
        await channel.delete();
        console.log(`Deleted channel: ${channel.name}`);
      } else {
        console.log(`Channel ${channelName} not found. Skipping deletion.`);
        skipNext = true;
      }
    }

    await message.react("✅");
  }
}
