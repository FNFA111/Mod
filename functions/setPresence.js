module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Set Presence",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Bot Action",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Presence Text *</label><br>
        <input class="input-field" id="presence" name="status">

        <label>Presence Type *</label><br>
        <select class="input-field" id="type" name="type">
            <option value="PLAYING">PLAYING</option>
            <option value="WATCHING">WATCHING</option>
            <option value="LISTENING">LISTENING</option>
            <option value="STREAMING">STREAMING</option>
        </select>

        <label>Stream Link (You must use this if you choose STREAMING) *</label><br>
        <input class="input-field" id="link" name="link">

        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, info, message, args) {
        DBA.bot.user.setActivity(DBA.var(info.status.value), {
            type: info.type.value,
            link: DBA.var(info.link.value),
            status: "online",
        });
    },
};
