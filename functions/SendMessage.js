module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Send Message",

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
        <label>Channel name or ID *</label><br>
        <input class="input-field" id="channelVar" name="channelVar">
        <a onclick="openVar('channelVar')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Message</label><br>
        <input class="input-field" id="msg" name="msg">
        <a onclick="openVar('msg')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" id="msgVarName" name="msgVarName">
        <a onclick="openVar('msgVarName')" class="var-btn">INSERT VARIABLE</a>

        <form id="addButtonMsg" name="differnetForm">
            <h2>Buttons</h2>
            <label>Label</label><br>
            <input class="input-field" id="label" name="label">
            <a onclick="openVar('label')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Custom ID (this becomes an URL when a link style is selected)</label><br>
            <input class="input-field" id="customId" name="customId">
            <a onclick="openVar('customId')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Emoji (unicode or custom emoji id)</label><br>
            <input class="input-field" id="emojiMessage" name="emojiMsg">
            <a onclick="openVar('emojiMsg')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Style</label><br>
            <select class="input-field" id="customStyle" name="style">
                <option value="PRIMARY">PRIMARY</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="DANGER">DANGER</option>
                <option value="LINK">LINK</option>
            </select><br>

            <a id="saveButton" style="padding: 5px; color: black; border-radius: 5px; background-color: var(--clr-cyan)">ADD BUTTON</a><br><br>
        </form>

        <input style="display: none" id="buttonsCheckMsg" name="buttonsMsg">

        <center>
            <div style="text-align: left;" name="buttonHolderMsg" id="buttonHolderMsg">
            </div>
        </center>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const Discord = require("discord.js");
        const channelVar = DBA.var(info.channelVar.value);
        const channel = message.guild.channels.cache.find(x => x.name === channelVar || x.id === channelVar);
        const variabled = DBA.var(info.msg.value);

        var buttons;

        try {
            const buttonString = DBA.var(info.buttonsMsg.value);
            buttons = JSON.parse(buttonString);

            var row = new Discord.MessageActionRow();

            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].style === "LINK") {
                    if (buttons[i].emoji !== "") {
                        row.addComponents(
                            new Discord.MessageButton()
                                .setLabel(buttons[i].label)
                                .setStyle(buttons[i].style)
                                .setURL(buttons[i].customId)
                                .setEmoji(buttons[i].emoji)
                        );
                    } else {
                        row.addComponents(
                            new Discord.MessageButton()
                                .setLabel(buttons[i].label)
                                .setStyle(buttons[i].style)
                                .setURL(buttons[i].customId)
                        );
                    }
                } else {
                    if (buttons[i].emoji !== "") {
                        row.addComponents(
                            new Discord.MessageButton()
                                .setLabel(buttons[i].label)
                                .setStyle(buttons[i].style)
                                .setCustomId(buttons[i].customId)
                                .setEmoji(buttons[i].emoji)
                        );
                    } else {
                        row.addComponents(
                            new Discord.MessageButton()
                                .setLabel(buttons[i].label)
                                .setStyle(buttons[i].style)
                                .setCustomId(buttons[i].customId)
                        );
                    }
                }
            }
        } catch (e) {}

        if (buttons) {
            const msg = await channel.send({ content: variabled, components: [row] });

            DBA.saveVariable(`${DBA.var(info.msgVarName.value)}.content`, msg.content);
            DBA.saveVariable(`${DBA.var(info.msgVarName.value)}.id`, msg.id);
        } else {
            const msg = await channel.send({ content: variabled });

            DBA.saveVariable(`${DBA.var(info.msgVarName.value)}.content`, msg.content);
            DBA.saveVariable(`${DBA.var(info.msgVarName.value)}.id`, msg.id);
        }
    },
};
