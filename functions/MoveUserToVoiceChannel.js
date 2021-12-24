module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Move User To Voice Channel",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "User Action",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>User ID *</label><br>
        <input class="input-field" id="voiceUserId" name="voiceUserId"><br>
        <a onclick="openVar('voiceUserId')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Channel id or name *</label><br>
        <input class="input-field" id="voiceMoveChannel2" name="voiceMoveChannel"><br>
        <a onclick="openVar('voiceMoveChannel2')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const userID = DBA.var(info.voiceUserId.value);
        const member = message.guild.members.cache.find(x => x.id === userID);
        const channel = message.guild.channels.cache.find(x => x.id === DBA.var(info.voiceMoveChannel.value));

        member.voice.setChannel(channel);
    },
};
