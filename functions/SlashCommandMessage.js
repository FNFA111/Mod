module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Slash Command Message",

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
        <label>Message</label><br>
        <input class="input-field" id="slashMsg" name="slashMsg">
        <a onclick="openVar('slashMsg')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Ephemeral Message</label><br>
        <select class="input-field" id="ephermalSlashMsg" name="ephermalSlashMsg">
            <option value="false">NO</option>
            <option value="true">YES</option>
        </select><br><br><br>

        <form id="addButtonSlashMsg" name="differnetForm">
            <h2>Buttons</h2>
            <label>Label</label><br>
            <input class="input-field" id="label" name="label">
            <a onclick="openVar('label')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Custom ID (this becomes an URL when a link style is selected)</label><br>
            <input class="input-field" id="customId" name="customId">
            <a onclick="openVar('customId')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Emoji (unicode or custom emoji id)</label><br>
            <input class="input-field" id="emojiMessage" name="emojiSlashMsg">
            <a onclick="openVar('emojiSlashMsg')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Style</label><br>
            <select class="input-field" id="customStyle" name="style">
                <option value="PRIMARY">PRIMARY</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="DANGER">DANGER</option>
                <option value="LINK">LINK</option>
            </select><br>

            <a id="saveButton" style="padding: 5px; color: black; border-radius: 5px; background-color: var(--clr-cyan)">ADD BUTTON</a><br><br>
        </form>

        <input style="display: none" id="buttonsCheckSlashMsg" name="buttonsSlashMsg">

        <center>
            <div style="text-align: left;" name="buttonHolderSlashMsg" id="buttonHolderSlashMsg">
            </div>
        </center>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, interaction, args) {
        const Discord = require("discord.js");
        const variabled = DBA.var(info.slashMsg.value);

        var buttons;

        try {
            const buttonString = DBA.var(info.buttonsSlashMsg.value);
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
            await interaction.reply({
                content: variabled,
                components: [row],
                ephemeral: JSON.parse(info.ephermalSlashMsg.value),
            });
        } else {
            await interaction.reply({ content: variabled, ephemeral: JSON.parse(info.ephermalSlashMsg.value) });
        }
    },
};
