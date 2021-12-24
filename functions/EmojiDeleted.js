module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Emoji Deleted",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "emojiDelete",

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
        <input class="input-field" name="functionName13">
        <a onclick="openVar('functionName')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" name="emojiDelete"><br><br>

        <h5 style="color: grey">
        Variable Usage:<br>
        \${var.variablename.id}<br>
        \${var.variablename.name}<br>
        \${var.variablename.tag}<br>
        \${var.variablename.avatar}<br>
        You can also use \${var.guild} variables
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, variables, emojiDelete) {
        DBA.saveVariable(`${variables.emojiDelete.value}.id`, emojiDelete.id);
        DBA.saveVariable(`${variables.emojiDelete.value}.name`, emojiDelete.name);
        DBA.saveVariable(`${variables.emojiDelete.value}.url`, emojiDelete.url);

        DBA.saveVariable("guild.id", emojiDelete.guild.id);
        DBA.saveVariable("guild.icon", emojiDelete.guild.icon);
        DBA.saveVariable("guild.name", emojiDelete.guild.name);
        DBA.saveVariable("guild.members", emojiDelete.guild.memberCount);

        DBA.callFunction(DBA.var(variables.functionName13.value), emojiDelete);
    },
};
