import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

const predictions = {}; // In-memory simplified storage for now. Persist to DB if needed but sufficient for fun.

export default {
    data: new SlashCommandBuilder()
        .setName("quiniela")
        .setDescription("Simula una apuesta de fútbol")
        .addStringOption(option =>
            option.setName("equipo")
                .setDescription("Tu equipo ganador (Local/Visitante/Empate)")
                .setRequired(true)
                .addChoices(
                    { name: 'Local', value: 'local' },
                    { name: 'Empate', value: 'empate' },
                    { name: 'Visitante', value: 'visitante' }
                )
        ),

    async run(client, int) {
        await int.deferReply();

        const prediction = int.options.getString("equipo");
        const matchUps = [
            "Real Madrid vs Barcelona",
            "Atlético vs Sevilla",
            "Betis vs Valencia",
            "Bilbao vs Real Sociedad"
        ];
        const match = matchUps[Math.floor(Math.random() * matchUps.length)];
        
        // Simulating a result after a short delay
        const outcomes = ['local', 'empate', 'visitante'];
        const result = outcomes[Math.floor(Math.random() * outcomes.length)];

        const embed = new EmbedBuilder()
            .setTitle(`⚽ ${match} - Resultado Final`)
            .addFields(
                { name: "Tu Predicción", value: prediction.toUpperCase(), inline: true },
                { name: "Resultado Real", value: result.toUpperCase(), inline: true }
            )
            .setColor(prediction === result ? "Green" : "Red");

        if (prediction === result) {
            embed.setDescription("🎉 ¡Acertaste! Eres un visionario del fútbol.");
        } else {
            embed.setDescription("❌ Fallaste. Mejor suerte la próxima vez.");
        }

        await int.editReply({ embeds: [embed] });
    }
};
