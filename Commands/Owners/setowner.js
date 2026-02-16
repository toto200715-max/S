let config = require("../../config.json");
const { prefix, owners } = require(`${process.cwd()}/config`);
let fs = require("fs");
const db = require("pro.db");
const Discord = require("discord.js");

module.exports = {
    name: 'setowner', // Command name
    run: async (client, message, args) => {

        const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
        if (!Color) return;
        
        if (!owners.includes(message.author.id)) return message.react(`❌`);

        if (args[0] === 'list') {
            const ownersList = config.owners.map((ownerId, index) => `**\`${index + 1}\` - <@${ownerId}>**`).join("\n");
            const embed = new Discord.MessageEmbed()
                .setTitle("قائمة الاونرات")
                .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setDescription(`${ownersList}`);
            return message.channel.send({ embeds: [embed] });
        }

        if (args[0] === 'remove') {
            const id = args[1];

            if (!id || isNaN(id)) {
                return message.reply("**يرجى ارفاق الايدي .**");
            }

            const index = config.owners.indexOf(id);

            if (index === -1) {
                return message.reply("`** غير موجود .. **`");
            }

            config.owners.splice(index, 1);

            fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) => {
                if (err) console.log(err);
            });

            return message.react("✅");
        }

        if (!args[0] || isNaN(args[0])) {
            return message.reply("**يرجى ارفاق الايدي .**");
        }

        const id = args[0];

        if (config.owners.includes(id)) {
            return message.reply("`** موجود من قبل .. **`");
        }

        config.owners.push(id);

        fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) => {
            if (err) console.log(err);
        });

        message.react("✅");
    }
};
