module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Check If User Has Role",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "User Action",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>User ID*</label><br>
        <input class="input-field" id="userID2" name="userID"><br>
        <a onclick="openVar('userID2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Role id or name*</label><br>
        <input class="input-field" id="role2" name="role"><br>
        <a onclick="openVar('role2')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const fs = require("fs");

        const userID = DBA.var(info.userID.value);
        const member = message.guild.members.cache.find(x => x.id === userID);

        if (!member.roles.find(x => x.name === DBA.var(info.role.value) || x.id === DBA.var(info.role.value))) {
            DBA.callFalse(DBA.function.name, DBA.function.response.name);
        }
    },
};
