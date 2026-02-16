const { Util } = require('discord.js');
const Pro = require(`pro.db`);
module.exports = {
    name: 'addemoji', // هنا اسم الامر
    aliases: ["emojis","eo","emojis"],
    run: async (client, message) => {

            if (message.author.bot) return;
        


            const db = Pro.get(`Allow - Command addemoji = [ ${message.guild.id} ]`);
            const allowedRole = message.guild.roles.cache.get(db);
            const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);
        
            if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has('MANAGE_EMOJIS')) {
              return message.react(`❌`);
            }
        
        
                const emojisInContent = message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
                if (!emojisInContent) {
                    await message.reply("**يرجي إرفاق الأموجيات بعد الأمر .**");
                    return; // Exit the command handling
                }
        
                const emojisArray = [];
        
                for (const emote of emojisInContent) {
                    const emoji = Util.parseEmoji(emote);
                    if (emoji.id) {
                        const link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`;
                        try {
                            const createdEmoji = await message.guild.emojis.create(link, emoji.name);
                            emojisArray.push(createdEmoji.toString());
                        } catch (error) {
                            if (error.message.includes('No emoji slots available')) {
                                await message.reply("Emoji - 0 slots available");
                            } else {
                                console.error(error);
                                // يمكنك إضافة منطق للتعامل مع الأخطاء هنا.
                            }
                        }
                    }
                }
        
                if (emojisArray.length > 0) {
                    const replyMessage = `**[ ${emojisArray.join(', ')} ] تمت إضافة الأموجيات إلى سيرفرك**`;
                    await message.reply({ content: replyMessage, allowedMentions: { parse: [] } });
                }
            
    

    }
}
