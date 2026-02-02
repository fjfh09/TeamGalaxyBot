import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_notificaciones")
        .setDescription("Envía el panel de notificaciones")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle("Notificaciones")
            .setDescription("Pulsa este botón 🔔 para notificarte de las encuestas, streams y tweets")
            .setColor(0xE8FF00)
            .setFooter({ text: 'Team Galaxy' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("notificacion")
                .setLabel("🔔")
                .setStyle(ButtonStyle.Danger)
        );

        await int.channel.send({ embeds: [embed], components: [row] });
        await int.editReply("✅ Panel de notificaciones enviado.");
    }
};
