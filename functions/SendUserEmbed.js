module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Send User Embed",

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
    
        <label>User ID *</label><br>
        <input class="input-field" id="userVar" name="userVar">
        <a onclick="openVar('userVar')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="colorDBM">Embed Color</label><br>
        <input type="color" class="input-field" id="color" placeholder="#FFFFFF" name="colorDBM"><br>
        <a onclick="openVar('color')" class="var-btn">INSERT VARIABLE</a><br><br><br>
        
        <label for="titleDBM">Embed Title</label><br>
        <input class="input-field" value="" id="titleEmbed" name="titleDBM"><br>
        <a onclick="openVar('titleEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="descriptionDBM">Embed Description</label><br>
        <textarea class="input-field" value="" id="descEmbed" name="descriptionDBM"></textarea><br>
        <a onclick="openVar('descEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorDBM">Embed Author</label><br>
        <input class="input-field" value="" id="authorDBM" name="authorDBM"><br>
        <a onclick="openVar('authorDBM')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorDBM">Embed Author Image</label><br>
        <input class="input-field" value="" id="authorImg" name="authorImg"><br>
        <a onclick="openVar('authorDBM')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="thumbDBM">Embed Thumbnail</label><br>
        <input class="input-field" value="" id="thumbDBM" name="thumbDBM"><br>
        <a onclick="openVar('thumbDBM')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="imageDBM">Embed Image</label><br>
        <input class="input-field" value="" id="imageDBM" name="imageDBM"><br>
        <a onclick="openVar('imageDBM')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="timestampDBM">Embed Timestamp</label><br>
        <input class="input-field" value="" id="timestampDBM" name="timestampDBM"><br>
        <a onclick="openVar('timestampDBM')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerDBM">Embed Footer</label><br>
        <input class="input-field" value="" id="footerDBM" name="footerDBM"><br>
        <a onclick="openVar('footerDBM')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerDBM">Embed Footer Image</label><br>
        <input class="input-field" value="" id="footerImg" name="footerImg"><br>
        <a onclick="openVar('footerDBM')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" id="userEmbedVarName" name="userEmbedVarName">
        <a onclick="openVar('userEmbedVarName')" class="var-btn">INSERT VARIABLE</a>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        const { MessageEmbed } = require("discord.js");
        const Discord = require("discord.js");

        const userVar = DBA.var(info.userVar.value);
        const channel = message.guild.members.cache.find(x => x.id === userVar);

        let embed = new MessageEmbed()
            .setTitle(DBA.var(info.titleDBM.value))
            .setDescription(DBA.var(info.descriptionDBM.value))
            .setThumbnail(DBA.var(info.thumbDBM.value))
            .setColor(DBA.var(info.colorDBM.value))
            .setImage(DBA.var(info.imageDBM.value));

        if (info.footerImg.value.length > 0) {
            embed.setFooter(DBA.var(info.footerDBM.value), DBA.var(info.footerImg.value));
        } else {
            embed.setFooter(DBA.var(info.footerDBM.value));
        }

        if (info.authorImg.value.length > 0) {
            embed.setAuthor(DBA.var(info.authorDBM.value), DBA.var(info.authorImg.value));
        } else {
            embed.setAuthor(DBA.var(info.authorDBM.value));
        }

        const msg = await channel.send({ embeds: [embed] });
        DBA.saveVariable(`${DBA.var(info.userEmbedVarName.value)}.content`, msg.content);
        DBA.saveVariable(`${DBA.var(info.userEmbedVarName.value)}.id`, msg.id);
    },
};
