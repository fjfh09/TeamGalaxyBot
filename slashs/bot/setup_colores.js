import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_colores")
        .setDescription("Envía el panel de selección de colores")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        // Logic from comandos/colores.js
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("A.o").setLabel("🌀").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("A").setLabel("🔵").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("B").setLabel("⚪").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("A.a").setLabel("🟡").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("R.o").setLabel("🌸").setStyle(ButtonStyle.Secondary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("V").setLabel("🟢").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("M").setLabel("🟣").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("N.a").setLabel("🟠").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("V.o").setLabel("🐸").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("G").setLabel("🐘").setStyle(ButtonStyle.Secondary)
        );

        const row3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("R").setLabel("🔴").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("M.a").setLabel("🟤").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("N").setLabel("⚫").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("T").setLabel("🌊").setStyle(ButtonStyle.Secondary)
        );

        const embed = new EmbedBuilder()
            .setTitle("🎨 Selección de Colores")
            .setDescription("Pulsa uno de estos botones para asignarte el rol del color que quieras:\n" +
                "🌀 Azul Oscuro\n🔵 Azul\n⚪ Blanco\n🟡 Amarillo\n🌸 Rosa\n" +
                "🟢 Verde\n🟣 Morado\n🟠 Naranja\n🐸 Verde Oscuro\n🐘 Gris\n" +
                "🔴 Rojo\n🟤 Marrón\n⚫ Negro\n🌊 Turquesa")
            .setColor(0x00ffff)
            .setFooter({ text: 'Pulsa de nuevo para quitarte el rol.' });

        await int.channel.send({ embeds: [embed], components: [row1, row2, row3] });
        await int.editReply("✅ Panel de colores enviado.");
    }
};
