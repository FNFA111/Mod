module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Get Mentioned Channel",

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
        const channel = message.mentions.channels.first() || message.channel;

        DBA.saveVariable(`${info.variable.value}.id`, channel.id);
        DBA.saveVariable(`${info.variable.value}.name`, channel.name);
        DBA.saveVariable(`${info.variable.value}.pos`, channel.position);
        DBA.saveVariable(`${info.variable.value}.type`, channel.type);
    },
};
