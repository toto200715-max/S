const Pro = require(`pro.db`)
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
   name: "avtchats",
   aliases: ["avtmbed"],
   run: async (client, message) => {
      if (!message.member.permissions.has(`ADMINISTRATOR`)) return;

      const Color = Pro.get(`Guild_Color = ${message.guild.id}`) || message.guild.me.displayHexColor || `#000000`;
      if (!Color) return;

      const Args = message.content.split(` `);
      if (Args[1] === "list") {
         const savedChannels = Pro.get(`avtchats-[${message.guild.id}]`) || [];
         if (savedChannels.length === 0) {
            return await message.reply({ content: "**لا يوجد شتات افتارت محفوظة حاليًا.**" });
         } else {
            const channelList = savedChannels.map((channelId, index) => `\`${index + 1}\`** - <#${channelId}>**`).join("\n");

            const embed = new MessageEmbed()
               .setTitle("قائمة شتات الإفتارت ")
               .setDescription(channelList)
               .setColor(`${Color || message.guild.me.displayHexColor || `#000000`}`)
               .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

            return await message.reply({ embeds: [embed] });
         }
      }
      
      if (Args[1] === "off") {
         Pro.delete(`avtchats-[${message.guild.id}]`);
         return await message.reply({ content: "**تم حذف شتات الإمبيد.**" });
      }

      if (Args[1] === "on") {
         return await message.reply({ content: "**يرجى ارفاق منشن الشات او الايدي.**" });
      }

      const Channel = message.guild.channels.cache.get(Args[1]);
      if (!Channel) return await message.reply({ content: "**يرجى ارفاق منشن الشات او الايدي.**" });

      const savedChannels = Pro.get(`avtchats-[${message.guild.id}]`) || [];
      if (savedChannels.includes(Channel.id)) {
         return await message.reply({ content: "**هذا الشتات محفوظ بالفعل.**" });
      }

      Pro.push(`avtchats-[${message.guild.id}]`, Channel.id);
      await message.react("✅");
   }
}
