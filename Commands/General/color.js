const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "color",
  aliases: ["لون"],
  description: "to choose specific color",
  cooldowns: [10],
  ownerOnly: false,
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply("**يُرجي  كتابة رقم اللون بعد آلإمر .**");
    }

   const allowedColors = Array.from({ length: 200 }, (_, i) => (i + 1).toString());

    if (!allowedColors.includes(args[0])) {
      return message.channel.send("**اللون الذي اخترته غير موجود**");
    }

    let a = message.guild.roles.cache.find(zeny => {
      return zeny.name.toLowerCase() === `${""}${args.join(" ").toLowerCase()}${""}`;
    });

    if (!a) {
      return message.channel.send("**. رقم لون غير موجود**");
    }

    if (!a.editable) {
      return message.channel.send("**ليس لدي أذونات للتعديل / منح هذا الدور!**");
    }

    const memberRoles = [...message.member.roles.cache.values()];
    memberRoles.forEach(danessa => {
      if (allowedColors.includes(danessa.name.toLowerCase()) && args.join(" ").toLowerCase() !== danessa.name.toLowerCase()) {
        if (message.member.roles.cache.find(erikson => {
          return erikson.id === danessa.id;
        })) {
          message.member.roles.remove(danessa).catch(tyonnah => {
            return message.channel.send(tyonnah.message);
          });
        }
      }
    });

  await message.member.roles.add(a).then((g) => {
  let embed = new Discord.MessageEmbed()
    .setDescription(`** ${message.member.user} تم تغيير اللون بنجاح (${a.name})  ✅**`)
    
    .setColor(a.color)
  return message.channel.send({ embeds: [embed] });
}).catch(kainyn => {
  return message.channel.send(kainyn.message);
});
  }
};