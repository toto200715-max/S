const { Client, intents, Collection, MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require("discord.js");
const client = new Client({ intents: 32767 })
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.listen(3000, () => {
  console.log('Server Started');
});

const fs = require("fs")
const ms = require(`ms`)
const Discord = require("discord.js")
const { prefix, owners } = require(`${process.cwd()}/config`);
const config = require(`${process.cwd()}/config`);
const Data = require("pro.db")
const mongoose = require("mongoose")
const { createCanvas, registerFont } = require("canvas")
const canvas = require('canvas')
const {  MessageSelectMenu } = require('discord.js');
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require(`${process.cwd()}/config`);
require("./handler")(client);
client.prefix = prefix;
client.login(config.token);
mongoose.connect(config.db)
.then(() => { console.log("MongoDB Connected ✅"); })
.catch((err) => { console.error("Failed to connect to MongoDB", err); });
require("events").EventEmitter.defaultMaxListeners = 9999999;
client.on("ready", async () => {
  console.log(`Name : ${client.user.tag}
Ping : ${client.ws.ping}
Prefix : ${client.prefix}
ID : ${client.user.id}
Server : ${client.guilds.cache.size}
Members : ${client.users.cache.size}
Channels : ${client.channels.cache.size}`)
});



process.on("unhandledRejection", (reason, promise) => { return })
process.on("uncaughtException", (err, origin) => { return })
process.on('uncaughtExceptionMonitor', (err, origin) => { return });
process.on('multipleResolves', (type, promise, reason) => { return })

var { inviteTracker } = require("discord-inviter");
tracker = new inviteTracker(client);
registerFont("FiraSans-Regular.ttf", { family: "خط" });
const db = require("./models/welcome"); // Replace "db" with the actual name of your database model
const db1 = require("./models/welcome");
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  let args = message.content.split(" ");
  if (!message.member.permissions.has("ADMINISTRATOR")) return;
  let data = await db1.findOne({
    id: message.guild.id,
  });
  if (args[0] === prefix + "wsize") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.wsize = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "hsize") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.hsize = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "xavatar") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.xavatar = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "yavatar") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.yavatar = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "sxavatar") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.sxavatar = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "syavatar") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.syavatar = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "xname") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.xname = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "yname") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 4056 ||
      Number(args[1]) < 10
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {شكلك
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.yname = Number(args[1]);
    await data.save();
    message.react(`✅`);

  } else if (args[0] === prefix + "sname") {
    if (
      !args[1] ||
      isNaN(Number(args[1])) ||
      Number(args[1]) > 2000 ||
      Number(args[1]) < 1
    )
      return message.reply({
        content: `**❌ - يرجى كتابة الحجم الصحيح.**`,
      });
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.sname = Number(args[1]);
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "ncolor") {
    if (!args[1])
      return message.reply({ content: `**❌ - يرجى كتابة اللون.**` });
    let code = await verifyColor(args[1]);
    if (!code)
      return message.react(`❌`);

    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.ncolor = code;
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "message-wlc") {
    let msg = args.slice(1).join(" ");
    if (!msg)
      return message.reply({
        content: `**❌ - يرجى كتابة رسالة الترحيب**`,
      });
    if (msg.length > 4000)
      return message.react(`❌`);
    if (!data) {
      data = await db.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.message = msg;
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "channel-wlc") {
    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.find((c) => c.id === args[1]);
    if (!channel)
      return message.reply({
        content: `**يرجى ارفاق منشن الشات او الايدي .**`,
      });
    if (!data) {
      data = await db1.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.welchat = channel.id;
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "toggle-wlc") {
    if (!data) {
      data = await db1.create({
        id: message.guild.id,
      });
      await data.save();
    }
    if (!args[1])
      return message.reply({ content: `**off.**` });
    if (args[1] === "on") {
      data.welcome = true;
      await data.save();
      message.reply({ content: `**✅ تم تشغيل الترحيب .**` });
    } else if (args[1] === "off") {
      data.welcome = false;
      await data.save();
      message.reply({ content: `**✅ تم إيقاف الترحيب .**` });
    }
  } else if (args[0] === prefix + "data") {
    if (!data) {
      data = await db.get({
        id: message.guild.id,
      });
    }
    message.reply({ content: `${data}` });
  } else if (args[0] === prefix + "img-wlc") {
    let link = args[1];
    if (!link || !link.startsWith("https://"))
      return message.reply({ content: `**يرجي إرفاق رابط الصورة .**` });
    if (
      !link.includes(".png") &&
      !link.includes(".jpeg") &&
      !link.includes(".jpg") &&
      !link.includes(".webp")
    )
      return message.reply({ content: `****` });
    try {
      let gg = await canvas.loadImage(link);
    } catch (err) {
      return message.reply({ content: `` });
    }
    if (!data) {
      data = await db1.create({
        id: message.guild.id,
      });
      await data.save();
    }
    data.pic = link;
    await data.save();
    message.react(`✅`);
  } else if (args[0] === prefix + "t") {
    let member = await message.guild.members.fetch(message.author.id);
    if (!data || !data.welcome) return;
    if (data.welchat == "null") return;
    let channel = member.guild.channels.cache.find(
      (c) => c.id === data.welchat
    );
    if (!channel) return;
    let background;
    try {
      background = data.pic != "null" ? await canvas.loadImage(data.pic) : null;
    } catch (err) {
      background = "null";
    }
    let avatar = await canvas.loadImage(
      member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
    );
    let can = canvas.createCanvas(120, 120);
    let ctt = can.getContext("2d");
    ctt.beginPath();
    ctt.arc(60, 60, 60, 0, Math.PI * 2, true);
    ctt.closePath();
    ctt.clip();
    ctt.drawImage(avatar, 0, 0, 120, 120);
    let buff_avatar = await can.toBuffer();
    let avatar_1 = await canvas.loadImage(buff_avatar);
    let Canvas = canvas.createCanvas(data.wsize, data.hsize);

    let ctx = Canvas.getContext("2d");
    if (background != "null") {
      try {
        ctx.drawImage(background, 0, 0, data.wsize, data.hsize);
      } catch (err) {}
    }
    ctx.drawImage(
      avatar_1,
      data.xavatar,
      data.yavatar,
      data.sxavatar,
      data.syavatar
    );
    ctx.textAlign = "center";
    ctx.fillStyle = `${data.ncolor}`;
    ctx.font = `${data.sname}px "HosamElsayed"`;
    ctx.fillText(
      member.user.username?.length > 12
        ? member.user.username.substring(0, 12) + "..."
        : member.user.username,
      data.xname,
      data.yname
    );
    let image = await Canvas.toBuffer();
    if (data.message == "null") {
      channel
        .send({
          files: [
            {
              name: "welcome.png",
              attachment: image,
            },
          ],
        })
        .catch((err) => 0);
    } else {
      let msg = data.message
        .replace("[user]", `<@${member.user.id}>`)
        .replace("[userName]", member.user.username)
        .replace("[memberCount]", member.guild.memberCount)
        .replace("[server]", member.guild.name);
      await channel
        .send({
          files: [
            {
              name: "welcome.png",
              attachment: image,
            },
          ],
        })
        .catch((err) => 0);
      channel.send({ content: msg }).catch((err) => 0);
    }
  } else if (args[0] === prefix + "restert-wec") {
    if (!data)
      return message.reply({
        content: `**❌ - لا أستطيع العثور على بيانات لهذا الخادم.**`,
      });
    await db.findOneAndDelete({
      id: message.guild.id,
    });
    message.react(`✅`);
  }
});
tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
  if (error) return;
  let data = await db1.findOne({
    id: member.guild.id,
  });
  if (!data || !data.welcome) return;
  if (data.welchat == "null") return;
  let channel = member.guild.channels.cache.find((c) => c.id === data.welchat);
  if (!channel) return;
  let background;
  try {
    background = data.pic != "null" ? await canvas.loadImage(data.pic) : null;
  } catch (err) {
    background = "null";
  }
  let avatar = await canvas.loadImage(
    member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  );
  let can = canvas.createCanvas(120, 120);
  let ctt = can.getContext("2d");
  ctt.beginPath();
  ctt.arc(60, 60, 60, 0, Math.PI * 2, true);
  ctt.closePath();
  ctt.clip();
  ctt.drawImage(avatar, 0, 0, 120, 120);
  let buff_avatar = await can.toBuffer();
  let avatar_1 = await canvas.loadImage(buff_avatar);
  let Canvas = canvas.createCanvas(data.wsize, data.hsize);

  let ctx = Canvas.getContext("2d");
  if (background != "null") {
    try {
      ctx.drawImage(background, 0, 0, data.wsize, data.hsize);
    } catch (err) {}
  }
  ctx.drawImage(
    avatar_1,
    data.xavatar,
    data.yavatar,
    data.sxavatar,
    data.syavatar
  );
  ctx.textAlign = "center";
  ctx.fillStyle = `${data.ncolor}`;
  ctx.font = `${data.sname}px "HosamElsayed"`;
  ctx.fillText(
    member.user.username?.length > 12
      ? member.user.username.substring(0, 12) + "..."
      : member.user.username,
    data.xname,
    data.yname
  );
  let image = await Canvas.toBuffer();
  if (data.message == "null") {
    channel
      .send({
        files: [
          {
            name: "welcome.png",
            attachment: image,
          },
        ],
      })
      .catch((err) => 0);
  } else {
    let msg = data.message
      .replace("[user]", `<@${member.user.id}>`)
      .replace("[userName]", member.user.username)
      .replace("[memberCount]", member.guild.memberCount)
      .replace("[server]", member.guild.name)
      .replace("[inviter]", inviter ? `<@${inviter.id}>` : "Unknown")
      .replace("[inviterName]", inviter ? inviter.username : "Unknown")
      .replace("[invites]", invite ? invite.count : "Unknown");
    await channel
      .send({
        files: [
          {
            name: "welcome.png",
            attachment: image,
          },
        ],
      })
      .catch((err) => 0);
    channel.send({ content: msg }).catch((err) => 0);
  }
});
tracker.on("error", (guild, err) => {
  return;
});
async function verifyColor(color) {
  try {
    let colorr = color.toString().split("#").join("");
    let data = await axios.get(
      "https://api.popcat.xyz/color/" + colorr.toUpperCase()
    );
    let info = data.data;
    if (info.error === "Not valid!") {
      return false;
    } else {
      if (info.name.toLowerCase().startsWith("invalid color")) {
        return false;
      } else {
        return info.rgb;
      }
    }
  } catch (err) {
    return false;
  }
}




/////////////////





client.on('guildMemberAdd', async (member) => {
  const channelId = '1167814772578865192'; // استبدل برقم هوية القناة الخاصة بك
  const channel = member.guild.channels.cache.get(channelId);

  if (channel) {
      const inviter = await getInviter(member);
      const memberCount = member.guild.memberCount;

      const welcomeEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Welcome to the Server! 🌟')
          .setDescription(`Welcome ${member.user} to ${member.guild.name}! 👋`)
          .addField('Invited by 💌', inviter ? `<@${inviter.id}>` : 'Unknown', true)
          .addField('Members Count 👥', ` ${memberCount} members`, true)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setImage('https://media.discordapp.net/attachments/1183026847647277128/1190657372381782038/line.png?ex=65abd396&is=65995e96&hm=3c029b42defe278f9fa6faa708c2982ed4a8dbe50192d99a4b519000d16726fb&=&format=webp&quality=lossless&width=960&height=25'); // قم بتعيين الرابط الخاص بالصورة

      const welcomeRow = new MessageActionRow()
          .addComponents(
              new MessageButton()
                  .setStyle('LINK')
                  .setLabel('Invite by 🎉')
                  .setURL(`https://discord.com/users/${inviter.id}`),
              new MessageButton()
                  .setStyle('LINK')
                  .setLabel('User 👤')
                  .setURL(`https://discord.com/users/${member.id}`)
          );

      channel.send({ embeds: [welcomeEmbed], components: [welcomeRow] }).catch((err) => {
          console.log(err.message);
      });
  } else {
      console.error('Channel not found.');
  }
});

async function getInviter(member) {
  const invites = await member.guild.invites.fetch();
  const inviter = invites.find(invite => invite.uses > 0 && invite.inviter);
  return inviter ? inviter.inviter : null;
}



client.on('guildMemberAdd', async (member) => {
  // إرسال رسالة الترحيب
  const welcomeChannel = member.guild.channels.cache.get('1167872761226600550');
  const welcomeMessage = await welcomeChannel.send(`مرحبًا بك ${member} في السيرفر!`);

  // إضافة مهمة مؤجلة لحذف رسالة المنشن بعد ثوانٍ معينة
  setTimeout(async () => {
      await welcomeMessage.delete();
  }, 2000);
});


client.on('guildMemberAdd', async (member) => {
  // إرسال رسالة الترحيب
  const welcomeChannel = member.guild.channels.cache.get('1191433563082604685');
  const welcomeMessage = await welcomeChannel.send(`مرحبًا بك ${member} في السيرفر!`);

  // إضافة مهمة مؤجلة لحذف رسالة المنشن بعد ثوانٍ معينة
  setTimeout(async () => {
      await welcomeMessage.delete();
  }, 2000);
});



client.on("messageCreate", async (message) => {
  // التحقق من أن الرسالة في القناة المحددة
  if (message.channel.id !== "1184149220198985758") return;

  // التحقق من وجود عبارة "has transferred" في محتوى الرسالة
  if (message.content.includes("has transferred")) {
      try {
          // إرسال الصورة في القناة
          message.channel.send({
              files: ['https://media.discordapp.net/attachments/1183026847647277128/1190657372381782038/line.png?ex=65abd396&is=65995e96&hm=3c029b42defe278f9fa6faa708c2982ed4a8dbe50192d99a4b519000d16726fb&=&format=webp&quality=lossless&width=960&height=25']
          });
      } catch (error) {
          // في حالة حدوث خطأ، قم بطباعة الخطأ في وحدة التحكم
          console.error("Error sending image:", error);
      }
  }
});


let Channels = ["1188858404521914500","1189661120634572820"] // ايديهات الرومات
let line = "https://media.discordapp.net/attachments/1184938258736619572/1188851161856483398/Line.png?ex=659c06ec&is=658991ec&hm=5d90d612de4e3afe343d091ef00a99618d8cf5fadf549e5408665dbd46b6dce1&=&format=webp&quality=lossless" // رابط الخط
let emoji = "<:Logo:1188856843578118195>" // ايموجي الذي تود إضافته

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (Channels.includes(message.channel.id)) {
    message.channel.send({ files: [line] })
      .then(sentMessage => sentMessage.react(emoji));
  }
});









client.on('message', (message) => {
  // تحديد الرسالة المستهدفة
  const targetChannelId = '1167941704125526177';
  
  if (message.channel.id === targetChannelId && !message.author.bot) {
    // إرسال رسالة الشكر في الرسائل الخاصة مع فاصل ورابط الصورة
    message.author.send(`**عميلنا العزيز: <@${message.author.id}>\nشكرًا لك على تقييمك؛\شكراً لك على ثقتك بفريق مونستر ، نرحب بك في المرات القادمة . ** https://discord.gg/h8\n\n------------------------\nhttps://media.discordapp.net/attachments/1183026847647277128/1190657372381782038/line.png?ex=65abd396&is=65995e96&hm=3c029b42defe278f9fa6faa708c2982ed4a8dbe50192d99a4b519000d16726fb&=&format=webp&quality=lossless&width=960&height=25`);
  }
});






const logChannelId = '1192818282198212689'; // قم بتغيير قيمة الآيدي إلى آيدي القناة المستخدمة للوق
const databaseFileName = 'pointss.json'; // اسم ملف قاعدة البيانات

// قراءة البيانات من ملف points.json
let userPoints = new Map();

try {
  const data = fs.readFileSync(databaseFileName, 'utf8');
  if (data) {
    userPoints = new Map(JSON.parse(data));
  }
} catch (err) {
  console.error('Error reading pointss.json', err.message);
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 're') {
    // يتحقق مما إذا كان الشخص لديه الرول المحدد
    if (message.member.roles.cache.some((role) => role.name === 'Seller')) {
      // زيادة نقاط الشخص
      const userId = message.author.id;
      userPoints.set(userId, (userPoints.get(userId) || 0) + 1);

      // حفظ البيانات في ملف points.json
      try {
        fs.writeFileSync(databaseFileName, JSON.stringify(Array.from(userPoints.entries())));
      } catch (err) {
        console.error('Error writing to pointss.json', err.message);
      }

      // إرسال رسالة في قناة اللوق
      const logChannel = client.channels.cache.get(logChannelId);
      if (logChannel) {
        logChannel.send(`The ticket was received by this person and now the customer is being dealt with : ${message.author} <:logo:1190059476670222406>`);
      }

      // القيام بالرد على الشخص بأن التذكرة تم استلامها مع منشن للشخص
      message.reply(`**The ticket was received by this person : ${message.author} <:logo:1190059476670222406>**`);
    } else {
      message.reply('لا يمكنك استلام التذكرة ليس لديك الصلاحيات اللازمة. <:logo:1190059476670222406>');
    }
  } else if (command === 'un') {
    // إلغاء الاستلام وخصم النقطة
    const userId = message.author.id;
    if (userPoints.has(userId) && userPoints.get(userId) > 0) {
      userPoints.set(userId, userPoints.get(userId) - 1);

      // حفظ البيانات في ملف points.json
      try {
        fs.writeFileSync(databaseFileName, JSON.stringify(Array.from(userPoints.entries())));
      } catch (err) {
        console.error('Error writing to pointss.json', err.message);
      }

      message.reply(`**Ticket reception canceled for this person : ${message.author} <:logo:1190059476670222406>**`);
    } else {
      message.reply('You have no points to cancel the ticket reception. <:logo:1190059476670222406>');
    }
  } else if (command === 'نقاط') {
    // عرض نقاط المستخدم المنشن أو المرسل
    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
      const mentionedUserId = mentionedMember.id;
      const points = userPoints.get(mentionedUserId) || 0;
      message.reply(`**Points of the mentioned user : ${points} <:logo:1190059476670222406>**`);
    } else {
      const userId = message.author.id;
      const points = userPoints.get(userId) || 0;
      message.reply(`**Your points : ${points} <:logo:1190059476670222406>**`);
    }
  } else if (command === 'توب') {
    // عرض أعلى الأعضاء حسب عدد النقاط
    const topUsers = Array.from(userPoints.entries())
      .sort((a, b) => b[1] - a[1]) // فرز الأعضاء بتنازلي حسب النقاط
      .slice(0, 10); // اختيار أعلى 10 فقط

    // إنشاء رسالة لعرض أعلى الأعضاء
    let leaderboardMessage = '🏆 **Top 10 Users:**\n';
    for (let i = 0; i < topUsers.length; i++) {
      const [userId, points] = topUsers[i];
      const user = await client.users.fetch(userId); // الحصول على معلومات المستخدم من Discord
      leaderboardMessage += `**${i + 1}. ${user.username}#${user.discriminator}** - Points: \`${points}\` <@${userId}>\n`;
    }

    message.reply(leaderboardMessage);
}

});

















client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const prefix = ""; // يجب أن تقوم بتعيين البريفكس بناءً على احتياجات مشروعك

  if (message.content.startsWith(prefix + "come")) {
    let user = message.mentions.users.first();

    try {
      let row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("الذهاب الى الرساله")
          .setStyle("LINK")
          .setURL(
            `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
          )
      );
      client.users
        .fetch(user.id)
        .then(async (fetchedUser) => {
          await fetchedUser.send({
            content: `**لقد تم ندائك للتوجه الى: <#${message.channel.id}>\nFrom: ${message.author}\n- ${user}**`,
            components: [row],
          });
        })
        .then(async (msg) => {
          msg.send({ content: `${linelink}` });
        });
      message.reply({ content: `ارسلت له اصبر يجيك` });
    } catch (err) {
      console.log(err);
      message.reply({ content: `مقدر ارسله بالخاص` });
    }
  }
});







/// code c Rooms 
client.on("messageCreate", async (message) => {
  const { content } = message;
  if (!content) return;
  if (message.author.bot) return;
  if (!message.channel.guild) return;
  if (
    ["1192457158437130320", "1169026720658096198"].includes(
      message.channel.parentId,
    )
  ) {
    // ايدي الكاتيقوري ف اي روم بالكاتيقوري الشخص يحاول يحول يقوله ماتقدر كمثال كاتيقوري التكت
    if (content.toLowerCase().includes("c")) {
      return message.reply({
        content: `**لايمكنك استخدام امر التحويل هنا توجه الى <#1184149220198985758> لاستخدام هذا الامر**`,
      });
      setTimeout(() => {
        message.delete();
      }, 3000);
    }
  } else if (
    [
      "1167941704125526177",
      "1167943074534662166",
      "1169012917295910982",
    ].includes(message.channel.id)
  ) {
    // ايدي الرومات لو حاول الشخص يحول هيقوله ماتقدر دي للشات الخ..
    if (content.toLowerCase().includes("c")) {
      return message.reply({
        content: `**لايمكنك استخدام امر التحويل هنا توجه الى <#1184149220198985758> لاستخدام هذا الامر**`,
      });
      setTimeout(() => {
        message.delete();
      }, 3000);
    }
  }
});















//pio















////// code tax ProBot

  client.on('messageCreate', message => {
    const channelid = ["1193545934680903681", "2"]
    if(channelid.includes(message.channel.id) && !message.author.bot){
      const args = message.content.split(" ").join( )
      const args2 = args.replace("k", "000").replace("K", "000").replace("m", "000000").replace("M", "000000").replace("b", "000000000000").replace("B", "000000000000")
      const tax  = Math.floor(args2 * (20) / (19) + (1))
      const tax2  = Math.floor(args2 * (20) / (19) +(1) - (args2))
      const tax3  = Math.floor(tax2 * (20) / (20))
      if(!args.endsWith("k") && !args.endsWith("K") && !args.endsWith("m") && !args.endsWith("M") && !args.endsWith("b") && !args.endsWith("B") && isNaN(args)) return message.delete()
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('copyButton')
            .setLabel('Copy')
            .setStyle('PRIMARY')
            .setEmoji('<:arabicdiscordicon1:1191474558121816144>')
        );
  
      message.reply({
        content: `**<:emoji_113:1191452177097556051> Number without tax: ${args2}\n<:emoji_112:1191452164044898474> Tax number: ${tax3}\n<:emoji_106:1191452030053654609> Number with tax: ${tax}**`,
        components: [row],
      });
    }
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
  
    if (interaction.customId === 'copyButton') {
      await interaction.reply({
        content: `**${interaction.message.content.split('\n')[2].split(': ')[1]}**`,
        ephemeral: true,
      });
    }
  });
  
  

  client.on("messageCreate", async (message) => {
    // التحقق من أن الرسالة في القناة المحددة
    if (message.channel.id !== "1193545934680903681") return;
  
    // التحقق من وجود عبارة "has transferred" في محتوى الرسالة
    if (message.content.includes("Number with tax:")) {
        try {
            // إرسال الصورة في القناة
            message.channel.send({
                files: ['https://media.discordapp.net/attachments/1183026847647277128/1190657372381782038/line.png?ex=65abd396&is=65995e96&hm=3c029b42defe278f9fa6faa708c2982ed4a8dbe50192d99a4b519000d16726fb&=&format=webp&quality=lossless']
            });
        } catch (error) {
            // في حالة حدوث خطأ، قم بطباعة الخطأ في وحدة التحكم
            console.error("Error sending image:", error);
        }
    }
  });
  
  





  
  
  /// Tax PayPal
  const paypalTaxPercentage = 5;

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('-ppl')) {
        const amountString = message.content.slice(5).trim();
        const amount = parseFloat(amountString);

        if (isNaN(amount)) {
            message.reply('المبلغ غير صحيح!');
            return;
        }

        const tax = (amount * paypalTaxPercentage) / 100;
        const totalAmount = amount - tax;
        const transactionFee = 0.00;

        const formatNumber = (number) => {
            return Number(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        const formatTax = (tax) => {
            return Number(tax).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 5 });
        };

        const embed = new MessageEmbed()
            .setColor('#000000')
            .setTitle('تفاصيل المعاملات باي بال 💸')
            .addFields(
                { name: 'المبلغ الأصلي', value: `$${formatNumber(amount)}`, inline: true },
                { name: 'ضريبة باي بال', value: `$${formatTax(tax)}`, inline: true },
                { name: 'المبلغ الإجمالي (بعد الضريبة)', value: `$${formatNumber(totalAmount)}`, inline: true },
                { name: 'المبلغ الذي تسلمه', value: `$${formatNumber(totalAmount)}`, inline: true },
                { name: 'رسوم التحويل', value: `$${formatNumber(transactionFee)}`, inline: true },
                { name: 'صافي المبلغ المستلم', value: `$${formatNumber(totalAmount - transactionFee)}`, inline: true }
            )
            .setTimestamp()
            .setAuthor(message.author.username, message.author.avatarURL());

        const copyAmountButton = new MessageButton()
            .setCustomId('copyAmountButton')
            .setLabel('نسخ المبلغ مع الضريبة')
            .setStyle('PRIMARY')
            .setEmoji('addemoji <:star:1181686945940766871>');

        const copyLinkButton = new MessageButton()
            .setCustomId('copyLinkButton')
            .setLabel('رابط التحويل')
            .setStyle('PRIMARY')
            .setEmoji('addemoji <:PayPal_wa:1152350469675565096>');

        const row = new MessageActionRow().addComponents(copyAmountButton, copyLinkButton);

        message.reply({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'copyAmountButton') {
        const contentToCopy = `${interaction.message.embeds[0].fields[0].name}: ${interaction.message.embeds[0].fields[0].value}\n${interaction.message.embeds[0].fields[1].name}: ${interaction.message.embeds[0].fields[1].value}`;
        interaction.user.send(contentToCopy);
        interaction.reply('تم نسخ المبلغ مع الضريبة إلى الخاص.');
    } else if (interaction.customId === 'copyLinkButton') {
        const linkToCopy = '**Soon..**';
        interaction.user.send(linkToCopy);
        interaction.reply('تم نسخ الرابط إلى الخاص.');
    }
});