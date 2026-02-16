const { Client, Collection, MessageAttachment, WebhookClient, Intents, MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageModal, Role, Modal, TextInputComponent } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const db = require(`pro.db`)
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, /* ... ال Intents الأخرى التي تحتاجها */] });

module.exports = {
    name: "setticket",
    description: "A simple ping command.",
    run: async (client, Message) => {

        const Color = db.get(`Guild_Color = ${Message.guild?.id}`) || `#000000`
        if (!Color) return;

        const Image = db.get(`Image = [${Message.guild.id}]`)
        const Channel = db.get(`Channel = [${Message.guild.id}]`)
        const Role = db.get(`Role = [${Message.guild.id}]`)
        const Cat = db.get(`Cat = [${Message.guild.id}]`)
        if (!Cat || !Role || !Channel || !Image) return Message.reply({ content: `Data` })
        if (Message.author.bot) return;
        if(!owners.includes(Message.author.id)) return Message.react('❌');
        if (!Message.guild) return; 
        const Ticket = new MessageEmbed()
        Ticket.setColor(`${Color  || `#00a6ff`}`)
  //      Ticket.setTitle(`Dream Store`)
    //    Ticket.setTimestamp()
        Ticket.setImage(`${Image }`)
        Ticket.setDescription(`
        ملاحظات مهمة قبل فتح التذكرة 

- الاسهتبال بالتذكره يؤدي الى ( سجن ) .
- الاحترام: يجب على جميع الأعضاء التعامل بالاحترام مع فريق خدمة العملاء.
- يجب تقديم المعلومات اللازمة بشكل واضح ودقيق دون تضليل أو تضخيم الوقائع.
- الصبر يجب على العملاء الانتظار بصبر حينما يكون هناك زخم كبير في فحص التذاكر.
- السرية يجب الحفاظ على سرية المعلومات الشخصية والحساسة المشاركة في التذكرة.
- للعلم التذكره مسجله كلها لعدم الف والدوران.
`)
     //   Ticket.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({}) })
        const Emb = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId(`M0`)
            .setOptions(
              { label: `استفسار `, value: `M1`, description: `هذا التذكرة مخصصة للاستفسارات ومساعدة الادارة .` , emoji : `<:logo:1190059476670222406>` },
              { label: `شراء بوتات , تصاميم , ادوات`, value: `M2`, description: `هذا التذكرة مخصصة لشراء بوتات وتصاميم وادوات المتجر .` , emoji : `<:logo:1190059476670222406>`  },
              { label: `ادارة عليا للشكوى والخ`, value: `M3` , description: `هذا التذكره مخصصة للشكوى او مساعدة الادارة العليا .`, emoji : `<:logo:1190059476670222406>` },
            )
            .setPlaceholder(`الـرجاء الضغط هنا و إختيار السبب`)
        )
        Message.channel.send({embeds: [Ticket], components: [Emb] })
    }
}