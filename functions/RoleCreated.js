module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Role Created",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "roleCreate",

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Events",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Function name to call after message was edited *</label><br>
        <input class="input-field" name="functionName3">
        <a onclick="openVar('functionName')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" name="roleVarCreate"><br><br>

        <h5 style="color: grey">
        Role variables: <br>
        \${var.variablename.id}<br>
        \${var.variablename.name}<br>
        \${var.variablename.color}<br>
        \${var.variablename.icon}<br>
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, variables, role) {
        DBA.saveVariable(`${variables.roleVarCreate.value}.id`, role.id);
        DBA.saveVariable(`${variables.roleVarCreate.value}.name`, role.name);
        DBA.saveVariable(`${variables.roleVarCreate.value}.color`, role.color);
        DBA.saveVariable(`${variables.roleVarCreate.value}.icon`, role.icon);

        DBA.callFunction(DBA.var(variables.functionName3.value), role);
    },
};
