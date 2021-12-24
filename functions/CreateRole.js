module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Create Role",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Server Action",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Role name *</label><br>
        <input class="input-field" id="name" name="name">
        <a onclick="openVar('name')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Role color *</label><br>
        <input type="color" class="input-field" id="color" name="color">

        <label>Role position (must be a number)*</label><br>
        <input class="input-field" id="position" name="position">
        <a onclick="openVar('position')" class="var-btn">INSERT VARIABLE</a><br>
        <h5 style="color: grey">
            Position "1" is the highest position in hirerarchy
            Position "your servers role amount" is the lowest position in hirerarchy
        </h5>

        <label>Hoist Role *</label><br>
        <select class="input-field" name="hoist">
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
        </select>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        message.guild.roles.create({
            name: DBA.var(info.name.value),
            color: DBA.var(info.color.value),
            hoist: JSON.parse(info.hoist.value),
            position: parseInt(DBA.var(info.position.value)),
        });
    },
};
