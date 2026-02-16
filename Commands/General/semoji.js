const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'semoji',
  run: (client, message, args) => {
    const Command = message.content.split(' ');

    const emojis = Command.slice(1);
    if (emojis.length === 0) {
      return message.reply({ content: '**يرجى ارفاق الاموجي .**' });
    }

    const rows = [];
    for (const emoji of emojis) {
      const emojiId = emoji.slice(emoji.length - 20, emoji.length - 1);
      if (isNaN(emojiId)) {
        message.react('❌');
        continue;
      }

      const emojiURL = emoji.startsWith('<a:')
        ? `https://cdn.discordapp.com/emojis/${emojiId}.gif`
        : `https://cdn.discordapp.com/emojis/${emojiId}.png`;

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('➕')
          .setStyle('تحميل')
          .setURL(emojiURL)
      );

      rows.push(row);
      message.reply({ content: emojiURL, components: [row] });
    }
  }
};
