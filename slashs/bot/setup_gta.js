import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_gta")
        .setDescription("Envía el panel de GTA")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle("Grand Theft Auto")
            .setDescription("Pulsa este botón 🚓 para poder chatear con gente del servidor sobre GTAV online o la saga.")
            .setColor(0xa80000)
            .setFooter({ text: 'Team Galaxy' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("gta")
                .setLabel("🚓")
                .setStyle(ButtonStyle.Danger)
        );

        await int.channel.send({ embeds: [embed], components: [row] });
        await int.editReply("✅ Panel de GTA enviado.");
    }
};
