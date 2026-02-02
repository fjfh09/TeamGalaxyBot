import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";
import { brawlService } from "../../Services/BrawlStarsService.js";
import { TrophyBox } from 'brawl-api-wrapper';
import fs from 'fs';
import path from 'path';

// Load Brawlers JSON once at top level
const brawlerData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Brawl/brawlers.json'), 'utf8'));

export default {
    data: new SlashCommandBuilder()
        .setName("perfil")
        .setDescription("Te enseño tu perfil o de alguien de Brawl Stars")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Selecciona un usuario")
                .setRequired(false)
        ),

    async run(client, int) {
        await int.deferReply();

        try {
            const user = int.options.getUser("usuario") || int.user;

            // Get user from DB
            const fila = await dbService.bot.get(`SELECT * FROM usuariosbrawl WHERE id = ?`, [user.id]);

            if (!fila) {
                const embedNoProfile = new EmbedBuilder()
                    .setThumbnail(int.guild.iconURL({ dynamic: true }))
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0xFFFB00)
                    .setTitle(`${user.username} no tiene ningún perfil creado`)
                    .setDescription(`Para crear un perfil debe utilizar el comando \`/crear_perfil_bs\``)
                    .setFooter({ text: `Solicitado por: ${int.member.displayName}` });
                return int.editReply({ embeds: [embedNoProfile] });
            }

            const bs_id = fila.tag;
            const jugador = await brawlService.getPlayer(bs_id);
            const brawlers = jugador.brawlers;
            const reset = jugador.getSeasonReset();

            const tipos = {
                [TrophyBox.SmallBox]: "Caja pequeña",
                [TrophyBox.BigBox]: "Caja grande",
                [TrophyBox.MegaBox]: "Caja mega",
                [TrophyBox.OmegaBox]: "Caja omega",
                [TrophyBox.UltraBox]: "Caja ultra"
            };

            const tipoBox = tipos[reset.trophyBox] ?? "Caja desconocida";

            // --- Stats Processing ---
            function normalizarNombre(nombre) {
                // Common normalizations
                const n = nombre.toUpperCase();
                if (n === "MR. P") return "MRP";
                if (n === "R-T") return "RT";
                if (n === "LARRY & LAWRIE") return "LARRY_LAWRIE";
                if (n === "8-BIT") return "8BIT";
                if (n === "EL PRIMO") return "ELPRIMO";
                return nombre;
            }

            // Using filter logic efficiently
            const qualities = ["Legendario", "Mítico", "Épico", "Superespecial", "Especial", "Inicial"];
            const qualityStats = {};

            // Pre-process brawlers map for O(1) lookup potentially, but iterating once is fine because list is small (<100)
            // Actually, we iterate multiple times in correct order so:
            
            for (const quality of qualities) {
                const filtered = brawlers.filter(b => {
                    const norm = normalizarNombre(b.name);
                    return brawlerData[norm] && brawlerData[norm].calidad === quality;
                });

                const totalInGame = Object.values(brawlerData).filter(b => b.calidad === quality).length;
                
                const formatted = filtered.map(b => {
                    const norm = normalizarNombre(b.name);
                    const power = b.power.toString().padStart(2, '0');
                    return `<:${norm}:${brawlerData[norm]?.emoji_id ?? '❓'}>\`${power}\``;
                }).join(' ') || 'N/A';

                qualityStats[quality] = {
                    count: filtered.length,
                    total: totalInGame,
                    formatted: formatted
                };
            }

            const embedProfile = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy' })
                .setColor(0xFFFB00)
                .setTitle(`${jugador.name} | ${jugador.tag}`)
                .setURL(`https://brawlify.com/stats/profile/${(jugador.tag).substring(1)}`)
                .setFooter({ text: `Solicitado por: ${int.member.displayName}` })
                .addFields(
                    { name: "Trofeos", value: `\`${jugador.trophies.toLocaleString('es-ES')} 🏆\``, inline: true },
                    { name: "Máximo de Trofeos", value: `\`${jugador.highestTrophies.toLocaleString('es-ES')} 🏆\``, inline: true },
                    { name: "Nivel", value: `<:XP:1264958241524154388> **\`${jugador.level}\`**`, inline: true },
                    { name: "Club", value: jugador.club ? `<:Club:1264958203611971677> ${jugador.club.name} \`${jugador.club.tag}\`` : 'Sin Club', inline: true },
                    { name: "Victorias Solo", value: `<:Solo:1264958228526006423> ${jugador.soloVictories.toLocaleString('es-ES')}`, inline: true },
                    { name: "Victorias Dúo", value: `<:Duo:1264958214756237384> ${jugador.duoVictories.toLocaleString('es-ES')}`, inline: true },
                    { name: "Victorias 3v3", value: `<:3v3:1264958180501356595> ${jugador["3vs3Victories"].toLocaleString('es-ES')}`, inline: true },
                    { name: "Recompensa Temp.", value: `📦 \`${tipoBox}\``, inline: true },
                    { name: "Reseteo Temp.", value: `Trofeos: \`${reset.remainingTrophies.toLocaleString('es-ES')}\` (\`-${(jugador.trophies - reset.remainingTrophies).toLocaleString('es-ES')}\`) 🏆`, inline: true },
                    
                    // Add Brawler Fields
                    ...qualities.map(q => ({
                        name: `${q} (${qualityStats[q].count}/${qualityStats[q].total})`,
                        value: qualityStats[q].formatted,
                        inline: false
                    }))
                );

            await int.editReply({ embeds: [embedProfile] });

        } catch (error) {
            console.error("Error in perfil_bs:", error);
            
            let errorMsg = "Ocurrió un error inesperado al obtener el perfil.";
            if (error.status === 404) errorMsg = "El jugador no fue encontrado en Brawl Stars.";
            if (error.status === 503) errorMsg = "La API de Brawl Stars está en mantenimiento.";

            const embedError = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy' })
                .setColor(0xFF0000)
                .setDescription(`:bangbang: **${errorMsg}**`)
                .setFooter({ text: `Solicitado por: ${int.member.displayName}` });

            await int.editReply({ embeds: [embedError] });
        }
    }
};
