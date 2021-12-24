module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Button Listener",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Buttons",

    html: function (data) {
        return `
        <label>Button ID</label><br>
        <input class="input-field" id="buttonId" name="buttonId"><br>
        <a onclick="openVar('msg')" class="var-btn">INSERT VARIABLE</a><br><br>
        
        <label>Button Clickable by</label><br>
        <select class="input-field" name="type">
          <option value="author">Author only</option>
          <option value="author">Everyone</option>
        </select><br>
        <h5 style="color: grey">
        When the button is clicked, a function will be called
        </h5>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const msg = await message.channel.messages.fetch(message.id);

        const collector = createCollector(msg, i => i.user.id === message.author.id);

        collector.on("collect", async i => {
            if (i.customId === DBA.var(info.buttonId.value)) {
                DBA.saveVariable("author.username", i.user.username);
                DBA.saveVariable("author.id", i.user.id);
                DBA.saveVariable("author.tag", i.user.tag);
                DBA.saveVariable("author.avatar", i.user.avatarURL({ dynamic: true }));

                DBA.saveVariable("commandChannel.id", i.channel.id);
                DBA.saveVariable("commandChannel.name", i.channel.name);
                DBA.saveVariable("commandChannel.pos", i.channel.position);
                DBA.saveVariable("commandChannel.type", i.channel.type);

                DBA.saveVariable("guild.id", i.guild.id);
                DBA.saveVariable("guild.icon", i.guild.icon);
                DBA.saveVariable("guild.name", i.guild.name);
                DBA.saveVariable("guild.members", i.guild.memberCount);

                DBA.saveVariable("message.content", i.message.content);
                DBA.saveVariable("message.id", i.message.id);

                DBA.callButton(DBA.function.name, DBA.function.response.name);
            }
        });
    },
};

function createCollector(message, authorId, filter) {
    return message.channel.createMessageComponentCollector({ filter: filter, time: 6000000 });
}
