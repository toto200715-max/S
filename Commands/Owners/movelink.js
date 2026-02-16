const { owners } = require(`${process.cwd()}/config`);
module.exports = {
    name: 'movelink',
    run: async (client, message, args) => {
        const Pro = require(`pro.db`);
        const db = Pro.get(`Allow - Command viplink = [ ${message.guild.id} ]`);
        const allowedRole = message.guild.roles.cache.get(db);
        const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
        const isOwner = owners.includes(message.author.id);

        if (!isAuthorAllowed && message.author.id !== db && !isOwner) {
            return message.react(`❌`);
        }

        try {
            const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;
            await message.author.send({ content: inviteLink });
            message.react("✅");
        } catch (error) {
            console.error(`An error occurred while sending the invite link: ${error}`);
        }
    }
};
