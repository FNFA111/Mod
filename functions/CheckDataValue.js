module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Check Data Value",

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
        <label for="keyVal">User ID *</label><br>
        <input class="input-field" id="userVal2" name="userVal"><br>
        <a onclick="openVar('userVal2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="keyVal">Key *</label><br>
        <input class="input-field" id="keyVal2" name="keyVal"><br>
        <a onclick="openVar('keyVal2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="value">Operation</label><br>
        <select class="input-field" name="opInput">
            <option value="=">Is same as</option>
            <option value=">">Is higher than</option>
            <option value="<">Is lower than</option>
            <option value=">=">Is higher or same as</option>
            <option value="<=">Is lower or same as</option>
        </select><br><br>
        
        <label>Value to check *</label><br>
        <input class="input-field" id="value" name="value"><br>
        <a onclick="openVar('value')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        let db = require("../data/db/data.json");
        const fs = require("fs");

        let objIndex = db.findIndex(obj => obj.key === DBA.var(info.keyVal.value) && obj.userId === DBA.var(info.userVal.value));

        const val = DBA.var(info.value.value);

        switch (info.opInput.value) {
            case "=":
                console.log(val);
                if (db[objIndex].value !== val) {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case ">":
                console.log(val);
                if (db[objIndex].value > val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case "<":
                console.log(val);
                if (db[objIndex].value < val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case ">=":
                console.log(val);
                if (db[objIndex].value >= val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case "<=":
                console.log(val);
                if (db[objIndex].value <= val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
        }
    },
};
