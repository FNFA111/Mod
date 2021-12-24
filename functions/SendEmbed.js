module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Send Embed",

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
        <label>Channel name or ID *</label><br>
        <input class="input-field" id="channelVar" name="channelVar">
        <a onclick="openVar('channelVar')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="colorDBA">Embed Color</label><br>
        <input type="color" class="input-field" id="color" placeholder="#FFFFFF" name="colorDBA"><br>
        <a onclick="openVar('color')" class="var-btn">INSERT VARIABLE</a><br><br><br>
        
        <label for="titleDBA">Embed Title</label><br>
        <input class="input-field" value="" id="titleEmbed" name="titleDBA"><br>
        <a onclick="openVar('titleEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="descriptionDBA">Embed Description</label><br>
        <textarea class="input-field" value="" id="descEmbed" name="descriptionDBA"></textarea><br>
        <a onclick="openVar('descEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorDBA">Embed Author</label><br>
        <input class="input-field" value="" id="authorDBA" name="authorDBA"><br>
        <a onclick="openVar('authorDBA')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorDBA">Embed Author Image</label><br>
        <input class="input-field" value="" id="authorImg" name="authorImg"><br>
        <a onclick="openVar('authorDBA')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="thumbDBA">Embed Thumbnail</label><br>
        <input class="input-field" value="" id="thumbDBA" name="thumbDBA"><br>
        <a onclick="openVar('thumbDBA')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="imageDBA">Embed Image</label><br>
        <input class="input-field" value="" id="imageDBA" name="imageDBA"><br>
        <a onclick="openVar('imageDBA')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="timestampDBA">Embed Timestamp</label><br>
        <input class="input-field" value="" id="timestampDBA" name="timestampDBA"><br>
        <a onclick="openVar('timestampDBA')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerDBA">Embed Footer</label><br>
        <input class="input-field" value="" id="footerDBA" name="footerDBA"><br>
        <a onclick="openVar('footerDBA')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerDBA">Embed Footer Image</label><br>
        <input class="input-field" value="" id="footerImg" name="footerImg"><br>
        <a onclick="openVar('footerDBA')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" id="embedVarName" name="embedVarName">
        <a onclick="openVar('embedVarName')" class="var-btn">INSERT VARIABLE</a>

        <form id="addButtonEmbed" name="differnetForm">
            <h2>Buttons</h2>
            <label>Label</label><br>
            <input class="input-field" id="labelEmbed" name="label">
            <a onclick="openVar('label')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Custom ID (if a link style is selected, the custom id becomes the link)</label><br>
            <input class="input-field" id="customIdEmbed" name="customId">
            <a onclick="openVar('customId')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Emoji (unicode or custom emoji id)</label><br>
            <input class="input-field" id="emojiEmbed" name="emojiEmb">
            <a onclick="openVar('emojiEmb')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Style</label><br>
            <select class="input-field" id="customStyleEmbed" name="style">
                <option value="PRIMARY">PRIMARY</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="DANGER">DANGER</option>
                <option value="LINK">LINK (the custom id becomes a link)</option>
            </select><br>

            <a id="saveButtonEmbed" style="padding: 5px; color: black; border-radius: 5px; background-color: var(--clr-cyan)">ADD BUTTON</a><br><br>
        </form>

        <input style="display: none" id="buttonsCheckEmbed" name="buttonsEmbed">

        <center>
            <div style="text-align: left;" name="buttonHolderEmbed" id="buttonHolderEmbed">
            </div>
        </center>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        const { MessageEmbed } = require("discord.js");
        const Discord = require("discord.js");

        const channelVar = DBA.var(info.channelVar.value);
        const channel = message.guild.channels.cache.find(x => x.name === channelVar || x.id === channelVar);

        let embed = new MessageEmbed()
            .setTitle(DBA.var(info.titleDBA.value))
            .setDescription(DBA.var(info.descriptionDBA.value))
            .setThumbnail(DBA.var(info.thumbDBA.value))
            .setColor(DBA.var(info.colorDBA.value))
            .setImage(DBA.var(info.imageDBA.value));

        if (info.footerImg.value.length > 0) {
            embed.setFooter(DBA.var(info.footerDBA.value), DBA.var(info.footerImg.value));
        } else {
            embed.setFooter(DBA.var(info.footerDBA.value));
        }

        if (info.authorImg.value.length > 0) {
            embed.setAuthor(DBA.var(info.authorDBA.value), DBA.var(info.authorImg.value));
        } else {
            embed.setAuthor(DBA.var(info.authorDBA.value));
        }

        var buttons;
        var row = new Discord.MessageActionRow();

        try {
            const buttonString = DBA.var(info.buttonsEmbed.value);
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
            const msg = await channel.send({ embeds: [embed], components: [row] });
            DBA.saveVariable(`${DBA.var(info.embedVarName.value)}.content`, msg.content);
            DBA.saveVariable(`${DBA.var(info.embedVarName.value)}.id`, msg.id);
        } else {
            const msg = await channel.send({ embeds: [embed] });
            DBA.saveVariable(`${DBA.var(info.embedVarName.value)}.content`, msg.content);
            DBA.saveVariable(`${DBA.var(info.embedVarName.value)}.id`, msg.id);
        }
    },
};
