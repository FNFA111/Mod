module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Member Boosted Server",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "boost",

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Events",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Function name to call after member has boosted the server *</label><br>
        <input class="input-field" id="functionName" name="functionName20">
        <a onclick="openVar('functionName')" class="var-btn">INSERT VARIABLE</a><br><br>
        <h5 style="color: grey">
        Member variables:<br>
        \${var.boostedMember.id}<br>
        \${var.boostedMember.username}<br>
        \${var.boostedMember.tag}<br>
        \${var.boostedMember.avatar}<br>
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, variables, member) {
        DBA.saveVariable("boostedMember.id", member.user.id);
        DBA.saveVariable("boostedMember.username", member.user.username);
        DBA.saveVariable("boostedMember.tag", member.user.tag);
        DBA.saveVariable("boostedMember.avatar", member.user.avatarURL({ dynamic: true }));

        DBA.callFunction(DBA.var(variables.functionName20.value), member);
    },
};
