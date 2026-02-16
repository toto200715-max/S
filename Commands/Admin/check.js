module.exports = {
    name: 'check', // هنا اسم الامر
    run : (client, message,) => {

              const Pro = require(`pro.db`)
        const db = Pro.get(`Allow - Command check = [ ${message.guild.id} ]`)
const allowedRole = message.guild.roles.cache.get(db);
const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

if (!isAuthorAllowed && message.author.id !== db  && !message.member.permissions.has('ADMINISTRATOR')) {
    // إجراءات للتصرف عندما لا يتحقق الشرط
    return message.react('❌');
}
      
  let c = message.content.split(" ");
  const args = message.content.split(' ');
  const roleId = args[1];
  const role = message.guild.roles.cache.find(e => e.id === roleId || e.name === roleId || `<@&${e.id}>` === roleId)
  if (!role) {
    return message.reply({ content : `**يرجى ارفاق منشن الرول او الايدي .**`});
  }
  const roleMemberCount = role.members.size;
  const members = Array.from(role.members.values());
  const memberList = members.map((member, index) => {
    return `\`${index + 1}\` - <@${member.user.id}>`;
  }).join("\n");
  message.reply({ content: `**الرول يحتوي على : \`${roleMemberCount}\`\n${memberList}**` }); 
}

   }   




