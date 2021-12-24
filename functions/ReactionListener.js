module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Reaction Listener",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Reaction",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Message ID *</label><br>
        <input class="input-field" name="reactionMsg">
        <a onclick="openVar('reactionMsg')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Channel id or name *</label><br>
        <input class="input-field" name="reactionChannel">
        <a onclick="openVar('reactionChannel')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Emoji (unicode or emoji id) *</label><br>
        <input class="input-field" name="reactionEmoji">
        <a onclick="openVar('reactionEmoji')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Function name to call *</label><br>
        <input class="input-field" name="reactionFunction">
        <a onclick="openVar('reactionFunction')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Store reacted emoji in variable name *</label><br>
        <input class="input-field" name="emojiVarName">

        <label>Store user in variable name *</label><br>
        <input class="input-field" name="reactUserVar"><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const channel = message.guild.channels.cache.find(
            x => x.name === DBA.var(info.reactionChannel.value) || x.id === DBA.var(info.reactionChannel.value)
        );

        const msg = await channel.messages.fetch(DBA.var(info.reactionMsg.value));
        msg.react(DBA.var(info.reactionEmoji.value));

        const emoteRegex = /<:.+:(\d+)>/gm;
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm;

        const emote = emoteRegex.exec(DBA.var(info.reactionEmoji.value));
        const animated = animatedEmoteRegex.exec(DBA.var(info.reactionEmoji.value));

        DBA.bot.on("messageReactionAdd", (reaction, user) => {
            if (reaction.message.id !== msg.id) return;
            if (user.bot) return;

            console.log(reaction.emoji.id);
            console.log(animated[1]);

            if (user.id !== DBA.var(info.reactionUserId.value)) return;

            DBA.saveVariable(`${DBA.var(info.reactUserVar.value)}.username`, user.username);
            DBA.saveVariable(`${DBA.var(info.reactUserVar.value)}.id`, user.id);
            DBA.saveVariable(`${DBA.var(info.reactUserVar.value)}.tag`, user.tag);
            DBA.saveVariable(`${DBA.var(info.reactUserVar.value)}.avatar`, user.avatarURL({ dynamic: true }));

            DBA.saveVariable(`${DBA.var(info.emojiVarName.value)}.id`, emojiCreate.id);
            DBA.saveVariable(`${DBA.var(info.emojiVarName.value)}.name`, emojiCreate.name);
            DBA.saveVariable(`${DBA.var(info.emojiVarName.value)}.url`, emojiCreate.url);

            if (emote !== null) {
                if (reaction.emoji.id === emote[1]) {
                    DBA.callFunction(DBA.var(info.reactionFunction.value), reaction.message);
                }
            } else if (animated !== null) {
                if (reaction.emoji.id === animated[1]) {
                    DBA.callFunction(DBA.var(info.reactionFunction.value), reaction.message);
                }
            } else {
                if (reaction.emoji.name === DBA.var(info.reactionEmoji.value)) {
                    DBA.callFunction(DBA.var(info.reactionFunction.value), reaction.message);
                }
            }
        });
    },
};
