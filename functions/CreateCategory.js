module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Create Category",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Channel",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Category Name</label><br>
        <input class="input-field" id="CategoryName" value="" name="CategoryName"><br>
        <a onclick="openVar('CategoryName')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, info, message, args) {
        const variabled = DBA.var(info.channelName.value);

        message.guild.channels.create(variabled, {
            type: "GUILD_CATEGORY",
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                },
            ],
        });
    },
};
