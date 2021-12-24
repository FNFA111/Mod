module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Edit Message",

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
        <label>Message ID *</label><br>
        <input class="input-field" id="editMsg" name="editMsg">
        <a onclick="openVar('editMsg')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Channel ID *</label><br>
        <input class="input-field" id="editChannelId" name="editChannelId">
        <a onclick="openVar('editChannelId')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Message</label><br>
        <input class="input-field" name="editMsgMsg">
        <a onclick="openVar('editMsgMsg')" class="var-btn">INSERT VARIABLE</a>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const channelVar = DBA.var(info.editChannelId.value);
        const channel = message.guild.channels.cache.find(x => x.id === channelVar || x.name === channelVar);
        const msg = await channel.messages.fetch(DBA.var(info.editMsg.value));

        msg.edit({ content: DBA.var(info.editMsgMsg.value) });
    },
};
