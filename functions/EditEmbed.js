module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Edit Embed",

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
        <h6 style="color: grey">
        Use \${var.botMessage.id} to get this messages ID<br>
        or use \${var.botMessage.content} to get this messages content
        </h6><br>
        
        <label>Channel ID or name *</label><br>
        <input class="input-field" id="editEmbedChannel" name="editEmbedChannel">
        <a onclick="openVar('editEmbedChannel')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Message ID *</label><br>
        <input class="input-field" id="editEmbedMsg" name="editEmbedMsg">
        <a onclick="openVar('editEmbedMsg')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="colorEDIT">Embed Color</label><br>
        <input type="color" class="input-field" id="color" placeholder="#FFFFFF" name="colorEDIT"><br>
        <a onclick="openVar('color')" class="var-btn">INSERT VARIABLE</a><br><br><br>
        
        <label for="titleEDIT">Embed Title</label><br>
        <input class="input-field" value="" id="titleEmbed" name="titleEDIT"><br>
        <a onclick="openVar('titleEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="descriptionEDIT">Embed Description</label><br>
        <textarea class="input-field" value="" id="descEmbed" name="descriptionEDIT"></textarea><br>
        <a onclick="openVar('descEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorEDIT">Embed Author</label><br>
        <input class="input-field" value="" id="authorEDIT" name="authorEDIT"><br>
        <a onclick="openVar('authorEDIT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorEDIT">Embed Author Image</label><br>
        <input class="input-field" value="" id="authorImg" name="authorImgEdit"><br>
        <a onclick="openVar('authorEDIT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="thumbEDIT">Embed Thumbnail</label><br>
        <input class="input-field" value="" id="thumbEDIT" name="thumbEDIT"><br>
        <a onclick="openVar('thumbEDIT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="imageEDIT">Embed Image</label><br>
        <input class="input-field" value="" id="imageEDIT" name="imageEDIT"><br>
        <a onclick="openVar('imageEDIT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="timestampEDIT">Embed Timestamp</label><br>
        <input class="input-field" value="" id="timestampEDIT" name="timestampEDIT"><br>
        <a onclick="openVar('timestampEDIT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerEDIT">Embed Footer</label><br>
        <input class="input-field" value="" id="footerEDIT" name="footerEDIT"><br>
        <a onclick="openVar('footerEDIT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerEDIT">Embed Footer Image</label><br>
        <input class="input-field" value="" id="footerImg" name="footerImgEdit"><br>
        <a onclick="openVar('footerEDIT')" class="var-btn">INSERT VARIABLE</a><br><br><br>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        const { MessageEmbed } = require("discord.js");
        const Discord = require("discord.js");

        const channelVar = DBA.var(info.editEmbedChannel.value);
        const channel = message.guild.channels.cache.find(x => x.id === channelVar || x.name === channelVar);

        const msg = await channel.messages.fetch(DBA.var(info.editEmbedMsg.value));

        let embed = new MessageEmbed()
            .setTitle(DBA.var(info.titleEDIT.value))
            .setDescription(DBA.var(info.descriptionEDIT.value))
            .setThumbnail(DBA.var(info.thumbEDIT.value))
            .setColor(DBA.var(info.colorEDIT.value))
            .setImage(DBA.var(info.imageEDIT.value));

        if (info.footerImg.value.length > 0) {
            embed.setFooter(DBA.var(info.footerEDIT.value), DBA.var(info.footerImg.value));
        } else {
            embed.setFooter(DBA.var(info.footerEDIT.value));
        }

        if (info.authorImg.value.length > 0) {
            embed.setAuthor(DBA.var(info.authorEDIT.value), DBA.var(info.authorImg.value));
        } else {
            embed.setAuthor(DBA.var(info.authorEDIT.value));
        }

        msg.edit({ embeds: [embed] });
    },
};
