module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Role Deleted",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "roleDelete",

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
        <input class="input-field" name="functionName2">
        <a onclick="openVar('functionName')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" name="roleVarDel"><br><br>

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
    execute: function (DBA, variables, oldRole, newRole) {
        DBA.saveVariable(`${variables.roleVarDel.value}.id`, oldRole.id);
        DBA.saveVariable(`${variables.roleVarDel.value}.name`, oldRole.name);
        DBA.saveVariable(`${variables.roleVarDel.value}.color`, oldRole.color);
        DBA.saveVariable(`${variables.roleVarDel.value}.icon`, oldRole.icon);

        DBA.callFunction(DBA.var(variables.functionName2.value), oldRole);
    },
};
