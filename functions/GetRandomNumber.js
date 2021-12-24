module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Get Random Number",

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
        <label>Variable Name *</label><br>
        <input required class="input-field" name="varname"><br><br>

        <label>Minimum Number *</label><br>
        <input required class="input-field" name="min"><br><br>

        <label>Maximum Number *</label><br>
        <input required class="input-field" name="max"><br><br>
        `;
    },
    startup: function (DBA) {},
    execute: async function (DBA, info, message, args) {
        if (isNaN(info.min.value)) return false;
        if (isNaN(info.max.value)) return false;

        var rand =
            Math.floor(Math.random() * (parseInt(info.max.value) - parseInt(info.min.value) + 1)) + parseInt(info.min.value);

        DBA.saveVariable(info.varname.value, rand);
    },
};
