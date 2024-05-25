const { Client, GatewayIntentBits } = require("discord.js");
const { ask } = require("./ai");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("gpt")) {
        const url = message.content.split("gpt")[1];
        // const prompt = message.content.substring(1); //remove the exclamation mark from the message
        const answer = await ask(url);

        return message.reply({
            content: answer,
        });
    }
    console.log(message.content);
    message.react("👌");
    message.reply({
        content: "hello everyone i am himanshu bot made by ishan jatav",
        stickers: [
            "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
        ],
    });
});

client.on("interactionCreate", (interaction) => {
    console.log(interaction);
    interaction.reply("Pong!!");
});

client
    .login
    // "set token from discord developer portal"
    ();
