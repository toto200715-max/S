const Discord = require(`discord.js`);
module.exports = {
    name: `msg`,
    aliases: ["send",],
    run: async (client, interaction) => {

        
        const Pro = require(`pro.db`);
        const db = Pro.get(`Allow - Command msg = [ ${interaction.guild.id} ]`);
        const allowedRole = interaction.guild.roles.cache.get(db);
        const isAuthorAllowed = interaction.member.roles.cache.has(allowedRole?.id);

        if (!isAuthorAllowed && interaction.author.id !== db  && !interaction.member.permissions.has('ADMINISTRATOR')) {
            // إجراءات للتصرف عندما لا يتحقق الشرط
            return;
        }

        const Args = interaction.content.split(' ');
        let user = interaction.mentions.members.first() || interaction.guild.members.cache.get(Args[1]);
        if (!user) return interaction.reply(`**يرجى ارفاق منشن العضو او الايدي ومن ثم الكلام .**`);
        if (user.user.bot) return await interaction.react(`❎`);
        let Message = interaction.content.split(" ").slice(2).join(' ');
        if (!Message) return await interaction.react(`❎`);

        const invite = await interaction.channel.createInvite({ unique: true });
        const roomLink = `https://discord.gg/${invite.code}`;
        const button = new Discord.MessageButton()
            .setStyle('LINK')
            .setEmoji("<:1094418869055148042:1160670178913292390>")    
            .setURL(roomLink);
  
        await user.send({ content: `${Message}`, components: [{ type: 1, components: [button] }] });
        await interaction.react(`✅`);
    }
}
