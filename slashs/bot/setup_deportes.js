import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_deportes")
        .setDescription("Envía el panel de deportes")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle("Deportes")
            .setDescription("Pulsa algún botón para poder hablar en tu canal de deporte favorito:\n⚽ Fútbol\n💪 Otros deportes")
            .setColor(0x0CFF00)
            .setFooter({ text: 'Team Galaxy' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("futbol").setLabel("⚽").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("deporte").setLabel("💪").setStyle(ButtonStyle.Primary)
        );

        await int.channel.send({ embeds: [embed], components: [row] });
        await int.editReply("✅ Panel de deportes enviado.");
    }
};
