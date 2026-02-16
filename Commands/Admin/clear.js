module.exports = {
  name: 'clear',
  aliases: ['مسح'],
  run: async (client, message, args) => {
    const Pro = require('pro.db');
    const db = Pro.get(`Allow - Command clear = [ ${message.guild.id} ]`);
    const allowedRole = message.guild.roles.cache.get(db);
    const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

    if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.react('❌');
    }

    message.delete({ timeout: 0 });

    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.react('❌');

    let a12rgs = message.content.split(' ').slice(1);
    let messagecount = parseInt(a12rgs);
    if (a12rgs > 100) {
      return message.channel.send({
        content: '```javascript\nI can\'t delete more than 100 messages\n```'
      }).then(messages => messages.delete({ timeout: 1000 }));
    }
    if (!messagecount) messagecount = 100;

    try {
      let fetchedMessages;
      if (message.mentions.users.size > 0) {
        const mentionedUser = message.mentions.users.first();
        fetchedMessages = await message.channel.messages.fetch({ limit: messagecount });
        fetchedMessages = fetchedMessages.filter(msg => msg && msg.author && msg.author.id === mentionedUser.id);
      } else {
        fetchedMessages = await message.channel.messages.fetch({ limit: messagecount });
      }
    
      const deletedMessages = await message.channel.bulkDelete(fetchedMessages, true);
      const msgsize = deletedMessages.size;
      const logChannel = message.guild.channels.cache.find(channel => channel.name === 'log-messages');
      if (logChannel) {
        let logContent = deletedMessages.map(msg => `${msg.author.username}: ${msg.content}`).join('\n');
        if (logContent.length > 2000) {
          logContent = logContent.slice(0, 1997) + '...';
        }
        logChannel.send({
          content: '```javascript\n' + logContent + '\n```'
        });
      }
    } catch (err) {
      console.error(err);
    }
    
  }
};
