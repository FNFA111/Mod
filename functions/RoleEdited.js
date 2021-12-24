module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Role Edited",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEventMod: true,

    //The event category that this mod will be executed in, IT MUST BE THE SAME AS THE EVENTS "SetCategory:"" KEY!
    EventCategory: "roleUpdate",

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
        <input class="input-field" name="functionName1">
        <a onclick="openVar('functionName')" class="var-btn">INSERT VARIABLE</a><br><br>

        <label>Variable Name *</label><br>
        <input class="input-field" name="roleVar"><br><br>

        <h5 style="color: grey">
        Role variables: <br>
        \${var.variablenameOld.id}<br>
        \${var.variablenameOld.name}<br>
        \${var.variablenameOld.color}<br>
        \${var.variablenameOld.icon}<br><br>
        \${var.variablenameNew.id}<br>
        \${var.variablenameNew.name}<br>
        \${var.variablenameNew.color}<br>
        \${var.variablenameNew.icon}<br><br>
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, variables, oldRole, newRole) {
        DBA.saveVariable(`${variables.roleVar.value}Old.id`, oldRole.id);
        DBA.saveVariable(`${variables.roleVar.value}Old.name`, oldRole.name);
        DBA.saveVariable(`${variables.roleVar.value}Old.color`, oldRole.color);
        DBA.saveVariable(`${variables.roleVar.value}Old.icon`, oldRole.icon);

        DBA.saveVariable(`${variables.roleVar.value}New.id`, newRole.id);
        DBA.saveVariable(`${variables.roleVar.value}New.name`, newRole.name);
        DBA.saveVariable(`${variables.roleVar.value}New.color`, newRole.color);
        DBA.saveVariable(`${variables.roleVar.value}New.icon`, newRole.icon);

        DBA.callFunction(DBA.var(variables.functionName1.value), oldRole);
    },
};
