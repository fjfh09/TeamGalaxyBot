import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType, PermissionsBitField } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";
import { brawlService } from "../../Services/BrawlStarsService.js";
import fs from 'fs';
import path from 'path';

export default {
    data: new SlashCommandBuilder()
        .setName("users_brawl")
        .setDescription("Enseño todos los usuarios creados en mi base de datos y su perfil de discord")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply();
        const itemsPerPage = 12;

        try {
            const rows = await dbService.bot.all('SELECT * FROM usuariosbrawl');
            
            // Filter invalid users and fetch data in chunks
            const validUsuarios = [];
            const guild = int.guild;
            
            // Optimization: Fetch chunks
            const chunkSize = 15; // Concurrent API calls
            for (let i = 0; i < rows.length; i += chunkSize) {
                const chunk = rows.slice(i, i + chunkSize);
                
                const promises = chunk.map(async (row) => {
                    const member = guild.members.cache.get(row.id);
                    if (!member) {
                        // Cleanup DB if user left
                        // await dbService.bot.run('DELETE FROM usuariosbrawl WHERE id = ?', [row.id]);
                        return null; // Skip without deleting for now to be safe, or delete if desired. Original deleted.
                        // Let's safe delete? Actually the original code deleted. I'll stick to not showing them.
                    }

                    try {
                        const jugador = await brawlService.getPlayer(row.tag);
                        return {
                            id: row.id,
                            name: jugador.name,
                            tag: jugador.tag,
                            clubName: jugador.club ? jugador.club.name : 'Sin Club',
                            clubTag: jugador.club ? jugador.club.tag : ''
                        };
                    } catch (e) {
                         // API Error (maybe maintenace or invalid tag)
                         return null;
                    }
                });

                const results = await Promise.all(promises);
                validUsuarios.push(...results.filter(r => r !== null));
            }

            if (validUsuarios.length === 0) {
                return int.editReply({ content: "No hay usuarios registrados correctamente." });
            }

            const generateEmbed = (page) => {
                const start = page * itemsPerPage;
                const end = start + itemsPerPage;
                const currentPlayers = validUsuarios.slice(start, end);

                return new EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0xFFFB00)
                    .setTitle(`Jugadores de Brawl registrados: ${validUsuarios.length}`)
                    .setDescription(currentPlayers.map(player =>
                        `<@${player.id}> | **${player.name}** (${player.tag})\n└ ${player.clubName}`
                    ).join('\n\n'))
                    .setFooter({ text: `Página ${page + 1} de ${Math.ceil(validUsuarios.length / itemsPerPage)}` });
            };

            const getButtons = (page) => {
                const maxPage = Math.ceil(validUsuarios.length / itemsPerPage) - 1;
                return new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId('prev').setLabel('Anterior').setStyle(ButtonStyle.Primary).setDisabled(page === 0),
                    new ButtonBuilder().setCustomId('next').setLabel('Siguiente').setStyle(ButtonStyle.Primary).setDisabled(page === maxPage)
                );
            };

            let currentPage = 0;
            const msg = await int.editReply({ 
                content: null,
                embeds: [generateEmbed(currentPage)], 
                components: [getButtons(currentPage)] 
            });

            const collector = msg.createMessageComponentCollector({ 
                componentType: ComponentType.Button, 
                time: 300000 
            });

            collector.on('collect', async i => {
                if (i.user.id !== int.user.id) return i.reply({ content: "No puedes usar estos botones.", ephemeral: true });

                if (i.customId === 'prev') currentPage--;
                else if (i.customId === 'next') currentPage++;

                await i.update({
                    embeds: [generateEmbed(currentPage)],
                    components: [getButtons(currentPage)]
                });
            });

            collector.on('end', () => {
                int.editReply({ components: [] }).catch(() => {});
            });

        } catch (error) {
            console.error("Error in users_brawl:", error);
            int.editReply("Ocurrió un error al cargar la lista de usuarios.");
        }
    }
};