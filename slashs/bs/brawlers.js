import { dbService } from "../../Services/DatabaseService.js";
import { brawlService } from "../../Services/BrawlStarsService.js";
import fs from 'fs';
import path from 'path';
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName("brawlers")
        .setDescription("Te muestro tus brawlers")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Selecciona un usuario")
                .setRequired(false)
        ),

    async run(client, int) {
        const brawlerData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Brawl/brawlers.json'), 'utf8'));

        function normalizarNombre(nombre) {
            switch (nombre.toUpperCase()) {
                case "MR. P": return "MRP";
                case "R-T": return "RT";
                case "LARRY & LAWRIE": return "LARRY_LAWRIE";
                case "8-BIT": return "8BIT";
                case "EL PRIMO": return "ELPRIMO";
                default: return nombre;
            }
        }

        function contarBrawlersPorCalidad(brawlers, calidad) {
            return brawlers.filter(b => {
                const nombreNormalizado = normalizarNombre(b.name);
                return brawlerData[nombreNormalizado] && brawlerData[nombreNormalizado].calidad === calidad;
            }).length;
        }

        function totalBrawlersPorCalidad(calidad) {
            return Object.values(brawlerData).filter(b => b.calidad === calidad).length;
        }

        function formatearBrawlersPorCalidad(brawlers, calidad) {
            const brawlersPorPagina = 10;
            const paginas = [];

            const brawlersFiltrados = brawlers
                .filter(b => {
                    const nombreNormalizado = normalizarNombre(b.name);
                    return brawlerData[nombreNormalizado] && brawlerData[nombreNormalizado].calidad === calidad;
                })
                .map(b => {
                    const nombreNormalizado = normalizarNombre(b.name);
                    const poderFormateado = b.power.toString().padStart(2, '0');
                    return `<:${nombreNormalizado}:${brawlerData[nombreNormalizado].emoji_id}> **${b.name}**\n${b.trophies}/${b.highestTrophies} :trophy: ${b.rank}:military_medal: ${b.power}:star:`;
                });

            for (let i = 0; i < brawlersFiltrados.length; i += brawlersPorPagina) {
                paginas.push(brawlersFiltrados.slice(i, i + brawlersPorPagina).join('\n'));
            }

            return paginas;
        }

        function crearSelectMenusPorTrofeos(brawlers) {
            const sortedBrawlers = brawlers.sort((a, b) => b.trophies - a.trophies);
            const selectMenus = [];
            let options = [];
            let menuIndex = 0;

            sortedBrawlers.forEach((b, index) => {
                const nombreNormalizado = normalizarNombre(b.name);
                const info = brawlerData[nombreNormalizado];
                const emojiId = info ? info.emoji_id : ""; // Safety check

                const option = {
                    label: `${index + 1}. ${b.name}`,
                    description: `${b.trophies} / ${b.highestTrophies} 🏆 ${b.rank}🎖️ ${b.power}⭐`,
                    value: `${index}`,
                    emoji: `${emojiId}`
                };
                options.push(option);

                if (options.length === 25 || index === sortedBrawlers.length - 1) {
                    const start = menuIndex * 25 + 1;
                    const end = start + options.length - 1;
                    selectMenus.push(new StringSelectMenuBuilder()
                        .setCustomId(`select_brawler_${menuIndex}`)
                        .setPlaceholder(`Brawlers: ${start} - ${end}`)
                        .addOptions(options)
                    );
                    options = [];
                    menuIndex++;
                }
            });

            return selectMenus;
        }

        try {
            let user = int.options.getUser("usuario") || int.user;

            const filas = await dbService.bot.get(`SELECT * FROM usuariosbrawl WHERE id = ?`, [user.id]);

            if (!filas) {
                const embeda = new EmbedBuilder()
                    .setThumbnail(int.guild.iconURL({ dynamic: true }))
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0xFFFB00)
                    .setTitle(`${user.username} no tiene ningún perfil creado`)
                    .setDescription(`Para crear un perfil debe utilizar el comando /crear_perfil_bs`)
                    .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
                return int.reply({ embeds: [embeda] });
            }

            let bs_id = filas.tag;
            // Use brawlService
            let jugador = await brawlService.getPlayer(bs_id, true);
            const brawlers = jugador.brawlers;

            const categorias = ["Inicial", "Especial", "Superespecial", "Épico", "Mítico", "Legendario"];
            const paginasPorCalidad = {};

            categorias.forEach(calidad => {
                const total = contarBrawlersPorCalidad(brawlers, calidad);
                const totalBrawlers = totalBrawlersPorCalidad(calidad);
                paginasPorCalidad[calidad] = {
                    paginas: formatearBrawlersPorCalidad(brawlers, calidad),
                    total,
                    totalBrawlers
                };
            });

            const embedBase = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy' })
                .setColor(0xFFFB00)
                .setTitle(`Brawlers: ${jugador.name} | ${jugador.tag}`)
                .setURL(`https://brawlify.com/stats/profile/${(jugador.tag).substring(1)}`)
                .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });

            const embedCalidad = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy' })
                .setTitle(`Brawlers: ${jugador.name} | ${jugador.tag}`)
                .setURL(`https://brawlify.com/stats/profile/${(jugador.tag).substring(1)}`)
                .setColor(0xFFFB00);

            const embedTrofeos = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy' })
                .setColor(0xFFFB00)
                .setTitle(`Brawlers: ${jugador.name} | ${jugador.tag}`)
                .setURL(`https://brawlify.com/stats/profile/${(jugador.tag).substring(1)}`)
                .setFooter({ text: `Creado por fjfh | Solicitado por: ${int.member.displayName}` });

            let currentPage = 0;
            let currentCalidad = null;
            let sortedBrawlers = [];

            const createButtons = (showCalidadButtons) => {
                const actionRows = [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId("ordenar_calidad").setLabel("Ordenar por Calidad").setStyle(ButtonStyle.Success),
                        new ButtonBuilder().setCustomId("ordenar_trofeos").setLabel("Ordenar por Trofeos").setStyle(ButtonStyle.Primary)
                    )
                ];

                if (showCalidadButtons) {
                    actionRows.push(
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId(`prev_${currentCalidad}`).setLabel("Anterior").setStyle(ButtonStyle.Primary).setEmoji("⏪").setDisabled(currentPage === 0),
                            new ButtonBuilder().setCustomId(`next_${currentCalidad}`).setLabel("Siguiente").setStyle(ButtonStyle.Danger).setEmoji("⏩").setDisabled(currentPage === paginasPorCalidad[currentCalidad]?.paginas.length - 1)
                        )
                    );

                    const calidadButtons = categorias.map(calidad =>
                        new ButtonBuilder()
                            .setCustomId(`calidad_${calidad}`)
                            .setLabel(calidad)
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(currentCalidad === calidad)
                    );

                    actionRows.push(
                        new ActionRowBuilder().addComponents(calidadButtons.slice(0, 3)),
                        new ActionRowBuilder().addComponents(calidadButtons.slice(3))
                    );
                }
                return actionRows;
            };

            const updateEmbed = async () => {
                if (currentCalidad && paginasPorCalidad[currentCalidad]) {
                    const paginas = paginasPorCalidad[currentCalidad]?.paginas || [];
                    const pageContent = paginas[currentPage] || 'N/A';
                    const totalPages = paginas.length;

                    embedCalidad.setDescription(`**${currentCalidad} (${paginasPorCalidad[currentCalidad].total}/${paginasPorCalidad[currentCalidad].totalBrawlers})**\n${pageContent}`)
                        .setFooter({ text: `Página ${currentPage + 1} de ${totalPages}\n\nCreado por fjfh | Solicitado por: ${int.member.displayName}` });

                    await int.editReply({
                        embeds: [embedCalidad],
                        components: createButtons(true)
                    });
                } else {
                    sortedBrawlers = brawlers.sort((a, b) => b.trophies - a.trophies);
                    const selectMenus = crearSelectMenusPorTrofeos(sortedBrawlers);
                    const actionRows = createButtons(false);

                    selectMenus.forEach(menu => {
                        actionRows.push(new ActionRowBuilder().addComponents(menu));
                    });

                    embedTrofeos.setDescription(`**Ordenado por Trofeos**`);

                    await int.editReply({
                        embeds: [embedTrofeos],
                        components: actionRows
                    });
                }
            };

            const msg1 = await int.reply({
                embeds: [embedBase],
                components: createButtons(false),
                fetchReply: true
            });

            const filter = i => i.user.id === int.user.id;
            const collector = msg1.createMessageComponentCollector({ filter, time: 120000 });

            collector.on('collect', async i => {
                const [action, calidad] = i.customId.split('_');

                try {
                    if (i.customId.startsWith('prev_')) {
                        if (currentCalidad && currentPage > 0) currentPage--;
                        await updateEmbed();
                    } else if (i.customId.startsWith('next_')) {
                        if (currentCalidad && currentPage < paginasPorCalidad[currentCalidad].paginas.length - 1) currentPage++;
                        await updateEmbed();
                    } else if (i.customId.startsWith('calidad_')) {
                        currentCalidad = calidad;
                        currentPage = 0;
                        await updateEmbed();
                    } else if (i.customId === 'ordenar_calidad') {
                        currentCalidad = categorias[0];
                        currentPage = 0;
                        await updateEmbed();
                    } else if (i.customId === 'ordenar_trofeos') {
                        currentCalidad = null;
                        sortedBrawlers = brawlers.sort((a, b) => b.trophies - a.trophies);
                        currentPage = 0;
                        await updateEmbed();
                    } else if (i.customId.startsWith('select_brawler_')) {
                        const selectedBrawlerIndex = parseInt(i.values[0], 10);
                        const selectedBrawler = sortedBrawlers[selectedBrawlerIndex];
                        const nombreNormalizado = normalizarNombre(selectedBrawler.name);

                        function traducirstarpowers(nombre) {
                            switch (nombre.toUpperCase()) {
                                case "EXTRA TOXIC": return "tremendo";
                                // Add mappings as needed or keep simple
                                default: return nombre;
                            }
                        }

                        function traducirgadgets(nombre) {
                             switch (nombre.toUpperCase()) {
                                case "DEFENSE BOOSTER": return "ñuolu";
                                case "SLOWING TOXIN": return "fefwef";
                                default: return nombre;
                            }
                        }
                    
                        const starpowers = selectedBrawler.starPowers;
                        const starpowersNames = starpowers.map(sp => traducirstarpowers(sp.name)).join(', ');

                        const gadgets = selectedBrawler.gadgets;
                        const gadgetsNames = gadgets.map(gad => traducirgadgets(gad.name)).join(', ');

                        const gears = selectedBrawler.gears;
                        const gearsNames = gears.map(ge => ge.name).join(', ');
                    
                        const embedSelectedBrawler = new EmbedBuilder()
                            .setTitle(`<:${nombreNormalizado}:${brawlerData[nombreNormalizado]?.emoji_id}>  ${selectedBrawler.name}`)
                            .setDescription(`**Trofeos:** *${selectedBrawler.trophies}*\n**Máximos Trofeos:** *${selectedBrawler.highestTrophies}*\n**Rango:** *${selectedBrawler.rank}*\n**Fuerza:** *${selectedBrawler.power}*\n**Star Powers:** ${starpowersNames}\n**Gadgets:** ${gadgetsNames}\n**Refuerzos:** ${gearsNames}`)
                            .setFooter({ text: `Creado por fjfh | Solicitado por: ${int.member.displayName}` });
                    
                        await int.followUp({ embeds: [embedSelectedBrawler], flags: MessageFlags.Ephemeral });
                    }
                    await i.deferUpdate();
                    
                } catch (error) {
                    console.error('Error al manejar la interacción:', error);
                }
            });

            collector.on('end', async () => {
                currentCalidad = null;
                currentPage = 0;
                sortedBrawlers = brawlers.sort((a, b) => b.trophies - a.trophies);
                const selectMenus = crearSelectMenusPorTrofeos(sortedBrawlers);
                const actionRows = [];
                selectMenus.forEach(menu => {
                    actionRows.push(new ActionRowBuilder().addComponents(menu));
                });

                embedTrofeos.setDescription(`**Menu Apagado**\n\n**Ordenado por Trofeos**`)

                await int.editReply({
                    embeds: [embedTrofeos],
                    components: actionRows
                });
            });

        } catch (error) {
            console.log(error);
            if (error.code === 'SQLITE_ERROR' || error.message.includes("no tiene ningún perfil")) return; // handled above or db error
             await int.reply({ content: 'Hubo un error al ejecutar este comando', flags: MessageFlags.Ephemeral }).catch(() => {});
        }
    }
};
