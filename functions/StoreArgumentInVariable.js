module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Store Argument In Variable",

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
        <label>Variable name *</label><br>
        <input class="input-field" id="variable" name="variable"><br><br>

        <label>Parameter Number *</label><br>
        <input class="input-field" id="parameter" name="parameter">
        <a onclick="openVar('guildId')" class="var-btn">INSERT VARIABLE</a><br>
        
        <h5 style="color: grey;">
            If the user types {command} discord bot<br>
            then parameter number "1" is discord<br>
            and parameter number "2" is bot
            <br><br>
            type 0 to take all the text as an argument<br>
            type 1 to take the first argument<br>
            type 1+ to take argument one and the text after it
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const value = DBA.var(info.parameter.value);

        if (value === "0") {
            DBA.saveVariable(info.variable.value, args.join(" "));
        } else if (value.includes("+")) {
            const argsToSave = args.slice(value).join(" ");

            DBA.saveVariable(info.variable.value, DBA.var(argsToSave));
        } else {
            DBA.saveVariable(info.variable.value, DBA.var(args[value - 1]));
        }
    },
};
