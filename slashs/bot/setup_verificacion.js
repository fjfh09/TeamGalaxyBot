import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_verificacion")
        .setDescription("Envía el panel de verificación")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle("✅ | Verificación")
            .setDescription("Dale click al botón de abajo para verificarte y acceder al servidor.")
            .setColor("Green")
            .setFooter({ text: 'Team Galaxy' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("verificate")
                .setLabel("Verifícate")
                .setEmoji("✅")
        );

        await int.channel.send({ embeds: [embed], components: [row] });
        await int.editReply("✅ Panel de verificación enviado.");
    }
};
