module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Check User Permissions",

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
        <input class="input-field" id="permissionUserId2" name="permissionUserId"><br>
        <a onclick="openVar('permissionUserId2')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Permission to check*</label><br>
        <h5 style="color: grey">to select multiple hold CTRL/CMD and select</h5><br>
        <select class="input-field" name="permissions">
            <option value="1">KICK_MEMBERS</option>
            <option value="2">BAN_MEMBERS</option>
            <option value="3">ADMINISTRATOR</option>
            <option value="4">MANAGE_CHANNELS</option>
            <option value="5">MANAGE_GUILD</option>
            <option value="6">ADD_REACTIONS</option>
            <option value="7">EMBED_LINKS</option>
            <option value="8">ATTACH_FILES</option>
            <option value="9">USE_EXTERNAL_EMOJIS</option>
            <option value="10">CHANGE_NICKNAME</option>
            <option value="11">MANAGE_NICKNAMES</option>
            <option value="12">MANAGE_ROLES</option>
        </select>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const Discord = require("discord.js");
        const permission = parseInt(info.permissions.value) - 1;

        const permissions = {
            KICK_MEMBERS: Discord.Permissions.FLAGS.KICK_MEMBERS,
            BAN_MEMBERSS: Discord.Permissions.FLAGS.BAN_MEMBERS,
            ADMINISTRATOR: Discord.Permissions.FLAGS.ADMINISTRATOR,
            MANAGE_CHANNELS: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
            MANAGE_GUILD: Discord.Permissions.FLAGS.MANAGE_GUILD,
            ADD_REACTIONS: Discord.Permissions.FLAGS.ADD_REACTIONS,
            EMBED_LINKS: Discord.Permissions.FLAGS.EMBED_LINKS,
            ATTACH_FILES: Discord.Permissions.FLAGS.ATTACH_FILES,
            USE_EXTERNAL_EMOJIS: Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
            CHANGE_NICKNAME: Discord.Permissions.FLAGS.CHANGE_NICKNAME,
            MANAGE_NICKNAMES: Discord.Permissions.FLAGS.MANAGE_NICKNAMES,
            MANAGE_ROLES: Discord.Permissions.FLAGS.MANAGE_ROLES,
        };
        const userID = DBA.var(info.permissionUserId.value);
        const member = message.guild.members.cache.find(x => x.id === userID);

        if (member.permissions.has(permissions[permission])) {
            DBA.callFalse(DBA.function.name, DBA.function.response.name);
        }
    },
};
