module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Event Message",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEvent: true,

    //Set an event category so other mod creators can create custom mods for your event
    SetEventCategory: "messageUpdate",

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Message",

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, mods) {
        DBA.bot.on("messageUpdate", (oldMessage, newMessage) => {
            DBA.saveVariable("author.username", newMessage.author.username);
            DBA.saveVariable("author.id", newMessage.author.id);
            DBA.saveVariable("author.tag", newMessage.author.tag);
            DBA.saveVariable("author.avatar", newMessage.author.avatarURL({ dynamic: true }));

            DBA.saveVariable("commandChannel.id", newMessage.channel.id);
            DBA.saveVariable("commandChannel.name", newMessage.channel.name);
            DBA.saveVariable("commandChannel.pos", newMessage.channel.position);
            DBA.saveVariable("commandChannel.type", newMessage.channel.type);

            DBA.saveVariable("guild.id", newMessage.guild.id);
            DBA.saveVariable("guild.icon", newMessage.guild.icon);
            DBA.saveVariable("guild.name", newMessage.guild.name);
            DBA.saveVariable("guild.members", newMessage.guild.memberCount);

            DBA.saveVariable("newMessage.content", newMessage.content);
            DBA.saveVariable("newMessage.id", newMessage.id);

            DBA.saveVariable("oldMessage.content", oldMessage.content);
            DBA.saveVariable("oldMessage.id", oldMessage.id);

            for (const mod in mods) {
                const variables = DBA.modVars[mods[mod].name];
                mods[mod].execute(DBA, variables, oldMessage, newMessage);
            }
        });
    },
};
