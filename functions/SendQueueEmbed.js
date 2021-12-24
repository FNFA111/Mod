module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Send Queue Embed",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["Miro#5410"],

    //Place the description of this mod here
    description: "Official Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Music",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Channel name or ID *</label><br>
        <input class="input-field" id="channelVar" name="channelVar">
        <a onclick="openVar('channelVar')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label for="colorDBT">Embed Color</label><br>
        <input type="color" class="input-field" id="color" placeholder="#FFFFFF" name="colorDBT"><br>
        <a onclick="openVar('color')" class="var-btn">INSERT VARIABLE</a><br><br><br>
        
        <label for="titleDBT">Embed Title</label><br>
        <input class="input-field" value="" id="titleEmbed" name="titleDBT"><br>
        <a onclick="openVar('titleEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="descriptionDBT">Embed Description</label><br>
        <textarea class="input-field" value="" id="descEmbed" name="descriptionDBT"></textarea><br>
        <a onclick="openVar('descEmbed')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorDBT">Embed Author</label><br>
        <input class="input-field" value="" id="authorDBT" name="authorDBT"><br>
        <a onclick="openVar('authorDBT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="authorDBT">Embed Author Image</label><br>
        <input class="input-field" value="" id="authorImg" name="authorImg"><br>
        <a onclick="openVar('authorDBT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="thumbDBT">Embed Thumbnail</label><br>
        <input class="input-field" value="" id="thumbDBT" name="thumbDBT"><br>
        <a onclick="openVar('thumbDBT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="imageDBT">Embed Image</label><br>
        <input class="input-field" value="" id="imageDBT" name="imageDBT"><br>
        <a onclick="openVar('imageDBT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="timestampDBT">Embed Timestamp</label><br>
        <input class="input-field" value="" id="timestampDBT" name="timestampDBT"><br>
        <a onclick="openVar('timestampDBT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerDBT">Embed Footer</label><br>
        <input class="input-field" value="" id="footerDBT" name="footerDBT"><br>
        <a onclick="openVar('footerDBT')" class="var-btn">INSERT VARIABLE</a><br><br><br>

        <label for="footerDBT">Embed Footer Image</label><br>
        <input class="input-field" value="" id="footerImg" name="footerImg"><br>
        <a onclick="openVar('footerDBT')" class="var-btn">INSERT VARIABLE</a><br><br><br>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        const { MessageEmbed } = require("discord.js");
        const music = require("@koenie06/discord.js-music");
        const Discord = require("discord.js");

        const channelVar = DBA.var(info.channelVar.value);
        const channel = message.guild.channels.cache.find(x => x.name === channelVar || x.id === channelVar);

        let embed = new MessageEmbed()
            .setTitle(DBA.var(info.titleDBT.value))
            .setDescription(DBA.var(info.descriptionDBT.value))
            .setThumbnail(DBA.var(info.thumbDBT.value))
            .setColor(DBA.var(info.colorDBT.value))
            .setImage(DBA.var(info.imageDBT.value));

        if (info.footerImg.value.length > 0) {
            embed.setFooter(DBA.var(info.footerDBT.value), DBT.var(info.footerImg.value));
        } else {
            embed.setFooter(DBA.var(info.footerDBT.value));
        }

        if (info.authorImg.value.length > 0) {
            embed.setAuthor(DBA.var(info.authorDBT.value), DBT.var(info.authorImg.value));
        } else {
            embed.setAuthor(DBA.var(info.authorDBT.value));
        }
        const queue = await music.getQueue({ interaction: message });
        try {
            for (let i = 0; i < queue.length; i++) {
                embed.addField(
                    `${i + 1}. ${queue[i].info.title}`,
                    `Duration - **${queue[i].info.duration}**, Likes - **${queue[i].info.likes}**`
                );
            }
        } catch (e) {
            embed.addField("Queue is empty", "❌**There are no songs playing on this server**");
        }
        channel.send({ embeds: [embed] });
    },
};
