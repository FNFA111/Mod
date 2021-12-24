module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Event Message",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    isEvent: true,

    //Set an event category so other mod creators can create custom mods for your event
    SetEventCategory: "boost",

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Message",

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: function (DBA, mods) {
        DBA.bot.on("guildMemberUpdate", (oldMember, newMember) => {
            const oldStatus = oldMember.premiumSince;
            const newStatus = newMember.premiumSince;

            if (!oldStatus && newStatus) {
                for (const mod in mods) {
                    const variables = DBA.modVars[mods[mod].name];
                    mods[mod].execute(DBA, variables, newMember);
                }
            }

            if (oldStatus && !newStatus) {
                client.channels.cache
                    .get("909633771886751786")
                    .send(`🚌 ${newMember.user.tag} Has cancelled the funding of the fuel`);
            }
        });
    },
};
