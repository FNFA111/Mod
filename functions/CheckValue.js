module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Check Variable Value",

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
        <label for="keyVal">Value *</label><br>
        <input class="input-field" id="val2" name="val"><br>
        <a onclick="openVar('val2')" class="var-btn">INSERT VARIABLE</a><br><br>

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
        const fs = require("fs");

        const val = DBA.var(info.value.value);
        const varValue = DBA.var(info.val.value);

        switch (info.opInput.value) {
            case "=":
                if (varValue !== val) {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case ">":
                if (varValue > val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case "<":
                if (varValue < val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case ">=":
                if (varValue >= val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
            case "<=":
                if (varValue <= val) {
                } else {
                    DBA.callFalse(DBA.function.name, DBA.function.response.name);
                }
                break;
        }
    },
};
