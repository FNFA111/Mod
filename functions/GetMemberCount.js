module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Get Member Count",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Variable",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Guild ID *</label><br>
        <input class="input-field" id="guildId" name="guildId">
        <a onclick="openVar('guildId')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable name *</label><br>
        <input class="input-field" id="variable" name="variable">
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const guild = DBA.bot.guilds.cache.get(DBA.var(info.guildId.value));

        if (!guild) return console.log("Couldn't find the guild " + DBA.var(info.guildId.value));

        const member_count = guild.members.filter(member => !member.user.bot).size;
        DBA.saveVariable(info.variable.value, member_count);
    },
};
