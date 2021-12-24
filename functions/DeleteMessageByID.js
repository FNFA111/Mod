module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Delete Message By ID",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Message",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Channel id or name *</label><br>
        <input class="input-field" id="channel" name="channel">
        <a onclick="openVar('channel')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Message ID *</label><br>
        <input class="input-field" id="msgID" name="msgID">
        <a onclick="openVar('msgID')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, info, message, args) {
        const channel = message.guild.channels.cache.find(
            x => x.id === DBA.var(info.channel.value) || x.name === DBA.var(info.channel.value)
        );

        const msg = channel.messages.fetch(DBA.var(info.msgID.value)).then(msg => msg.delete());
    },
};
