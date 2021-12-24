module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "JSON Get Request",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "API Request",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Link *</label><br>
        <input class="input-field" id="Link" value="" name="link"><br><br>

        <label>Variable name to save as (no spaces) *</label><br>
        <input class="input-field" id="VarName" value="" name="variableName"><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const fetch = require("node-fetch");

        const link = DBA.var(info.link.value);
        const variable = DBA.var(info.variableName.value);

        const fetched = await fetch(link, {
            method: "GET",
        });

        const object = await fetched.json();

        if (object instanceof Array) {
            DBA.saveVariable(`${variable}.${key}`, object);
            for (let x = 0; x < object.length; x++) {
                if (object[x] instanceof Array) {
                    for (let i = 0; i < object[key].length; i++) {
                        DBA.saveVariable(`${variable}.${key}.${i + 1}`, object[key]);
                        try {
                            for (const arrayKey in object[key][i]) {
                                DBA.saveVariable(`${variable}.${key}.${i + 1}.${arrayKey}`, object[key][i][arrayKey]);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    try {
                        for (const key2 in object[x]) {
                            DBA.saveVariable(`${variable}.${key2}`, object[key][key2]);
                            try {
                                for (const key3 in object[key][key2]) {
                                    DBA.saveVariable(`${variable}.${key2}.${key3}`, object[key][key2][key3]);
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }

        for (const key in object) {
            DBA.saveVariable(`${variable}.${key}`, object[key]);
            if (object[key] instanceof Array) {
                for (let i = 0; i < object[key].length; i++) {
                    DBA.saveVariable(`${variable}.${key}.${i + 1}`, object[key]);
                    try {
                        for (const arrayKey in object[key][i]) {
                            DBA.saveVariable(`${variable}.${key}.${i + 1}.${arrayKey}`, object[key][i][arrayKey]);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                try {
                    for (const key2 in object[key]) {
                        DBA.saveVariable(`${variable}.${key2}`, object[key][key2]);
                        try {
                            for (const key3 in object[key][key2]) {
                                DBA.saveVariable(`${variable}.${key2}.${key3}`, object[key][key2][key3]);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    },
};
