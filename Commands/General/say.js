const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'say',
    run: async (client, message, args) => {
        const Pro = require('pro.db');
        const db = Pro.get(`Allow - Command say = [ ${message.guild.id} ]`);
        const allowedRole = message.guild.roles.cache.get(db);
        const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

        if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has('ADMINISTRATOR')) {
            return message.react('❌');
        }

        if (message.author.bot) return;
        if (!message.channel.guild) return;
        if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            return message.reply('**لا استطيع إرسال الرسالة.**');
        }

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let content = args.slice(1).join(' ');
        let attach = message.attachments.first();

        if (!channel) return message.reply('**يرجى إرفاق منشن الشات أو الايدي.**');
        if (!content && !attach) return message.reply('**يرجى إرسال الرسالة أو رفع صورة.**');

        message.delete();

        try {
            if (attach) {
                const attachment = new MessageAttachment(attach.url);
                await channel.send({ content: content || ' ', files: [attachment] });
            } else {
                await channel.send({ content: content || ' ' });
            }
        } catch (error) {
            console.error(error);
            return message.reply('**حدث خطأ أثناء إرسال الرسالة.**');
        }
    }
}
