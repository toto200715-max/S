const { owners } = require(`${process.cwd()}/config`);

module.exports = {
    name: 'servername',
    run: (client, message, args) => {
        const Pro = require(`pro.db`);
        const db = Pro.get(`Allow - Command setname = [ ${message.guild.id} ]`);
        const allowedRole = message.guild.roles.cache.get(db);
        const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
        const isOwner = owners.includes(message.author.id);

        if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
            return message.react('❌');
        }

        let newName = args.join(' ');

        if (!newName) {
            return message.reply('⛔️ **يرجى ارفاق اسم السيرفر الجديد .**');
        }

        try {
            message.guild.setName(newName);
            message.react('✅');
        } catch (error) {
            console.error(error);
            message.react('❌');
        }
    }
};
