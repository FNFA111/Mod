module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Send Webhook Message",

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
        <label>Webhook URL *</label><br>
        <input class="input-field" id="webhook" name="webhook">
        <a onclick="openVar('webhook')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Message *</label><br>
        <input class="input-field" id="msg" value="" name="msg">
        <a onclick="openVar('msg')" class="var-btn">INSERT VARIABLE</a>

        <label>Variable Name *</label><br>
        <input class="input-field" id="hookMsgVarName" name="hookMsgVarName">
        <a onclick="openVar('hookMsgVarName')" class="var-btn">INSERT VARIABLE</a>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, info, message, args) {
        const Discord = require("discord.js");
        const webhook = new Discord.WebhookClient({ url: DBA.var(info.webhook.value) });
        webhook.send(DBA.var(info.msg.value));
        DBA.saveVariable(`${DBA.var(info.hookMsgVarName.value)}.content`, msg.content);
        DBA.saveVariable(`${DBA.var(info.hookMsgVarName.value)}.id`, msg.id);
    },
};
