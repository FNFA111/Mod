module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Slash Command Embed",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["Miro#5410"],

    //Place the description of this mod here
    description: "Official Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Message",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label for="colorSlash">Embed Color</label><br>
        <input type="color" class="input-field" id="color" placeholder="#FFFFFF" name="colorSlash"><br>
        <a onclick="openVar('color')" class="var-btn">INSERT VARIABLE</a><br><br><br>
        
        <label for="titleSlash">Embed Title</label><br>
        <input class="input-field" value="" id="titleEmbed" name="titleSlash"><br>
        <a onclick="openVar('titleEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="descriptionSlash">Embed Description</label><br>
        <textarea class="input-field" value="" id="descEmbed" name="descriptionSlash"></textarea><br>
        <a onclick="openVar('descEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorSlash">Embed Author</label><br>
        <input class="input-field" value="" id="authorSlash" name="authorSlash"><br>
        <a onclick="openVar('authorSlash')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorSlash">Embed Author Image</label><br>
        <input class="input-field" value="" id="authorImg" name="authorImg"><br>
        <a onclick="openVar('authorSlash')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="thumbSlash">Embed Thumbnail</label><br>
        <input class="input-field" value="" id="thumbSlash" name="thumbSlash"><br>
        <a onclick="openVar('thumbSlash')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="imageSlash">Embed Image</label><br>
        <input class="input-field" value="" id="imageSlash" name="imageSlash"><br>
        <a onclick="openVar('imageSlash')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="timestampSlash">Embed Timestamp</label><br>
        <input class="input-field" value="" id="timestampSlash" name="timestampSlash"><br>
        <a onclick="openVar('timestampSlash')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerSlash">Embed Footer</label><br>
        <input class="input-field" value="" id="footerSlash" name="footerSlash"><br>
        <a onclick="openVar('footerSlash')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerSlash">Embed Footer Image</label><br>
        <input class="input-field" value="" id="footerImg" name="footerImg"><br>
        <a onclick="openVar('footerSlash')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Ephemeral Message</label><br>
        <select class="input-field" id="ephermalSlashEmbed" name="ephermalSlashEmbed">
            <option value="false">NO</option>
            <option value="true">YES</option>
        </select><br><br><br>

        <form id="addButtonSlashEmbed" name="differnetForm">
            <h2>Buttons</h2>
            <label>Label</label><br>
            <input class="input-field" id="labelSlashEmbed" name="label">
            <a onclick="openVar('label')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Custom ID (if a link style is selected, the custom id becomes the link)</label><br>
            <input class="input-field" id="customIdSlashEmbed" name="customId">
            <a onclick="openVar('customId')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Emoji (unicode or custom emoji id)</label><br>
            <input class="input-field" id="emojiSlashEmbed" name="emojiEmb">
            <a onclick="openVar('emojiEmb')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Style</label><br>
            <select class="input-field" id="customStyleSlashEmbed" name="style">
                <option value="PRIMARY">PRIMARY</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="DANGER">DANGER</option>
                <option value="LINK">LINK (the custom id becomes a link)</option>
            </select><br>

            <a id="saveButtonSlashEmbed" style="padding: 5px; color: black; border-radius: 5px; background-color: var(--clr-cyan)">ADD BUTTON</a><br><br>
        </form>

        <input style="display: none" id="buttonsCheckSlashEmbed" name="buttonsSlashEmbed">

        <center>
            <div style="text-align: left;" name="buttonHolderSlashEmbed" id="buttonHolderSlashEmbed">
            </div>
        </center>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, interaction, args) {
        const { MessageEmbed } = require("discord.js");
        const Discord = require("discord.js");
        let embed = new MessageEmbed()
            .setTitle(DBA.var(info.titleSlash.value))
            .setDescription(DBA.var(info.descriptionSlash.value))
            .setThumbnail(DBA.var(info.thumbSlash.value))
            .setColor(DBA.var(info.colorSlash.value))
            .setImage(DBA.var(info.imageSlash.value));

        if (info.footerImg.value.length > 0) {
            embed.setFooter(DBA.var(info.footerSlash.value), DBA.var(info.footerImg.value));
        } else {
            embed.setFooter(DBA.var(info.footerSlash.value));
        }

        if (info.authorImg.value.length > 0) {
            embed.setAuthor(DBA.var(info.authorSlash.value), DBA.var(info.authorImg.value));
        } else {
            embed.setAuthor(DBA.var(info.authorSlash.value));
        }

        var buttons;
        var row = new Discord.MessageActionRow();

        try {
            const buttonString = DBA.var(info.buttonsSlashEmbed.value);
            buttons = JSON.parse(buttonString);

            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].style === "LINK") {
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
                            .setCustomId(buttons[i].customId)
                            .setEmoji(buttons[i].emoji)
                    );
                }
            }
        } catch (e) {}

        if (buttons) {
            interaction.reply({ embeds: [embed], components: [row], ephemeral: JSON.parse(info.ephermalSlashEmbed.value) });
        } else {
            interaction.reply({ embeds: [embed], ephemeral: JSON.parse(info.ephermalSlashEmbed.value) });
        }
    },
};
