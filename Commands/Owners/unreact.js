const { Message } = require("discord.js");
const dwb = require(`pro.db`);
module.exports = {
    name: "unreact",
    aliases: ["unreact"],
    description: "A simple react command.",
 

    run: async (client, message) => {




              const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command unreact = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react(`❌`)
}


      
        try {
        const args = message.content.split(" ")
        const Channel = args[1];
        
      //  if (!message.member.permissions.has("ADMINISTRATOR")) return;
        
        if (!Channel) return message.reply({ content: "**يرجى ارفاق ايدي الشات .**" });
        

const data = {
    Channel_Id: Channel
};
dwb.delete(`RoomInfo_${Channel}`, data);

        message.react('✅'); 
}catch {x => 0}
    }
}
