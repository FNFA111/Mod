module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Member Kicked",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "guildMemberKick",

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Events",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Function name to call after an user has joined *</label><br>
        <input class="input-field" name="functionName10">
        <a onclick="openVar('functionName')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" name="memberKick"><br><br>

        <h5 style="color: grey">
        Variable Usage:<br>
        \${var.variablename.id}<br>
        \${var.variablename.username}<br>
        \${var.variablename.tag}<br>
        \${var.variablename.avatar}<br>
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, variables, member) {
        DBA.saveVariable(`${variables.memberKick.value}.id`, member.user.id);
        DBA.saveVariable(`${variables.memberKick.value}.username`, member.user.username);
        DBA.saveVariable(`${variables.memberKick.value}.tag`, member.user.tag);
        DBA.saveVariable(`${variables.memberKick.value}.avatar`, member.user.avatarURL({ dynamic: true }));

        DBA.saveVariable("guild.id", member.guild.id);
        DBA.saveVariable("guild.icon", member.guild.icon);
        DBA.saveVariable("guild.name", member.guild.name);
        DBA.saveVariable("guild.members", member.guild.memberCount);

        DBA.callFunction(DBA.var(variables.functionName10.value), member);
    },
};
