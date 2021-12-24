module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Save Data",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019#1019"],

    //Place the description of this mod here
    description: "Official Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Database",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label for="keyVal">User ID to save *</label><br>
        <input class="input-field" value="" id="userVal" name="userVal"><br>
        <a onclick="openVar('userVal')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="keyVal">Key to save in *</label><br>
        <input class="input-field" value="" id="keyVal" name="keyVal"><br>
        <a onclick="openVar('keyVal')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="value">Value</label><br>
        <input class="input-field" id="valueSave" name="value"><br>
        <a onclick="openVar('valueSave')" class="var-btn">INSERT VARIABLE</a><br><br>
        <h5 style="color: grey">If the same key exists, it'll overwrite it</h5>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        let db = require("../data/db/data.json");
        const fs = require("fs");

        let objIndex = db.findIndex(obj => obj.key === DBA.var(info.keyVal.value) && obj.userId === DBA.var(info.userVal.value));
        console.log("sus " + objIndex);

        if (objIndex > -1) {
            db[objIndex].value = DBA.var(info.value.value);
        } else {
            db.push({
                userId: DBA.var(info.userVal.value),
                key: DBA.var(info.keyVal.value),
                value: DBA.var(info.value.value),
            });
        }

        fs.writeFile("./data/db/data.json", JSON.stringify(db, null, 4), err => {
            if (err) throw err;
        });
    },
};
