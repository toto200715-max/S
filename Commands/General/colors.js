const { MessageAttachment } = require("discord.js");
const db = require("pro.db");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  name: "colors",
  aliases: ["الوان"],
  description: "Shows server colors",
  run: async (client, message) => {
    const colorRoles = message.guild.roles.cache.filter(
      (role) => !isNaN(role.name) && !role.name.includes(".")
    );
    
    if (colorRoles.size === 0) {
      return message.reply("**لا يوجد اللوان فالسيرفر .**");
    }

    const sortedRoles = colorRoles.sort((roleA, roleB) => roleB.position - roleA.position);

    let minRange = 1;
    let maxRange = 11;
    let canvasHeight = 330;

    if (sortedRoles.size > 11) {
      minRange = 12;
      maxRange = 15;
      canvasHeight = 400;
    } if (sortedRoles.size > 22) {
      minRange = 22;
      maxRange = 33;
      canvasHeight = 500;
    } if (sortedRoles.size > 34) {
      minRange = 34;
      maxRange = 44;
      canvasHeight = 600;
    }

    const colrsList = createCanvas(1200, canvasHeight); 

    const Url = db.get("Url = [ Colors ]");

    let backgroundImage;
    if (Url) {
      try {
        backgroundImage = await loadImage(Url);
      } catch (error) {
        console.error("Error loading background image:", error);
      }
    }

    const ctx = colrsList.getContext("2d");
    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, 1200, 500);
    }

    let x = 20;
    let y = 145;

    sortedRoles.forEach((colorRole) => {
      x += 90;
      if (x > 1080) {
        x = 110;
        y += 90;
      }

      ctx.textBaseline = "middle"; 
      ctx.textAlign = "center"; 
      ctx.fillStyle = colorRole.hexColor; // ضبط لون التعبئة

      const borderRadius = 15; // الحدود
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + 70 - borderRadius, y);
      ctx.quadraticCurveTo(x + 70, y, x + 70, y + borderRadius);
      ctx.lineTo(x + 70, y + 70 - borderRadius);
      ctx.quadraticCurveTo(x + 70, y + 70, x + 70 - borderRadius, y + 70);
      ctx.lineTo(x + borderRadius, y + 70);
      ctx.quadraticCurveTo(x, y + 70, x, y + 70 - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.fill();
      

      ctx.shadowColor = "black";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;

      const colorNumber = colorRole.name;
      const fontSize = "32px";
      const cellWidth = 70;
      const cellHeight = 70;

      ctx.font = fontSize + " Arial";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      ctx.strokeText(colorNumber.toString(), x + cellWidth / 2, y + cellHeight / 2);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(colorNumber.toString(), x + cellWidth / 2, y + cellHeight / 2);

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });

    const attachment = new MessageAttachment(colrsList.toBuffer(), "img.png");

    // إرسال الصورة المرفقة
    message.channel.send({ files: [attachment] });
  }
};
