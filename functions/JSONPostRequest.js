module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "JSON Post Request",

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

        <label>Variable name *</label><br>
        <input class="input-field" id="variableName" value="" name="variableName"><br><br>

        <label>JSON *</label><br>
        <textarea class="input-field" style="font-size: 15px" id="Json" value="" name="JSON"></textarea><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const fetch = require("node-fetch");

        const link = DBA.var(info.link.value);
        const variable = DBA.var(info.variableName.value);
        const json = JSON.parse(DBA.var(info.JSON.value));
        console.log(json);

        DBA.pause(3);

        const fetched = await fetch(link, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json),
        });

        const object = await fetched.json();

        if (object instanceof Array) {
            console.log("isArray");
            DBA.saveVariable(`${variable}`, object);
            for (let x = 0; x < object.length; x++) {
                if (object[x] instanceof Array) {
                    for (let i = 0; i < object[x].length; i++) {
                        DBA.saveVariable(`${variable}.${key}.${i + 1}`, object[x]);
                        try {
                            for (const arrayKey in object[x][i]) {
                                DBA.saveVariable(`${variable}.${key}.${i + 1}.${arrayKey}`, object[x][i][arrayKey]);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    try {
                        for (const key2 in object[x]) {
                            DBA.saveVariable(`${variable}.${key2}`, object[x][key2]);
                            try {
                                for (const key3 in object[x][key2]) {
                                    DBA.saveVariable(`${variable}.${key2}.${key3}`, object[x][key2][key3]);
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
        } else {
            console.log("isObject");
            for (const key in object) {
                console.log(key);
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
        }
    },
};
