const { MessageEmbed, MessageActionRow, MessageButton, Client } = require("discord.js");

module.exports = {
  name: "autoreply",
  aliases: ["إضافة"],
  description: "A simple ping command.",
  category: "Informations",
  example: ["1"],
  run: async (Client, Message) => {
    if (!Message.member.permissions.has("ADMINISTRATOR")) return;

    const Embed = new MessageEmbed()
     // .setDescription("لـ اضافه رد تلقائي\nأضغط عليـ الزر ومن ثم اضف الكلمه ومن ثم الرد")
      .setTimestamp()
      .setColor("2f3136")
      .setThumbnail(Client.user.displayAvatarURL({ dynamic: true }));
    const Bu = new MessageActionRow().addComponents(
      new MessageButton().setCustomId("Auto_Reply").setStyle("SECONDARY").setLabel("Addreply ➕")
    );
    await Message.reply({ embeds: [Embed], components: [Bu] });
  },
};
