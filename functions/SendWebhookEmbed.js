module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Send Webhook Embed",

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
        <input class="input-field" id="hookEmbedVarName" name="hookEmbedVarName">
        <a onclick="openVar('hookEmbedVarName')" class="var-btn">INSERT VARIABLE</a>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, info, message, args) {
        const Discord = require("discord.js");
        const webhook = new Discord.WebhookClient({ url: DBA.var(info.webhook.value) });

        let embed = new Discord.MessageEmbed()
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

        webhook.send({ embeds: [embed] });
        DBA.saveVariable(`${DBA.var(info.hookEmbedVarName.value)}.content`, msg.content);
        DBA.saveVariable(`${DBA.var(info.hookEmbedVarName.value)}.id`, msg.id);
    },
};
