import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ver_futbol")
        .setDescription("Enlace para ver partidos de fútbol"),

    async run(client, int) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Ver Fútbol")
                .setURL("https://www.rojadirectatvenvivo.com/")
                .setStyle(ButtonStyle.Link)
        );

        const embed = new EmbedBuilder()
            .setTitle("⚽ Fútbol en Vivo")
            .setDescription(`Haz clic en el botón para ver partidos gratis.`)
            .setColor(0x0A69CF)
            .setFooter({ text: `Solicitado por ${int.user.username}` })
            .setTimestamp();

        await int.reply({ embeds: [embed], components: [row] });
    }
};