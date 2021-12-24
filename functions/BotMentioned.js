module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Bot Mentioned",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "botMention",

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Events",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Function name to call *</label><br>
        <input class="input-field" id="functionName22" name="functionName22">
        <a onclick="openVar('functionName22')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, info, message) {
        DBA.callFunction(DBA.var(info.functionName22.value), message);
    },
};
