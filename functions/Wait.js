module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Wait",

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
        <label>Seconds to wait *</label><br>
        <input class="input-field" id="amount" name="amount">
        <a onclick="openVar('user')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const secondsVariabled = DBA.var(info.amount.value);

        await DBA.pause(parseInt(secondsVariabled));
    },
};
