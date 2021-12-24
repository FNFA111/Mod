module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Discord Together",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019#1019"],

    //Place the description of this mod here
    description: "Official Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Message",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Game/Activity *</label>
        <select name="main" class="input-field">
            <option value="youtube">Youtube</option>
            <option value="poker">Poker</option>
            <option value="chess">Chess</option>
            <option value="betrayal">Betrayal</option>
            <option value="fishing">Fishington</option>
            <option value="lettertile">Letter Tile</option>
            <option value="wordsnack">Word Snack</option>
            <option value="doodlecrew">Doodle Crew</option>
            <option value="spellcast">SpellCast</option>
            <option value="awkword">Awkword</option>
        </select><br><br>
        <label>Message *</label><br>
        <input class="input-field" name="msg">
        `;
    },
    startup: function (DBA) {
        DBA.requireModule("discord-together");
    },
    execute: function (DBA, info, message, args) {
        const { DiscordTogether } = require("discord-together");
        const discordTogether = new DiscordTogether(DBA.client);

        if (message.member.voice.channel) {
            switch (info.main.value) {
                case "youtube":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "youtube").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "poker":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "poker").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "chess":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "chess").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "betrayal":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "betrayal").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "fishing":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "fishing").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "lettertile":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "lettertile").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "wordsnack":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "wordsnack").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "doodlecrew":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "doodlecrew").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "spellcast":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "spellcast").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
                case "awkword":
                    discordTogether.createTogetherCode(message.member.voice.channel.id, "awkword").then(async invite => {
                        var invitemsg = info.msg.value;
                        invitemsg = invitemsg.replace("%%invitecode%%", invite.code);
                        return message.channel.send(invitemsg);
                    });
                    break;
            }
        }
    },
};
