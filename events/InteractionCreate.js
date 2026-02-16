const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);
 if(!cmd)       return interaction.reply({
        content: `> **An Error Occured**`,
         ephemeral: true})

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);

    }
    if (interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});

var _0x10abd7=_0x3bca;function _0x3bca(_0x38ab20,_0x39271a){var _0x104f1c=_0x104f();return _0x3bca=function(_0x3bca32,_0x33509c){_0x3bca32=_0x3bca32-0x1d0;var _0x35b0a3=_0x104f1c[_0x3bca32];return _0x35b0a3;},_0x3bca(_0x38ab20,_0x39271a);}function _0x104f(){var _0x3da2e3=['1571412wfrDeK','https://www.twitch.tv/MonsterTeamOnTop','4816056evpfiW','250233uhkaZb','setPresence','11010804eoNvHK','3102405laKkci','setMaxListeners','ready','MonsterTeam','1369142ugeHcO','user','Developer\x20:\x20MonsterTeam \x0aStore\x20:\x20discord.gg/MonsterTeam ','1527140LpFpqX','dnd'];_0x104f=function(){return _0x3da2e3;};return _0x104f();}(function(_0x19a57a,_0x1b840f){var _0x212586=_0x3bca,_0x13f242=_0x19a57a();while(!![]){try{var _0xc44df2=parseInt(_0x212586(0x1d4))/0x1+parseInt(_0x212586(0x1db))/0x2+parseInt(_0x212586(0x1d1))/0x3+parseInt(_0x212586(0x1de))/0x4+-parseInt(_0x212586(0x1d7))/0x5+parseInt(_0x212586(0x1d3))/0x6+-parseInt(_0x212586(0x1d6))/0x7;if(_0xc44df2===_0x1b840f)break;else _0x13f242['push'](_0x13f242['shift']());}catch(_0x371ac2){_0x13f242['push'](_0x13f242['shift']());}}}(_0x104f,0x6dc50),client['once'](_0x10abd7(0x1d9),()=>{var _0x5efa31=_0x10abd7;console['log'](_0x5efa31(0x1dd));}),client[_0x10abd7(0x1d8)](0xf423f),client['on'](_0x10abd7(0x1d9),()=>{var _0x4bf0a9=_0x10abd7;client[_0x4bf0a9(0x1dc)][_0x4bf0a9(0x1d5)]({'status':_0x4bf0a9(0x1d0),'activities':[{'name':_0x4bf0a9(0x1da),'type':'STREAMING','url':_0x4bf0a9(0x1d2)}]});}));
