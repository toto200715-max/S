const config = require(`${process.cwd()}/config`);
const fs = require('fs');
const { owners } = config;
module.exports = {
    name: "restart",
    description: "restarting",
    run: async (client, message) => {

        const filePath = 'database.json';
        const isOwner = owners.includes(message.author.id);
        if (!isOwner) return message.react("❌");
        const reply = await message.reply({ content: "**اعادة ظبط البوت ..**" });
        await client.destroy();
        await client.login(config.token);
        fs.writeFileSync(filePath, JSON.stringify({}));
        reply.edit({ content: "**تم اعادة الظبط بنجاح**" });
    }
};




