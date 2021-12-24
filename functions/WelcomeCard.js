module.exports = {
    name: "Send Welcome Card",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function (data) {
        return `
            <label>User ID *</label><br>
            <input class="input-field" name="welcomeUser">
            <a onclick="openVar('welcomeUser')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Channel name or id to send in</label><br>
            <input class="input-field" name="welcomeChannel">
            <a onclick="openVar('welcomeChannel')" class="var-btn">INSERT VARIABLE</a><br><br>
            
            <label>Background</label><br>
            <input class="input-field" name="welcomeBg">
            <a onclick="openVar('welcomeBg')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Text and outline color</label><br>
            <input class="input-field" name="welcomeColor">
            <a onclick="openVar("welcomeColor')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Title</label><br>
            <input class="input-field" name="welcomeTitle">
            <a onclick="openVar("welcomeTitle')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Subtitle</label><br>
            <input class="input-field" name="welcomeSubtitle">
            <a onclick="openVar("welcomeSubtitle')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Border</label><br>
            <select class="input-field" name="welcomeBorder">
                <option value="true">YES</option>
                <option value="false">NO</option>
            </select><br><br>

            <label>Rounded</label><br>
            <select class="input-field" name="welcomeRounded">
                <option value="true">YES</option>
                <option value="false">NO</option>
            </select><br><br>
        `;
    },

    // When the bot is first started, this code will be ran.
    startup: function (DBA) {
        DBA.requireModule("discord-welcome-card");
    },

    // Place your mod here.
    execute: async function (DBA, info, message, args) {
        const Discord = require("discord.js");
        const welcomeCard = require("discord-welcome-card");

        const member = message.guild.members.cache.find(x => x.id === DBA.var(info.welcomeUser.value));
        const channel = message.guild.channels.cache.find(
            x => x.id === DBA.var(info.welcomeChannel.value) || x.name === DBA.var(info.welcomeChannel.value)
        );

        const card = {
            theme: "circuit",
            text: {
                title: DBA.var(info.welcomeTitle.value),
                text: member.user.tag,
                subtitle: DBA.var(info.welcomeSubtitle.value),
                color: DBA.var(info.welcomeColor.value),
            },
            avatar: {
                image: member.user.displayAvatarURL({ format: "png" }),
                outlineWidth: 5,
                outlineColor: DBA.var(info.welcomeColor.value),
            },
            background: DBA.var(info.welcomeBg.value),
            blur: 1,
            border: JSON.parse(info.welcomeBorder.value),
            rounded: JSON.parse(info.welcomeRounded.value),
        };

        const image = await welcomeCard.drawCard(card);

        channel.send({ files: [image] });
    },
};
