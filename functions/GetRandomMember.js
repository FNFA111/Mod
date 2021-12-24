module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Get Random Member",

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
        <label>Variable name *</label><br>
        <input class="input-field" id="randomMember" name="randomMember"><br><br>
        <h5 style="color: grey">
            Variable usage:<br>
            \${var.varname.id}<br>
            \${var.varname.username}<br>
            \${var.varname.tag}<br>
            \${var.varname.avatar}<br>
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        let members = [];
        await message.guild.members.cache.forEach(member => {
            members.push({
                user: {
                    id: member.user.id,
                    username: member.user.username,
                    tag: member.user.tag,
                    avatar: member.user.avatarURL({ dynamic: true }),
                },
            });
        });

        const ranndomMember = members[Math.floor(Math.random() * members.length)];

        DBA.saveVariable(`${info.randomMember.value}.id`, ranndomMember.user.id);
        DBA.saveVariable(`${info.randomMember.value}.username`, ranndomMember.user.username);
        DBA.saveVariable(`${info.randomMember.value}.tag`, ranndomMember.user.tag);
        DBA.saveVariable(`${info.randomMember.value}.avatar`, ranndomMember.user.avatar);
    },
};
