module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Get Mentioned User",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["Miro#5410"],

    //Place the description of this mod here
    description: "Official Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Variable",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <h1>Test HTML</h1>
        <br><br>
        <label for="channel">Variable Name *</label><br>
        <input required class="input-field" name="varname"><br><br>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        const mention = message.mentions.members.first() || message.member;
        DBA.saveVariable(`${info.varname.value}.username`, mention.user.username);
        DBA.saveVariable(`${info.varname.value}.tag`, mention.user.tag);
        DBA.saveVariable(`${info.varname.value}.avatar`, mention.user.avatarURL({ dynamic: true }));
        DBA.saveVariable(`${info.varname.value}.id`, mention.user.id);

        console.log("Saved user: " + mention.user.username);
    },
};
