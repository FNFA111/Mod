module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Edit Data",

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
        <label for="keyVal">User ID to edit *</label><br>
        <input class="input-field" id="userVal2" name="userVal"><br>
        <a onclick="openVar('userVal2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="keyVal">Key to edit *</label><br>
        <input class="input-field" id="keyVal2" name="keyVal"><br>
        <a onclick="openVar('keyVal2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="value">Operation (Select only if you are editing a number)</label><br>
        <select class="input-field" name="opInput">
            <option value="text">text</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="X">X</option>
            <option value="/">/</option>
        </select><br><br>
        
        <label>Value *</label><br>
        <input class="input-field" id="valueToEdit" name="valueToEdit"><br>
        <a onclick="openVar('valueToEdit')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        let db = require("../data/db/data.json");
        const fs = require("fs");

        let objIndex = db.findIndex(obj => obj.key === info.keyVal.value && obj.userId === info.userVal.value);

        const val = DBA.var(info.valueToEdit.value);

        if (isNaN(val)) {
            db[objIndex].value = val;
        } else {
            switch (info.opInput.value) {
                case "+":
                    db[objIndex].value += parseInt(val);
                    break;
                case "-":
                    db[objIndex].value -= parseInt(val);
                    break;
                case "X":
                    db[objIndex].value *= parseInt(val);
                    break;
                case "/":
                    db[objIndex].value /= parseInt(val);
                    break;
                case "text":
                    db[objIndex].value = val;
            }
        }

        fs.writeFile("./data/db/data.json", JSON.stringify(db, null, 4), err => {
            if (err) throw err;
        });
    },
};
