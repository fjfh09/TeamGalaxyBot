import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("Muestra el tiempo que el bot lleva encendido"),

    async run(client, int) {
        const totalSeconds = (process.uptime());
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds % 60);

        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        const embed = new EmbedBuilder()
            .setTitle("⏳ Tiempo de Actividad")
            .setDescription(`El bot lleva encendido:\n**${uptimeString}**`)
            .setColor("Blue")
            .setTimestamp();

        await int.reply({ embeds: [embed] });
    }
};
