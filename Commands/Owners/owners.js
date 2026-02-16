let config = require("../../config.json");
const { prefix, owners } = require(`${process.cwd()}/config`);
let fs = require("fs");
const db = require("pro.db");
const Discord = require("discord.js");

module.exports = {
    name: 'owners',
    run: async (client, message, args) => {
        const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
        if (!Color) return;

        if (args[0] === 'link') {
            const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;

            const button = new Discord.MessageButton()
                .setLabel("إضافة")
                .setStyle("LINK")
                .setURL(inviteLink);

            const row = new Discord.MessageActionRow().addComponents(button);

            try {
                await message.author.send({ content: "**اضغط علي الزر لإضافة البوت .**", components: [row] });
                return message.react("✅");
            } catch (error) {
                console.error(`An error occurred while sending the invite link: ${error}`);
                return message.react("❌");
            }
        }

        if (!owners.includes(message.author.id)) return message.react(`❌`);

        const sortedOwners = config.owners.map((ownerId, index) => ` \`${index + 1}\` - <@${ownerId}>`).join("\n");

        const embed = new Discord.MessageEmbed()
            .setTitle("قائمة الأونرز")
            .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
            .setDescription(`${sortedOwners}`)
            .setFooter(client.user.username, client.user.displayAvatarURL());

        return message.reply({ embeds: [embed] });
    }
};
