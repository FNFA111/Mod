module.exports = {
    name: "Send Level Card",

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
            <input class="input-field" id="authorVar" name="authorVar">
            <a onclick="openVar('authorVar')" class="var-btn">INSERT VARIABLE</a><br><br>

            <label>Channel name or id to send in</label><br>
            <input class="input-field" name="lvlCardChannel">
            <a onclick="openVar('lvlCardChannel')" class="var-btn">INSERT VARIABLE</a><br><br>
            
            <label>Needed XP</label>
            <input class="input-field" name="neededxp"></input><br>
            <a onclick="openVar('lvlCardChannel')" class="var-btn">INSERT VARIABLE</a>
            <br><br>
            
            <label>XP User has</label>
            <input class="input-field" name="userxp"></input><br>
            <a onclick="openVar('lvlCardChannel')" class="var-btn">INSERT VARIABLE</a>
            <br><br>
            
            <label>Level User Has</label>
            <input class="input-field" name="userlvl"></input><br>
            <a onclick="openVar('lvlCardChannel')" class="var-btn">INSERT VARIABLE</a>
            <br><br>
            
            <label>Level Color</label>
            <input class="input-field" value="#8feb34" name="lvlcolor"></input><br>
            <a onclick="openVar('lvlCardChannel')" class="var-btn">INSERT VARIABLE</a>
            <br><br>
            
            <label>Progress Bar Color</label>
            <input class="input-field" value="#8feb34" name="barcolor"></input><br>
            <a onclick="openVar('lvlCardChannel')" class="var-btn">INSERT VARIABLE</a>
            <br><br>

            <label>Choose Background Type:</label>
            <select class="input-field" name="bgtype">
                <option value="IMAGE">Image</option>
                <option value="COLOR">Color</option>
            </select>
            <br><br>
            
            <label>Background Color/Image</label>
            <input class="input-field" name="bg"></input><br>
            <a onclick="openVar('lvlCardChannel')" class="var-btn">INSERT VARIABLE</a>
            <br><br>  
        `;
    },

    // When the bot is first started, this code will be ran.
    startup: function (DBA) {
        DBA.requireModule("canvacord");
    },

    // Place your mod here.
    execute: async function (DBA, info, message, args) {
        const Discord = require("discord.js");
        const canvacord = require("canvacord");

        const mention = message.guild.members.cache.find(x => x.id === DBA.var(info.authorVar.value));

        let name = mention.user.username;
        let tag = mention.user.tag.slice(mention.user.username.length + 1);

        let neededXP = DBA.var(info.neededxp.value);
        let userXP = DBA.var(info.userxp.value);
        let userLevel = DBA.var(info.userlvl.value);
        let lvlColor = DBA.var(info.lvlcolor.value);
        let barColor = DBA.var(info.barcolor.value);
        let avatar = mention.user.displayAvatarURL({ format: "jpg" });
        let background = DBA.var(info.bg.value);
        let bgtype = DBA.var(info.bgtype.value);

        const rank = new canvacord.Rank()
            .setAvatar(avatar)
            .setCurrentXP(parseInt(userXP))
            .setRequiredXP(parseInt(neededXP))
            .setStatus("online")
            .setProgressBar(barColor)
            .setUsername(name)
            .setDiscriminator(tag)
            .setLevel(parseInt(userLevel))
            .setLevelColor(lvlColor)
            .setRank(parseInt(userLevel))
            .setRankColor(lvlColor)
            .setBackground(bgtype, background);

        rank.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, "lvlCard.png");
            const channel = message.guild.channels.cache.find(
                x => x.id === DBA.var(info.lvlCardChannel.value) || x.name === DBA.var(info.lvlCardChannel.value)
            );
            channel.send({ files: [attachment] });
        });
    },
};
