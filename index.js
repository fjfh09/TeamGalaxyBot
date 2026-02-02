import "dotenv/config";
import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import { loadEvents } from "./Handlers/eventHandler.js";
import { loadSlashCommands } from "./Handlers/slashHandler.js";
import { loadCommands } from "./Handlers/commandHandler.js";

const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildPresences, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

// --- CONFIGURATION ---
const token = process.env.TOKEN;

if (!token) {
    console.error("CRITICAL: Token not found in .env");
    process.exit(1);
}

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildPresences, GuildVoiceStates],
    partials: [User, Message, GuildMember, ThreadMember, Partials.GuildMembers],
});

client.events = new Collection();
client.commands = new Collection();
client.slashcommands = new Collection();

// --- INITIALIZATION ---
async function init() {
    try {
        await loadEvents(client);
        await loadSlashCommands(client);
        await loadCommands(client);
        
        await client.login(token);
    } catch (error) {
        console.error("Error during initialization:", error);
        process.exit(1);
    }
}

// --- ERROR HANDLING ---
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

init();