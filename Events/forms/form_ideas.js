import { EmbedBuilder, MessageFlags } from 'discord.js';
import { dbService } from '../../Services/DatabaseService.js';

export default {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId !== 'ideas') return;

        const id = interaction.user.id;
        const quieneres = interaction.fields.getTextInputValue('quieneres');
        const erroresbot = interaction.fields.getTextInputValue('erroresbot');
        const comandosbot = interaction.fields.getTextInputValue('comandosbot');
        const server = interaction.fields.getTextInputValue('server');

        try {
            await dbService.bot.run(
                `INSERT INTO formularioideas(id, nombre, errores, comandos, server) VALUES(?, ?, ?, ?, ?)`, 
                [id, quieneres, erroresbot, comandosbot, server]
            );

            const embed = new EmbedBuilder()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTitle(`¡Gracias por tu feedback!`)
                .setColor("Random")
                .setFooter({ text: 'Team Galaxy' })
                .setTimestamp()
                .setDescription(`Tus respuestas:\n\n**Eres:** ${quieneres}\n**Errores:** ${erroresbot}\n**Ideas Bot:** ${comandosbot}\n**Ideas Server:** ${server}`);

            await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });

        } catch (error) {
            console.error("Error inserting form data:", error);
            await interaction.reply({ content: "Error al guardar tu formulario.", flags: MessageFlags.Ephemeral });
        }
    }
};
