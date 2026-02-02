import { Events, MessageFlags } from "discord.js";

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.slashcommands.get(interaction.commandName);
        if (!command) {
            console.warn(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.run(client, interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
            
            const errorMessage = { content: 'Hubo un error al ejecutar este comando!', flags: MessageFlags.Ephemeral };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }
};
