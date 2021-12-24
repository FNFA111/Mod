module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Change Nickname",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "User Action",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>User ID *</label><br>
        <input class="input-field" id="user" name="user">
        <a onclick="openVar('user')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Change nickname to *</label><br>
        <input class="input-field" id="nickname" name="nickname">
        <a onclick="openVar('user')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const userVariabled = DBA.var(info.user.value);
        const user = await message.guild.members.cache.find(member => member.id === userVariabled);

        if (!user) return console.log("Couldn't find the user " + userVariabled);

        user.setNickname(DBA.var(info.nickname.value));
    },
};
