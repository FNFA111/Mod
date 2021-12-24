const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
});

require("events").EventEmitter.defaultMaxListeners = 0;

const { join } = require("path");
const { execSync } = require("child_process");
const { syncBuiltinESMExports } = require("module");

const config = require("./data/config.json");
let commands = require("./data/commands/commands.json");
const music = require("@koenie06/discord.js-music");

// let ApiTypes;
// let djsRest;
let rest;

try {
    var ApiTypes = require("discord-api-types/v9");
    var djsRest = require("@discordjs/rest");

    rest = new djsRest.REST({ version: "9" }).setToken(config[0].token);
} catch (e) {
    (async () => {
        try {
            const command = "npm install " + "discord-api-types" + " --save";
            await execSync(command, {
                cwd: join(__dirname),
                stdio: [0, 1, 2],
            });

            console.log(`[INSTALLER] - Module Has been installed. You may have to restart your bot.`);

            const command2 = "npm install " + "@discordjs/rest" + " --save";
            await execSync(command2, {
                cwd: join(__dirname),
                stdio: [0, 1, 2],
            });

            console.log(`[INSTALLER] - Module Has been installed. You may have to restart your bot.`);

            ApiTypes = require("discord-api-types/v9");
            djsRest = require("@discordjs/rest");
            const path = "./node_modules/" + "@discordjs/rest";
            rest = new djsRest.REST({ version: "9" }).setToken(config[0].token);
            return require(path);
        } catch (error) {
            console.log(error);
            console.log(`[INSTALLER] - an error occured while installing module.`);
            return null;
        }
    })();
}
const fs = require("fs");

var variables = {};

var mods;
try {
    mods = fs.readdirSync("./mods");
} catch {
    mods = [];
}
const functions = fs.readdirSync("./functions");

let filteredCommands;
try {
    filteredCommands = commands.filter(x => x.event);
} catch {
    filteredCommands = [];
}

const categories = [
    "Message",
    "Variable",
    "Database",
    "Music",
    "User Action",
    "Bot Action",
    "Server Action",
    "Events",
    "Channel",
    "Threads",
    "Reaction",
    "Buttons",
    "Control",
    "Array",
    "API Request",
    "Mods",
];

const sleep = seconds => new Promise(r => setTimeout(r, seconds * 1000));
var SecondsSet = 0;
var asleep = false;

(async () => {
    for (let i = 0; i < filteredCommands.length; i++) {
        for (let x = 0; x < filteredCommands[i].responses.length; x++) {
            for await (const file of functions) {
                var DBA = {};

                DBA.saveVariable = async function (varName, variable) {
                    variables[varName] = {
                        var: variable,
                    };
                    return variables[varName].var;
                };

                DBA.pause = function (seconds) {
                    SecondsSet = seconds;
                    asleep = true;
                };

                DBA.var = function (varName) {
                    newVal = varName.replace(/\${(.*?)}/g, d => {
                        const match = d.slice(2, d.toString().length - 1);
                        const splitted = match.split(".");

                        if (match.includes("var.")) {
                            let vr;

                            try {
                                vr = variables[splitted[1]].var;
                            } catch {
                                try {
                                    vr = variables[splitted[1] + "." + splitted[2]].var;
                                } catch {
                                    try {
                                        vr = variables[splitted[1] + "." + splitted[2] + "." + splitted[3]].var;
                                    } catch {
                                        try {
                                            vr =
                                                variables[splitted[1] + "." + splitted[2] + "." + splitted[3] + "." + splitted[4]]
                                                    .var;
                                        } catch {
                                            try {
                                                vr =
                                                    variables[
                                                        splitted[1] +
                                                            "." +
                                                            splitted[2] +
                                                            "." +
                                                            splitted[3] +
                                                            "." +
                                                            splitted[4] +
                                                            "." +
                                                            splitted[5]
                                                    ].var;
                                            } catch {
                                                try {
                                                    vr =
                                                        variables[
                                                            splitted[1] +
                                                                "." +
                                                                splitted[2] +
                                                                "." +
                                                                splitted[3] +
                                                                "." +
                                                                splitted[4] +
                                                                "." +
                                                                splitted[5] +
                                                                "." +
                                                                splitted[6]
                                                        ].var;
                                                } catch {
                                                    vr = "undefined";
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            return vr;
                        }
                    });

                    return newVal;
                };

                DBA.callFunction = async function (functionName, message) {
                    const index = commands.findIndex(x => x.function_name === functionName);
                    // console.log(index);

                    for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                        if (commands[index].responses[index2] !== undefined) {
                            for (const modFile of functions) {
                                const mod = require("./functions/" + modFile);

                                if (mod.name === commands[index].responses[index2].type) {
                                    if (asleep) {
                                        await sleep(SecondsSet);
                                        SecondsSet = 0;
                                        asleep = false;
                                    }

                                    mod.execute(DBA, commands[index].responses[index2].variables, message);
                                }
                            }
                        }
                    }
                };

                try {
                    DBA.modVars = {};

                    DBA.bot = client;

                    DBA.functionName = filteredCommands[i].function_name;

                    let eventMods = {};
                    const mod = require("./functions/" + file);

                    if (mod.SetEventCategory !== undefined) {
                        for (const file of functions) {
                            const eventMod = require("./functions/" + file);

                            if (eventMod.name === filteredCommands[i].responses[x].type) {
                                if (eventMod.EventCategory !== undefined && mod.SetEventCategory !== undefined) {
                                    if (
                                        eventMod.EventCategory === mod.SetEventCategory &&
                                        DBA.modVars[eventMod.name] === undefined
                                    ) {
                                        for (let o = 0; o < categories.length; o++) {
                                            if (filteredCommands[i].responses[x].category === categories[o]) {
                                                if (filteredCommands[i].responses[x].type === eventMod.name) {
                                                    const thing = commands.filter(
                                                        x => x.function_name === filteredCommands[i].function_name
                                                    )[0].variables;

                                                    eventMods[eventMod.name] = eventMod;

                                                    DBA.modVars[eventMod.name] = filteredCommands[i].responses[x].variables;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (mod.SetEventCategory !== undefined) {
                            mod.execute(DBA, eventMods);
                        }
                    }
                } catch (e) {
                    // console.log(e);
                }
            }
        }
    }
})();

client.login(config[0].token);

const cooldown = new Set();
client.on("ready", async () => {
    console.log(`${client.user.tag} is online`);

    DBA = {};

    await client.guilds.cache.forEach(async guild => {
        guild.channels.cache.forEach(async channel => {
            if (channel.type === "GUILD_TEXT") {
                await channel.messages.fetch().catch(err => {});
            }
        });
    });
    console.log("Fetched all messages from all guilds");
    // const myCommand = await client.application.commands.fetch().then(myCommands => myCommands.find(x => x.name === "help"));

    // guild.commands.delete(myCommand.id);

    (async () => {
        try {
            console.log("Started refreshing application (/) commands.");

            client.guilds.cache.forEach(async guild => {
                setTimeout(async () => {
                    let slashCommands = [];

                    const cmds = commands.filter(x => x.command && x.function_type === "slash");

                    for (let i = 0; i < cmds.length; i++) {
                        const cmd = {
                            name: cmds[i].command,
                            description: `This will execute the command ${cmds[i].command.toUpperCase()}`,
                        };
                        slashCommands.push(cmd);
                    }

                    await rest
                        .put(ApiTypes.Routes.applicationGuildCommands(client.user.id, guild.id), { body: slashCommands })
                        .catch(err => {});
                }, 2000);
            });

            let slashCommands = [];

            const cmds = commands.filter(x => x.command && x.function_type === "slash");

            for (let i = 0; i < cmds.length; i++) {
                const cmd = {
                    name: cmds[i].command,
                    description: `This will execute the command ${cmds[i].command.toUpperCase()}`,
                };
                slashCommands.push(cmd);
            }

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.log(error);
        }
    })();

    DBA.requireModule = async function (name) {
        try {
            const path = "./node_modules/" + name;
            return require(path);
        } catch (e) {
            console.log(`[INSTALLER] - Installing ${name}`);

            try {
                const command = "npm install " + name + " --save";
                await execSync(command, {
                    cwd: join(__dirname),
                    stdio: [0, 1, 2],
                });

                console.log(`[INSTALLER] - ${name} Has been installed. You may have to restart your bot.`);

                const path = "./node_modules/" + name;
                return require(path);
            } catch (error) {
                console.log(error);
                console.log(`[INSTALLER] - an error occured while installing ${name}.`);
                return null;
            }
        }
    };

    DBA.saveVariable = async function (varName, variable) {
        variables[varName] = {
            var: variable,
        };
    };

    DBA.bot = client;

    for (const file of functions) {
        const mod = require("./functions/" + file);
        mod.startup(DBA);
    }
});

var stopped = false;

client.on("messageCreate", async message => {
    let filteredCommands;
    try {
        filteredCommands = commands.filter(x => x.command && x.function_type === "group");
    } catch {
        filteredCommands = [];
    }

    outerLoop: for (let i = 0; i < filteredCommands.length; i++) {
        if (message.content.toLowerCase().startsWith(config[0].prefix + filteredCommands[i].command.toLowerCase())) {
            stopped = false;
            if (cooldown.has(message.author.id)) {
                message.reply(`You are on cooldown!`);
                break outerLoop;
            }
            var args = message.content.split(" ").slice(1);
            for (let x = 0; x < filteredCommands[i].responses.length; x++) {
                for (let o = 0; o < categories.length; o++) {
                    if (filteredCommands[i].responses[x].category === categories[o]) {
                        try {
                            for await (const file of mods) {
                                var DBA = {};

                                DBA.saveVariable = async function (varName, variable) {
                                    variables[varName] = {
                                        var: variable,
                                    };

                                    return variables[varName].var;
                                };

                                DBA.stop = function () {
                                    stopped = true;
                                };

                                DBA.pause = function (seconds) {
                                    SecondsSet = seconds;
                                    asleep = true;
                                };

                                DBA.cooldown = function (seconds, userId, expireMessage) {
                                    cooldown.add(userId);

                                    setTimeout(() => {
                                        cooldown.delete(userId);
                                        message.reply(expireMessage);
                                    }, parseInt(seconds) * 1000);
                                };

                                DBA.var = function (varName) {
                                    newVal = varName.replace(/\${(.*?)}/g, d => {
                                        const match = d.slice(2, d.toString().length - 1);
                                        const splitted = match.split(".");

                                        if (match.includes("var.")) {
                                            let vr;

                                            try {
                                                vr = variables[splitted[1]].var;
                                            } catch {
                                                try {
                                                    vr = variables[splitted[1] + "." + splitted[2]].var;
                                                } catch {
                                                    try {
                                                        vr = variables[splitted[1] + "." + splitted[2] + "." + splitted[3]].var;
                                                    } catch {
                                                        try {
                                                            vr =
                                                                variables[
                                                                    splitted[1] +
                                                                        "." +
                                                                        splitted[2] +
                                                                        "." +
                                                                        splitted[3] +
                                                                        "." +
                                                                        splitted[4]
                                                                ].var;
                                                        } catch {
                                                            try {
                                                                vr =
                                                                    variables[
                                                                        splitted[1] +
                                                                            "." +
                                                                            splitted[2] +
                                                                            "." +
                                                                            splitted[3] +
                                                                            "." +
                                                                            splitted[4] +
                                                                            "." +
                                                                            splitted[5]
                                                                    ].var;
                                                            } catch {
                                                                try {
                                                                    vr =
                                                                        variables[
                                                                            splitted[1] +
                                                                                "." +
                                                                                splitted[2] +
                                                                                "." +
                                                                                splitted[3] +
                                                                                "." +
                                                                                splitted[4] +
                                                                                "." +
                                                                                splitted[5] +
                                                                                "." +
                                                                                splitted[6]
                                                                        ].var;
                                                                } catch {
                                                                    vr = "undefined";
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            return vr;
                                        }
                                    });

                                    return newVal;
                                };

                                DBA.saveVariable("author.username", message.author.username);
                                DBA.saveVariable("author.id", message.author.id);
                                DBA.saveVariable("author.tag", message.author.tag);
                                DBA.saveVariable("author.avatar", message.author.avatarURL({ dynamic: true }));

                                DBA.saveVariable("commandChannel.id", message.channel.id);
                                DBA.saveVariable("commandChannel.name", message.channel.name);
                                DBA.saveVariable("commandChannel.pos", message.channel.position);
                                DBA.saveVariable("commandChannel.type", message.channel.type);

                                DBA.saveVariable("guild.id", message.guild.id);
                                DBA.saveVariable("guild.icon", message.guild.icon);
                                DBA.saveVariable("guild.name", message.guild.name);
                                DBA.saveVariable("guild.members", message.guild.memberCount);

                                DBA.saveVariable("commandMessage.content", message.content);
                                DBA.saveVariable("commandMessage.id", message.id);

                                DBA.bot = client;

                                DBA.function = {
                                    name: filteredCommands[i].function_name,
                                    response: {
                                        name: filteredCommands[i].responses[x].name,
                                        category: filteredCommands[i].responses[x].category,
                                        type: filteredCommands[i].responses[x].type,
                                    },
                                };

                                DBA.callFalse = async function (functionName, responseName) {
                                    // console.log(functionName);
                                    // console.log(responseName);
                                    const index = commands.findIndex(
                                        x => x.nameCheck === functionName && x.responseCheck === responseName
                                    );

                                    if (typeof commands[index].function_type !== "undefined") {
                                        if (commands[index].function_type === "boolean") {
                                            if (index > -1) {
                                                for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                                    // console.log(commands[index].responses[index2]);
                                                    if (commands[index].responses[index2] !== undefined) {
                                                        for (const modFile of mods) {
                                                            const mod = require("./mods/" + modFile);

                                                            if (!mod.isEventMod) {
                                                                if (
                                                                    typeof commands[index].responses[index2].type !== "undefined"
                                                                ) {
                                                                    if (mod.name === commands[index].responses[index2].type) {
                                                                        if (asleep) {
                                                                            await sleep(SecondsSet);
                                                                            SecondsSet = 0;
                                                                            asleep = false;
                                                                        }

                                                                        mod.execute(
                                                                            DBA,
                                                                            commands[index].responses[index2].variables,
                                                                            message,
                                                                            args
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                stopped = true;
                                            }
                                        }
                                    }
                                };

                                const mod = require("./mods/" + file);

                                if (stopped) {
                                    break outerLoop;
                                }

                                if (!mod.isEventMod) {
                                    if (mod.name === filteredCommands[i].responses[x].type) {
                                        if (asleep) {
                                            await sleep(SecondsSet);
                                            SecondsSet = 0;
                                            asleep = false;
                                        }

                                        mod.execute(DBA, filteredCommands[i].responses[x].variables, message, args);
                                    }
                                }
                            }
                        } catch (e) {}

                        for await (const file of functions) {
                            var DBA = {};

                            DBA.saveVariable = async function (varName, variable) {
                                variables[varName] = {
                                    var: variable,
                                };
                                return variables[varName].var;
                            };

                            DBA.stop = function () {
                                stopped = true;
                            };

                            DBA.pause = function (seconds) {
                                SecondsSet = seconds;
                                asleep = true;
                                console.log("SET");
                            };

                            DBA.cooldown = function (seconds, userId, expireMessage) {
                                cooldown.add(userId);

                                var timeout = setTimeout(() => {
                                    cooldown.delete(userId);
                                    message.reply(expireMessage);
                                    clearTimeout(timeout);
                                }, parseInt(seconds) * 1000);
                            };

                            DBA.var = function (varName) {
                                newVal = varName.replace(/\${(.*?)}/g, d => {
                                    const match = d.slice(2, d.toString().length - 1);
                                    const splitted = match.split(".");

                                    if (match.includes("var.")) {
                                        let vr;

                                        try {
                                            vr = variables[splitted[1]].var;
                                        } catch {
                                            try {
                                                vr = variables[splitted[1] + "." + splitted[2]].var;
                                            } catch {
                                                try {
                                                    vr = variables[splitted[1] + "." + splitted[2] + "." + splitted[3]].var;
                                                } catch {
                                                    try {
                                                        vr =
                                                            variables[
                                                                splitted[1] +
                                                                    "." +
                                                                    splitted[2] +
                                                                    "." +
                                                                    splitted[3] +
                                                                    "." +
                                                                    splitted[4]
                                                            ].var;
                                                    } catch {
                                                        try {
                                                            vr =
                                                                variables[
                                                                    splitted[1] +
                                                                        "." +
                                                                        splitted[2] +
                                                                        "." +
                                                                        splitted[3] +
                                                                        "." +
                                                                        splitted[4] +
                                                                        "." +
                                                                        splitted[5]
                                                                ].var;
                                                        } catch {
                                                            try {
                                                                vr =
                                                                    variables[
                                                                        splitted[1] +
                                                                            "." +
                                                                            splitted[2] +
                                                                            "." +
                                                                            splitted[3] +
                                                                            "." +
                                                                            splitted[4] +
                                                                            "." +
                                                                            splitted[5] +
                                                                            "." +
                                                                            splitted[6]
                                                                    ].var;
                                                            } catch {
                                                                vr = "undefined";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        return vr;
                                    }
                                });

                                return newVal;
                            };

                            DBA.saveVariable("author.username", message.author.username);
                            DBA.saveVariable("author.id", message.author.id);
                            DBA.saveVariable("author.tag", message.author.tag);
                            DBA.saveVariable("author.avatar", message.author.avatarURL({ dynamic: true }));

                            DBA.saveVariable("commandChannel.id", message.channel.id);
                            DBA.saveVariable("commandChannel.name", message.channel.name);
                            DBA.saveVariable("commandChannel.pos", message.channel.position);
                            DBA.saveVariable("commandChannel.type", message.channel.type);

                            DBA.saveVariable("guild.id", message.guild.id);
                            DBA.saveVariable("guild.icon", message.guild.icon);
                            DBA.saveVariable("guild.name", message.guild.name);
                            DBA.saveVariable("guild.members", message.guild.memberCount);

                            DBA.saveVariable("commandMessage.content", message.content);
                            DBA.saveVariable("commandMessage.id", message.id);

                            DBA.bot = client;

                            DBA.function = {
                                name: filteredCommands[i].function_name,
                                response: {
                                    name: filteredCommands[i].responses[x].name,
                                    category: filteredCommands[i].responses[x].category,
                                    type: filteredCommands[i].responses[x].type,
                                },
                            };

                            DBA.callFalse = async function (functionName, responseName) {
                                const index = commands.findIndex(
                                    x => x.nameCheck === functionName && x.responseCheck === responseName
                                );

                                if (typeof commands[index].function_type !== "undefined") {
                                    if (commands[index].function_type === "boolean") {
                                        if (index > -1) {
                                            for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                                if (commands[index].responses[index2] !== undefined) {
                                                    for (const modFile of functions) {
                                                        const mod = require("./functions/" + modFile);

                                                        if (!mod.isEventMod) {
                                                            if (typeof commands[index].responses[index2].type !== "undefined") {
                                                                if (mod.name === commands[index].responses[index2].type) {
                                                                    mod.execute(
                                                                        DBA,
                                                                        commands[index].responses[index2].variables,
                                                                        message,
                                                                        args
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            stopped = true;
                                        }
                                    }
                                }
                            };

                            DBA.callButton = async function (functionName, responseName) {
                                const index = commands.findIndex(
                                    x => x.nameCheck === functionName && x.responseCheck === responseName
                                );

                                if (typeof commands[index].function_type !== "undefined") {
                                    if (commands[index].function_type === "button") {
                                        if (index > -1) {
                                            for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                                if (commands[index].responses[index2] !== undefined) {
                                                    for (const modFile of functions) {
                                                        const mod = require("./functions/" + modFile);

                                                        if (!mod.isEventMod) {
                                                            if (typeof commands[index].responses[index2].type !== "undefined") {
                                                                if (mod.name === commands[index].responses[index2].type) {
                                                                    mod.execute(
                                                                        DBA,
                                                                        commands[index].responses[index2].variables,
                                                                        message,
                                                                        args
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            };

                            DBA.callFunction = async function (functionName) {
                                const index = commands.findIndex(x => x.function_name === functionName);

                                for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                    if (commands[index].responses[index2] !== undefined) {
                                        for (const modFile of functions) {
                                            const mod = require("./functions/" + modFile);

                                            if (!mod.isEventMod) {
                                                if (typeof commands[index].responses[index2].type !== "undefined") {
                                                    if (mod.name === commands[index].responses[index2].type) {
                                                        mod.execute(
                                                            DBA,
                                                            commands[index].responses[index2].variables,
                                                            message,
                                                            args
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            };

                            const mod = require("./functions/" + file);

                            if (stopped) {
                                break outerLoop;
                            }

                            if (!mod.isEventMod) {
                                if (mod.name === filteredCommands[i].responses[x].type) {
                                    if (asleep) {
                                        await sleep(SecondsSet);
                                        SecondsSet = 0;
                                        asleep = false;
                                    }

                                    mod.execute(DBA, filteredCommands[i].responses[x].variables, message, args);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    let filteredCommands;
    try {
        filteredCommands = commands.filter(x => x.command);
    } catch {
        filteredCommands = [];
    }

    outerLoop: for (let i = 0; i < filteredCommands.length; i++) {
        if (interaction.commandName.toLowerCase().startsWith(filteredCommands[i].command.toLowerCase())) {
            stopped = false;
            if (cooldown.has(interaction.user.id)) {
                message.reply(`You are on cooldown!`);
                break outerLoop;
            }

            for (let x = 0; x < filteredCommands[i].responses.length; x++) {
                for (let o = 0; o < categories.length; o++) {
                    if (filteredCommands[i].responses[x].category === categories[o]) {
                        try {
                            for await (const file of mods) {
                                var DBA = {};

                                DBA.saveVariable = async function (varName, variable) {
                                    variables[varName] = {
                                        var: variable,
                                    };

                                    return variables[varName].var;
                                };

                                DBA.stop = function () {
                                    stopped = true;
                                };

                                DBA.pause = function (seconds) {
                                    SecondsSet = seconds;
                                    asleep = true;
                                };

                                DBA.cooldown = function (seconds, userId, expireMessage) {
                                    cooldown.add(userId);

                                    setTimeout(() => {
                                        cooldown.delete(userId);
                                        message.reply(expireMessage);
                                    }, parseInt(seconds) * 1000);
                                };

                                DBA.var = function (varName) {
                                    newVal = varName.replace(/\${(.*?)}/g, d => {
                                        const match = d.slice(2, d.toString().length - 1);
                                        const splitted = match.split(".");

                                        if (match.includes("var.")) {
                                            let vr;

                                            try {
                                                vr = variables[splitted[1]].var;
                                            } catch {
                                                try {
                                                    vr = variables[splitted[1] + "." + splitted[2]].var;
                                                } catch {
                                                    try {
                                                        vr = variables[splitted[1] + "." + splitted[2] + "." + splitted[3]].var;
                                                    } catch {
                                                        try {
                                                            vr =
                                                                variables[
                                                                    splitted[1] +
                                                                        "." +
                                                                        splitted[2] +
                                                                        "." +
                                                                        splitted[3] +
                                                                        "." +
                                                                        splitted[4]
                                                                ].var;
                                                        } catch {
                                                            try {
                                                                vr =
                                                                    variables[
                                                                        splitted[1] +
                                                                            "." +
                                                                            splitted[2] +
                                                                            "." +
                                                                            splitted[3] +
                                                                            "." +
                                                                            splitted[4] +
                                                                            "." +
                                                                            splitted[5]
                                                                    ].var;
                                                            } catch {
                                                                try {
                                                                    vr =
                                                                        variables[
                                                                            splitted[1] +
                                                                                "." +
                                                                                splitted[2] +
                                                                                "." +
                                                                                splitted[3] +
                                                                                "." +
                                                                                splitted[4] +
                                                                                "." +
                                                                                splitted[5] +
                                                                                "." +
                                                                                splitted[6]
                                                                        ].var;
                                                                } catch {
                                                                    vr = "undefined";
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            return vr;
                                        }
                                    });

                                    return newVal;
                                };

                                DBA.saveVariable("author.username", interaction.user.username);
                                DBA.saveVariable("author.id", interaction.user.id);
                                DBA.saveVariable("author.tag", interaction.user.tag);
                                DBA.saveVariable("author.avatar", interaction.user.avatarURL({ dynamic: true }));

                                DBA.saveVariable("commandChannel.id", interaction.channel.id);
                                DBA.saveVariable("commandChannel.name", interaction.channel.name);
                                DBA.saveVariable("commandChannel.pos", interaction.channel.position);
                                DBA.saveVariable("commandChannel.type", interaction.channel.type);

                                DBA.saveVariable("guild.id", interaction.guild.id);
                                DBA.saveVariable("guild.icon", interaction.guild.icon);
                                DBA.saveVariable("guild.name", interaction.guild.name);
                                DBA.saveVariable("guild.members", interaction.guild.memberCount);

                                DBA.bot = client;

                                DBA.function = {
                                    name: filteredCommands[i].function_name,
                                    response: {
                                        name: filteredCommands[i].responses[x].name,
                                        category: filteredCommands[i].responses[x].category,
                                        type: filteredCommands[i].responses[x].type,
                                    },
                                };

                                DBA.callFalse = async function (functionName, responseName) {
                                    // console.log(functionName);
                                    // console.log(responseName);
                                    const index = commands.findIndex(
                                        x => x.nameCheck === functionName && x.responseCheck === responseName
                                    );

                                    if (typeof commands[index].function_type !== "undefined") {
                                        if (commands[index].function_type === "boolean") {
                                            if (index > -1) {
                                                for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                                    // console.log(commands[index].responses[index2]);
                                                    if (commands[index].responses[index2] !== undefined) {
                                                        for (const modFile of mods) {
                                                            const mod = require("./mods/" + modFile);

                                                            if (!mod.isEventMod) {
                                                                if (
                                                                    typeof commands[index].responses[index2].type !== "undefined"
                                                                ) {
                                                                    if (mod.name === commands[index].responses[index2].type) {
                                                                        if (asleep) {
                                                                            await sleep(SecondsSet);
                                                                            SecondsSet = 0;
                                                                            asleep = false;
                                                                        }

                                                                        mod.execute(
                                                                            DBA,
                                                                            commands[index].responses[index2].variables,
                                                                            interaction,
                                                                            interaction
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                stopped = true;
                                            }
                                        }
                                    }
                                };

                                const mod = require("./mods/" + file);

                                if (stopped) {
                                    break outerLoop;
                                }

                                if (!mod.isEventMod) {
                                    if (mod.name === filteredCommands[i].responses[x].type) {
                                        if (asleep) {
                                            await sleep(SecondsSet);
                                            SecondsSet = 0;
                                            asleep = false;
                                        }

                                        mod.execute(DBA, filteredCommands[i].responses[x].variables, interaction, interaction);
                                    }
                                }
                            }
                        } catch (e) {}

                        for await (const file of functions) {
                            var DBA = {};

                            DBA.saveVariable = async function (varName, variable) {
                                variables[varName] = {
                                    var: variable,
                                };

                                return variables[varName].var;
                            };

                            DBA.stop = function () {
                                stopped = true;
                            };

                            DBA.pause = function (seconds) {
                                SecondsSet = seconds;
                                asleep = true;
                            };

                            DBA.cooldown = function (seconds, userId, expireMessage) {
                                cooldown.add(userId);

                                setTimeout(() => {
                                    cooldown.delete(userId);
                                    message.reply(expireMessage);
                                }, parseInt(seconds) * 1000);
                            };

                            DBA.var = function (varName) {
                                newVal = varName.replace(/\${(.*?)}/g, d => {
                                    const match = d.slice(2, d.toString().length - 1);
                                    const splitted = match.split(".");

                                    if (match.includes("var.")) {
                                        let vr;

                                        try {
                                            vr = variables[splitted[1]].var;
                                        } catch {
                                            try {
                                                vr = variables[splitted[1] + "." + splitted[2]].var;
                                            } catch {
                                                try {
                                                    vr = variables[splitted[1] + "." + splitted[2] + "." + splitted[3]].var;
                                                } catch {
                                                    try {
                                                        vr =
                                                            variables[
                                                                splitted[1] +
                                                                    "." +
                                                                    splitted[2] +
                                                                    "." +
                                                                    splitted[3] +
                                                                    "." +
                                                                    splitted[4]
                                                            ].var;
                                                    } catch {
                                                        try {
                                                            vr =
                                                                variables[
                                                                    splitted[1] +
                                                                        "." +
                                                                        splitted[2] +
                                                                        "." +
                                                                        splitted[3] +
                                                                        "." +
                                                                        splitted[4] +
                                                                        "." +
                                                                        splitted[5]
                                                                ].var;
                                                        } catch {
                                                            try {
                                                                vr =
                                                                    variables[
                                                                        splitted[1] +
                                                                            "." +
                                                                            splitted[2] +
                                                                            "." +
                                                                            splitted[3] +
                                                                            "." +
                                                                            splitted[4] +
                                                                            "." +
                                                                            splitted[5] +
                                                                            "." +
                                                                            splitted[6]
                                                                    ].var;
                                                            } catch {
                                                                vr = "undefined";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        return vr;
                                    }
                                });

                                return newVal;
                            };

                            DBA.saveVariable("author.username", interaction.user.username);
                            DBA.saveVariable("author.id", interaction.user.id);
                            DBA.saveVariable("author.tag", interaction.user.tag);
                            DBA.saveVariable("author.avatar", interaction.user.avatarURL({ dynamic: true }));

                            DBA.saveVariable("commandChannel.id", interaction.channel.id);
                            DBA.saveVariable("commandChannel.name", interaction.channel.name);
                            DBA.saveVariable("commandChannel.pos", interaction.channel.position);
                            DBA.saveVariable("commandChannel.type", interaction.channel.type);

                            DBA.saveVariable("guild.id", interaction.guild.id);
                            DBA.saveVariable("guild.icon", interaction.guild.icon);
                            DBA.saveVariable("guild.name", interaction.guild.name);
                            DBA.saveVariable("guild.members", interaction.guild.memberCount);

                            DBA.bot = client;

                            DBA.function = {
                                name: filteredCommands[i].function_name,
                                response: {
                                    name: filteredCommands[i].responses[x].name,
                                    category: filteredCommands[i].responses[x].category,
                                    type: filteredCommands[i].responses[x].type,
                                },
                            };

                            DBA.callFalse = async function (functionName, responseName) {
                                // console.log(functionName);
                                // console.log(responseName);
                                const index = commands.findIndex(
                                    x => x.nameCheck === functionName && x.responseCheck === responseName
                                );

                                if (typeof commands[index].function_type !== "undefined") {
                                    if (commands[index].function_type === "boolean") {
                                        if (index > -1) {
                                            for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                                // console.log(commands[index].responses[index2]);
                                                if (commands[index].responses[index2] !== undefined) {
                                                    for (const modFile of mods) {
                                                        const mod = require("./mods/" + modFile);

                                                        if (!mod.isEventMod) {
                                                            if (typeof commands[index].responses[index2].type !== "undefined") {
                                                                if (mod.name === commands[index].responses[index2].type) {
                                                                    if (asleep) {
                                                                        await sleep(SecondsSet);
                                                                        SecondsSet = 0;
                                                                        asleep = false;
                                                                    }

                                                                    mod.execute(
                                                                        DBA,
                                                                        commands[index].responses[index2].variables,
                                                                        interaction,
                                                                        interaction
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            stopped = true;
                                        }
                                    }
                                }
                            };

                            DBA.callButton = async function (functionName, responseName) {
                                const index = commands.findIndex(
                                    x => x.nameCheck === functionName && x.responseCheck === responseName
                                );

                                if (typeof commands[index].function_type !== "undefined") {
                                    if (commands[index].function_type === "button") {
                                        if (index > -1) {
                                            for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                                if (commands[index].responses[index2] !== undefined) {
                                                    for (const modFile of functions) {
                                                        const mod = require("./functions/" + modFile);

                                                        if (!mod.isEventMod) {
                                                            if (typeof commands[index].responses[index2].type !== "undefined") {
                                                                if (mod.name === commands[index].responses[index2].type) {
                                                                    mod.execute(
                                                                        DBA,
                                                                        commands[index].responses[index2].variables,
                                                                        interaction,
                                                                        interaction
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            };

                            DBA.callFunction = async function (functionName) {
                                const index = commands.findIndex(x => x.function_name === functionName);

                                for (let index2 = 0; index2 < commands[index].responses.length; index2++) {
                                    if (commands[index].responses[index2] !== undefined) {
                                        for (const modFile of functions) {
                                            const mod = require("./functions/" + modFile);

                                            if (!mod.isEventMod) {
                                                if (typeof commands[index].responses[index2].type !== "undefined") {
                                                    if (mod.name === commands[index].responses[index2].type) {
                                                        mod.execute(
                                                            DBA,
                                                            commands[index].responses[index2].variables,
                                                            interaction,
                                                            interaction
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            };

                            const mod = require("./functions/" + file);

                            if (stopped) {
                                break outerLoop;
                            }

                            if (!mod.isEventMod) {
                                if (mod.name === filteredCommands[i].responses[x].type) {
                                    if (asleep) {
                                        await sleep(SecondsSet);
                                        SecondsSet = 0;
                                        asleep = false;
                                    }

                                    mod.execute(DBA, filteredCommands[i].responses[x].variables, interaction, interaction);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
