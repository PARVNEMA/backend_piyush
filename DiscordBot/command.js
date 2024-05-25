const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
];

const rest = new REST({ version: "10" })
    .setToken
    // "set token from discord developer portal"
    ();

try {
    console.log("Started refreshing application (/) commands.");

    rest.put(Routes.applicationCommands("1239902914668007586"), {
        body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
} catch (error) {
    console.error(error);
}
