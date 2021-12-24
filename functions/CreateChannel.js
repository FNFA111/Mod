module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Create Channel",

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
        <label>Channel Name</label><br>
        <input class="input-field" id="channelName" value="" name="channelName"><br>
        <a onclick="openVar('channelName')" class="var-btn">INSERT VARIABLE</a><br><br>
        
        <select name="type">
            <option select value="GUILD_TEXT">Text Channel</option>
            <option select value="GUILD_VOICE">Voice Channel</option>
            <option select value="GUILD_STAGE_VOICE">Stage Channel</option>
        </select>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, info, message, args) {
        const variabled = DBA.var(info.channelName.value);

        message.guild.channels.create(variabled, {
            type: info.type.value,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                },
            ],
        });
    },
};
