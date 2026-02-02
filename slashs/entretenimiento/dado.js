import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("dado")
        .setDescription("Tira un dado de 6 caras"),

    async run(client, int) {
        const result = Math.floor(Math.random() * 6) + 1;
        
        const embed = new EmbedBuilder()
            .setTitle("🎲 Lanzamiento de Dado")
            .setDescription(`El dado ha caído en: **${result}**`)
            .setColor("Random");

        await int.reply({ embeds: [embed] });
    }
};
