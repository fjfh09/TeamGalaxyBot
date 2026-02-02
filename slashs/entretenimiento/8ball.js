import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Haz una pregunta de sí o no")
        .addStringOption(option =>
            option.setName("pregunta")
                .setDescription("Tu pregunta")
                .setRequired(true)
        ),

    async run(client, int) {
        await int.deferReply();

        const pregunta = int.options.getString("pregunta");
        const respuestas = [
            "Sí.", "No.", "Probablemente sí.", "Probablemente no.", "Definitivamente.", 
            "¡Por supuesto!", "Ni lo sueñes.", "No cuentes con ello.", "Pregunta de nuevo tonto.", 
            "Mis fuentes dicen que no.", "Las señales apuntan a que sí."
        ];
        
        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setTitle("🎱 La Bola Mágica dice...")
            .addFields(
                { name: "❓ Pregunta", value: pregunta },
                { name: "💬 Respuesta", value: respuesta }
            )
            .setFooter({ text: `Solicitado por ${int.user.username}` });

        await int.editReply({ embeds: [embed] });
    }
};