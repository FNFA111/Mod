module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Create Invite",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["Miro#5410"],

    //Place the description of this mod here
    description: "Official Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Channel",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label for="channel">Channel name or id</label><br>
        <input class="input-field" value="" name="channel"><br><br>

        <label for="amount">Invite Usages</label><br>
        <input class="input-field" value="" name="amount"><br><br>

        <label for="time">Invite Age </label><br>
        <input class="input-field" value="" name="time"><br><br>
        `;
    },
    startup: function (DBA) {},
    execute: function (DBA, info, message, args) {
        const channel = message.guild.channels.cache.find(
            x => x.id === DBA.var(info.channel.value) || x.name === DBA.var(info.channel.value)
        );
        const inv = channel.createInvite({
            maxAge: DBA.var(info.time.value),
            maxUses: DBA.var(info.amount.value),
        })(DBA.var(info.amount.value));
    },
};
