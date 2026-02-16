module.exports = {
  name: 'ctcolors',
  run: async (client, message) => {
      const Pro = require(`pro.db`);
      const db = Pro.get(`Allow - Command ctcolors = [ ${message.guild.id} ]`);
      const allowedRole = message.guild.roles.cache.get(db);
      const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

      if (!isAuthorAllowed && message.author.id !== db && !message.member.permissions.has('ADMINISTRATOR')) {
          return message.react('❌');
      }

      const createdRoles = [];
      for (let i = 1; i <= 15; i++) {
          const roleName = `${i}`;
          const existingRole = message.guild.roles.cache.find(role => role.name === roleName);
          if (existingRole) {
              createdRoles.push(existingRole);
          } else {
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              const createdRole = await message.guild.roles.create({
                  name: roleName,
                  color: randomColor
              });
              createdRoles.push(createdRole);
          }
      }
      message.react(`✅`);
  }
}
