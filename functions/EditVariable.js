module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Edit Variable Value",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Variable",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label for="keyVal">Variable (without \${} and without var.) *</label><br>
        <input class="input-field" id="variable2" name="variable"><br>
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

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const fs = require("fs");

        const val = DBA.var(info.valueToEdit.value);
        const varName = DBA.var(info.variable.value);
        const varValue = DBA.var("${var." + varName + "}");

        if (isNaN(val)) {
            DBA.saveVariable(varName, val);
        } else {
            switch (info.opInput.value) {
                case "+":
                    DBA.saveVariable(varName, varValue + val);
                    break;
                case "-":
                    DBA.saveVariable(varName, varValue - val);
                    break;
                case "X":
                    DBA.saveVariable(varName, varValue * val);
                    break;
                case "/":
                    DBA.saveVariable(varName, varValue / val);
                    break;
                case "text":
                    DBA.saveVariable(varName, val);
            }
        }
    },
};
