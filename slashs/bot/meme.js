import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import memes from "memes.spain";

export default {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Muestra un meme aleatorio en español"),

    async run(client, int) {
        await int.deferReply();

        try {
            const memeUrl = memes.Memes();

            const embed = new EmbedBuilder()
                .setTitle("🤣 Meme")
                .setColor("Random")
                .setImage(memeUrl)
                .setFooter({ text: `Solicitado por ${int.user.username}` })
                .setTimestamp();

            await int.editReply({ embeds: [embed] });
        } catch (e) {
            console.error(e);
            await int.editReply("❌ No pude encontrar un meme. ¡Inténtalo de nuevo!");
        }
    }
};