import { Events } from "discord.js";

const prefix = process.env.PREFIX || "tg!";

export default {
    name: Events.MessageCreate,
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const cmd = client.commands.get(commandName) || client.commands.find(c => c.alias && c.alias.includes(commandName));

        if (cmd) {
            try {
                await cmd.execute(client, message, args);
            } catch (err) {
                console.error(`Error executing command ${commandName}:`, err);
                message.channel.send("Hubo un error al ejecutar este comando.");
            }
        }
    }
};
