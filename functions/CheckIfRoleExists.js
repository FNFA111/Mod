module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Check If Role Exists",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Server Action",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Role ID or name*</label><br>
        <input class="input-field" id="checkIfRole2" name="checkIfRole"><br>
        <a onclick="openVar('checkIfRole2')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const fs = require("fs");

        const role = message.guild.roles.cache.find(
            x => x.id === DBA.var(info.checkIfRole.value) || x.name === DBA.var(info.checkIfRole.value)
        );

        if (role === undefined || role === null) {
            DBA.callFalse(DBA.function.name, DBA.function.response.name);
        }
    },
};
