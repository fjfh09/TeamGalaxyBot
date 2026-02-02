import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_equipos")
        .setDescription("Envía el panel de equipos de fútbol")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle("Equipos")
            .setDescription("Pulsa algún botón para recibir rol de tu equipo favorito:\n🤍 Real Madrid\n💙 Espanyol\n💚 Betis\n🧡 Valencia\n🏡 Villareal\n🔴 Barça\n💣 Granada\n💃 Sevilla\n💧 Celta\n🌅 Levante\n🏃‍♂️ Atlético de Madrid\n🏐 Real Sociedad\n👋 Bilbao\n🐻 Osasuna\n⚡ Rayo Vallecano")
            .setColor(0x0064FF)
            .setFooter({ text: 'Team Galaxy' });

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("madrid").setLabel("🤍").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("espanyol").setLabel("💙").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("betis").setLabel("💚").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("valencia").setLabel("🧡").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("villareal").setLabel("🏡").setStyle(ButtonStyle.Secondary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("barsa").setLabel("🔴").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("granada").setLabel("💣").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("sevilla").setLabel("💃").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("celta").setLabel("💧").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("levante").setLabel("🌅").setStyle(ButtonStyle.Secondary)
        );

        const row3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("Atl.madrid").setLabel("🏃‍♂️").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("r.sociedad").setLabel("🏐").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("bilbao").setLabel("👋").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("osasuna").setLabel("🐻").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("rayo").setLabel("⚡").setStyle(ButtonStyle.Secondary)
        );

        await int.channel.send({ embeds: [embed], components: [row1, row2, row3] });
        await int.editReply("✅ Panel de equipos enviado.");
    }
};
