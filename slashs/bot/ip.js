import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags } from "discord.js";
import axios from "axios";

export default {
    data: new SlashCommandBuilder()
        .setName("ip")
        .setDescription("Obtienes la ip del bot (Admin Only)"),

    async run(client, int) {
        // ID Restriction Check
        if (int.user.id !== "739203308991807518") {
            return int.reply({ content: "No tienes permisos para usar este comando.", flags: MessageFlags.Ephemeral });
        }

        await int.deferReply({ flags: MessageFlags.Ephemeral });

        try {
            const response = await axios.get(`https://api.ipify.org?format=json`);
            const ip = response.data.ip;

            const embed = new EmbedBuilder()
                .setTitle(`Dirección IP Pública`)
                .setDescription(`\`${ip}\``)
                .setFooter({ text: "Información Confidencial" })
                .setColor(0xFF0000);

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("Error al obtener la IP.");
        }
    }
};