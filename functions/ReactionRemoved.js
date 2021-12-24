module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Reaction Removed",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "messageReactionRemove",

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Events",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Function name to call after message was edited *</label><br>
        <input class="input-field" name="functionName15">
        <a onclick="openVar('functionName')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" name="reactionRemove"><br><br>

        <h5 style="color: grey">
        Variable Usage:<br>
        \${var.variablename.name}<br>
        \${var.variablename.url}<br>
        \${var.variablename.messageContent}<br>
        \${var.variablename.messageId}<br>
        You can also use \${var.guild} variables<br>
        You can also use \${var.author} variables<br>
        You can also use \${var.commandChannel} variables
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, variables, reaction, user) {
        DBA.saveVariable(`${variables.reactionRemove.value}.name`, reaction.emoji.name);
        DBA.saveVariable(`${variables.reactionRemove.value}.url`, reaction.emoji.url);
        DBA.saveVariable(`${variables.reactionRemove.value}.messageContent`, reaction.message.content);
        DBA.saveVariable(`${variables.reactionRemove.value}.messageId`, reaction.message.id);

        DBA.saveVariable("author.username", user.username);
        DBA.saveVariable("author.id", user.id);
        DBA.saveVariable("author.tag", user.tag);
        DBA.saveVariable("author.avatar", user.avatarURL({ dynamic: true }));

        DBA.saveVariable("commandChannel.id", reaction.message.channel.id);
        DBA.saveVariable("commandChannel.name", reaction.message.channel.name);
        DBA.saveVariable("commandChannel.pos", reaction.message.channel.position);
        DBA.saveVariable("commandChannel.type", reaction.message.channel.type);

        DBA.saveVariable("guild.id", reaction.message.guild.id);
        DBA.saveVariable("guild.icon", reaction.message.guild.icon);
        DBA.saveVariable("guild.name", reaction.message.guild.name);
        DBA.saveVariable("guild.members", reaction.message.guild.memberCount);

        DBA.callFunction(DBA.var(variables.functionName15.value), reaction.message);
    },
};
