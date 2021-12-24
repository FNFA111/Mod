module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Get Data",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Database",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label for="keyVal">User ID to find *</label><br>
        <input class="input-field" id="userVal2" name="userVal"><br>
        <a onclick="openVar('userVal2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="keyVal">Key to find *</label><br>
        <input class="input-field" id="keyVal2" name="keyVal"><br>
        <a onclick="openVar('keyVal2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable name *</label><br>
        <input class="input-field" id="variable" name="variable">
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        let db = require("../data/db/data.json");

        let objIndex = db.findIndex(obj => obj.key === DBA.var(info.keyVal.value) && obj.userId === DBA.var(info.userVal.value));
        console.log(objIndex);
        if (objIndex <= -1) return;
        console.log(objIndex);
        DBA.saveVariable(info.variable.value, db[objIndex].value);
    },
};
