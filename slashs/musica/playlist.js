import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

const playlists = {
    fiesta: "https://open.spotify.com/playlist/37i9dQZF1DX1lVhptIYR7u",
    relax: "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u",
    gaming: "https://open.spotify.com/playlist/37i9dQZF1DWTyiBJ6yEqeu",
    gym: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP"
};

export default {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Recomendaciones de música por estado de ánimo")
        .addStringOption(option =>
            option.setName("tipo")
                .setDescription("El tipo de playlist que buscas")
                .setRequired(true)
                .addChoices(
                    { name: 'Fiesta 🎉', value: 'fiesta' },
                    { name: 'Relax ☕', value: 'relax' },
                    { name: 'Gaming 🎮', value: 'gaming' },
                    { name: 'Gym 💪', value: 'gym' }
                )
        ),

    async run(client, int) {
        const type = int.options.getString("tipo");
        const url = playlists[type];

        const embed = new EmbedBuilder()
            .setTitle(`🎧 Playlist Recomendada: ${type.toUpperCase()}`)
            .setDescription(`Aquí tienes tu playlist:\n[Abrir en Spotify](${url})`)
            .setColor(0x1DB954) // Spotify Green
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png");

        await int.reply({ embeds: [embed] });
    }
};
