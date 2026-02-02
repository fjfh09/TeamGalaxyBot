import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";

const cooldowns = new Set();

export default {
    data: new SlashCommandBuilder()
        .setName("e_1")
        .setDescription("Un pequeño secreto..."),

    async run(client, int) {
        if (cooldowns.has(int.user.id)) {
            return int.reply({ content: "⏳ Debes esperar 20 segundos para volver a usar este secreto.", ephemeral: true });
        }

        cooldowns.add(int.user.id);
        setTimeout(() => cooldowns.delete(int.user.id), 20000);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("b1_secret")
                .setLabel("¡NO PULSES ESTE BOTÓN!")
                .setEmoji("🤬")
                .setStyle(ButtonStyle.Danger)
        );

        const embed = new EmbedBuilder()
            .setTitle("⚠️ Advertencia")
            .setDescription("Hay un botón abajo. No deberías pulsarlo.")
            .setColor("Fuchsia")
            .setFooter({ text: "Autodestrucción en 20 segundos..." });

        const msg = await int.reply({ embeds: [embed], components: [row], fetchReply: true });

        const collector = msg.createMessageComponentCollector({ 
            componentType: ComponentType.Button, 
            time: 20000,
            filter: i => i.user.id === int.user.id 
        });

        collector.on("collect", async (i) => {
            if (i.customId === "b1_secret") {
                const jokeEmbed = new EmbedBuilder()
                    .setTitle("😂😂😂")
                    .setDescription("¡Te lo advertí! (Broma)")
                    .setColor("Red");
                
                // Using deferUpdate to replace the message efficiently
                await i.update({ embeds: [jokeEmbed], components: [] });
                // Optional: delete after 5s
                setTimeout(() => int.deleteReply().catch(() => {}), 5000);
            }
        });

        collector.on('end', (_, reason) => {
            if (reason === 'time') {
                int.editReply({ content: "El botón ha desaparecido.", components: [] }).catch(() => {});
            }
        });
    }
};