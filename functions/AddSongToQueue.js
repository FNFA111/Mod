module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Add Song To Queue",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Music",

    //Place the HTML to show inside of Discord Bot Agent
    html: function (data) {
        return `
        <label>Song to play</label><br>
        <input class="input-field" placeholder="YouTube Link" name="songToPlay">
        <a onclick="openVar('songToPlay')" class="var-btn">INSERT VARIABLE</a><br><br>
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBA) {},

    //Place the mod here
    execute: async function (DBA, info, message, args) {
        const music = require("@koenie06/discord.js-music");
        const channel = message.member.voice.channel;
        const song = DBA.var(info.songToPlay.value);

        music.play({
            interaction: message,
            channel: channel,
            song: song,
        });

        const events = music.event;
        events.on("playSong", async (channel, songInfo, requester) => {
            channel.send(`🎵 Now playing **${songInfo.title}**`);
        });

        events.on("addSong", async (channel, songInfo, requester) => {
            channel.send(`🎵 Addede **${songInfo.title}** to the queue`);
        });
    },
};
