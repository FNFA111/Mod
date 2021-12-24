module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Add Member",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["Miro#5410"],

    //Place the description of this mod here
    description: "Official Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Threads",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label for="threadName">Channel id or name</label><br>
        <input class="input-field" name="channel"><br><br>

        <label for="threadName">Thread Name</label><br>
        <input class="input-field" name="threadName"><br><br>

        <label for="threadUser">Thread Member</label><br>
        <input class="input-field" name="threadUser"><br><br>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        const channel = message.guild.channels.cache.find(
            x => x.id === DBA.var(info.channel.value) || x.name === DBA.var(info.channel.value)
        );

        const thread = message.channel.threads.cache.find(x => x.name === DBA.var(info.threadName.value));
        thread.members.add(DBA.var(info.threadUser.value));
    },
};
