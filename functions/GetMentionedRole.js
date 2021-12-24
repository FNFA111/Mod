module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Get Mentioned Role",

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
        <input class="input-field" id="variable" name="variable">
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const role = message.mentions.roles.first();

        DBA.saveVariable(`${info.variable.value}.id`, role.id);
        DBA.saveVariable(`${info.variable.value}.name`, role.name);
        DBA.saveVariable(`${info.variable.value}.color`, role.color);
        DBA.saveVariable(`${info.variable.value}.icon`, role.icon);
        DBA.saveVariable(`${info.variable.value}.guildid`, role.guild.id);
    },
};
