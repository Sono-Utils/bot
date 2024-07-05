require("dotenv").config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Define your commands
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    // Add more commands here
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', async () => {
    console.log('Bot is online!');
    
    try {
        console.log('Started refreshing application (/) commands.');

        // Dynamically get the clientId after the bot logs in
        const clientId = client.user.id;

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    // Add more command handlers here
});

client.login(token);