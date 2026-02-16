const Jimp = require('jimp');
const { MessageAttachment } = require('discord.js');
module.exports = {
    name: 'change', // هنا اسم الامر
    run: async (client, message, args) => {
       try {
          let imageUrl;
          if (message.attachments.size > 0) {
             imageUrl = message.attachments.first().url;
          } else {
             imageUrl = message.author.displayAvatarURL({ format: 'png' })

          }
          if (!imageUrl) return;
          const image = await Jimp.read(imageUrl);
          image.greyscale();
          image.resize(800, Jimp.AUTO); // تغيير حجم الصورة إلى عرض 800 بكسل وارتفاع تلقائي
          const convertedImageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
          const Image = new MessageAttachment(convertedImageBuffer, 'converted-image.png');
          const loadingMessage = await message.channel.send("** برجاء الانتظار .. ⏰**");
          await message.reply({ files: [Image] });
          await loadingMessage.delete();
       } catch {
          return;
       }
    }
}
