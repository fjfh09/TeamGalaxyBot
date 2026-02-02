import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_clubes")
        .setDescription("Envía el panel de selección de clubes Brawl Stars")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle("Tu Club")
            .setDescription("Pulsa uno de estos botones para asignarte el rol del club de Brawl Stars al que perteneces:\n\n1️⃣ **MysticGalaxy**\n\n2️⃣ **MysticGalaxyII**\n\n3️⃣ **MysticGalaxyIII**\n\n4️⃣ **MysticGalaxyIV**\n\n5️⃣ **MysticGalaxyV**\n\n6️⃣ **MysticGalaxyVI**\n\n7️⃣ **MysticGalaxyVII**\n\n0️⃣ **No perteneces a ninguno**")
            .setColor(0x00ffff)
            .setFooter({ text: 'Team Galaxy' });

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("1c").setLabel("1️⃣").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("2c").setLabel("2️⃣").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("3c").setLabel("3️⃣").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("4c").setLabel("4️⃣").setStyle(ButtonStyle.Secondary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("5c").setLabel("5️⃣").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("6c").setLabel("6️⃣").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("7c").setLabel("7️⃣").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("0c").setLabel("0️⃣").setStyle(ButtonStyle.Secondary)
        );

        await int.channel.send({ embeds: [embed], components: [row1, row2] });
        await int.editReply("✅ Panel de clubes enviado.");
    }
};
