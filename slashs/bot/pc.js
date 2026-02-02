import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags } from "discord.js";
import os from "os";
import pidusage from "pidusage";

export default {
    data: new SlashCommandBuilder()
        .setName("pc")
        .setDescription("Obtienes la información del servidor"),

    async run(client, int) {
        if (int.user.id !== "739203308991807518") {
            return int.reply({ content: "No tienes permisos para usar este comando.", flags: MessageFlags.Ephemeral });
        }

        await int.deferReply({ flags: MessageFlags.Ephemeral });

        pidusage(process.pid, async (err, stats) => {
            if (err) {
                console.error('Error al obtener uso de CPU:', err);
                return int.editReply("Error al obtener estadísticas.");
            }

            const totalMemory = os.totalmem() / 1024 / 1024;
            const freeMemory = os.freemem() / 1024 / 1024;
            const usedMemory = totalMemory - freeMemory;
            const platform = os.platform();
            const uptime = os.uptime() / 3600;

            const embed = new EmbedBuilder()
                .setTitle(`Rendimiento del Sistema`)
                .addFields(
                    { name: "CPU Uso", value: `${stats.cpu.toFixed(2)}%`, inline: true },
                    { name: "RAM", value: `${usedMemory.toFixed(0)}MB / ${totalMemory.toFixed(0)}MB`, inline: true },
                    { name: "Plataforma", value: `${platform}`, inline: true },
                    { name: "Uptime (Sistema)", value: `${uptime.toFixed(2)} hrs`, inline: true }
                )
                .setFooter({ text: "Monitor de Sistema" })
                .setColor(0xFF0000);

            await int.editReply({ embeds: [embed] });
        });
    }
};