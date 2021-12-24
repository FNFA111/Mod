module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Change Server Name",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Server Action",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Name *</label><br>
        <input class="input-field" id="name" name="name">
        <a onclick="openVar('name')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        message.guild.setName(info.name.value);
    },
};
