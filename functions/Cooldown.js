module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Set Cooldown",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Control",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>User ID *</label><br>
        <input class="input-field" id="user" name="user">
        <a onclick="openVar('user')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Cooldown Amount (in seconds)*</label><br>
        <input class="input-field" id="cooldown" name="cooldown">
        <a onclick="openVar('user')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Cooldown Expire Message *</label><br>
        <input class="input-field" id="message" name="message">
        <a onclick="openVar('user')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const userVariabled = DBA.var(info.user.value);
        const user = await message.guild.members.cache.find(member => member.id === userVariabled);
        const secondsVariabled = DBA.var(info.cooldown.value);

        if (!user) return console.log("Couldn't find the user " + userVariabled);

        DBA.cooldown(secondsVariabled, user.user.id, DBA.var(info.message.value));
    },
};
