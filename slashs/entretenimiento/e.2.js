import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } from "discord.js";

const cooldowns = new Set();

export default {
    data: new SlashCommandBuilder()
        .setName("e_2")
        .setDescription("Un pequeño selector... secreto."),

    async run(client, int) {
        if (cooldowns.has(int.user.id)) {
            return int.reply({ content: "⏳ Espera 20 segundos.", ephemeral: true });
        }
        cooldowns.add(int.user.id);
        setTimeout(() => cooldowns.delete(int.user.id), 20000);

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("menu_prueba")
                .setPlaceholder('Elige una opción...')
                .addOptions([
                    { label: "Opción A", description: "¿Lo eres?", value: "a", emoji: "👄" },
                    { label: "Opción B", description: "¿En serio?", value: "b", emoji: "🐺" },
                    { label: "Ambas", description: "¿Qué dices?", value: "ab", emoji: "🥵" }
                ])
        );

        const embed = new EmbedBuilder()
            .setTitle("Elige tu destino")
            .setColor(0xFF00E0)
            .setFooter({ text: "Expira en 20s" });

        const msg = await int.reply({ embeds: [embed], components: [row], fetchReply: true });

        const collector = msg.createMessageComponentCollector({ 
            componentType: ComponentType.StringSelect, 
            time: 20000, 
            filter: i => i.user.id === int.user.id 
        });

        collector.on("collect", async (i) => {
            await i.deferUpdate();
            let title = "";
            let color = "Purple";

            switch(i.values[0]) {
                case "a": title = "¿Ostias?"; break;
                case "b": title = "¡Lo sabía!"; break;
                case "ab": title = "No me lo esperaba 😂"; break;
            }

            const responseEmbed = new EmbedBuilder()
                .setTitle(title)
                .setColor(color);

            await i.editReply({ embeds: [responseEmbed], components: [] });
            setTimeout(() => int.deleteReply().catch(() => {}), 5000);
        });
    }
};