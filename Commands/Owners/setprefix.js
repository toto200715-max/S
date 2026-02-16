const { MessageEmbed } = require("discord.js");
let config = require("../../config.json");
let fs = require("fs");

module.exports = {
    name: 'setprefix', // هنا اسم الامر
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            // إجراءات للتصرف عندما لا يتحقق الشرط
            return message.react('❌');
        }

        if (!args[0]) {
            const reply = await message.reply(`** . بادئة البوت : ${config.prefix} **`);
            setTimeout(() => {
                reply.edit("**يرجى إدخال بادئة البوت الجديدة .**");
            }, 5000);
            return;
        }

        config.prefix = args[0];

        fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) => {
            if (err) console.log(err);
        });

        message.reply(`**تم تعيين البادئة إلى ${args[0]} بنجاح .**`);
    }
};
