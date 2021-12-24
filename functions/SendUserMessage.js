module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Send User Message",

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
        <label>User ID *</label><br>
        <input class="input-field" id="authorVar" name="authorVar">
        <a onclick="openVar('authorVar')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Message</label><br>
        <input class="input-field" name="authorMsg">
        <a onclick="openVar('authorMsg')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" id="userMsgVarName" name="userMsgVarName">
        <a onclick="openVar('userMsgVarName')" class="var-btn">INSERT VARIABLE</a>

        <label>Variable Name *</label><br>
        <input class="input-field" id="userMsgVarName" name="userMsgVarName">
        <a onclick="openVar('userMsgVarName')" class="var-btn">INSERT VARIABLE</a>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const Discord = require("discord.js");
        const channelVar = DBA.var(info.authorVar.value);
        const user = message.guild.members.cache.find(x => x.id === channelVar);
        const variabled = DBA.var(info.authorMsg.value);

        var buttons;

        const msg = await user.send({ content: variabled });
        DBA.saveVariable(`${DBA.var(info.userMsgVarName.value)}.content`, msg.content);
        DBA.saveVariable(`${DBA.var(info.userMsgVarName.value)}.id`, msg.id);
    },
};
