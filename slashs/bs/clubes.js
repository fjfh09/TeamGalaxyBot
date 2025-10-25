const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const sqlite3 = require("sqlite3").verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
const { MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("clubes")
        .setDescription("Te digo la info de los clubes de Mystic Galaxy")
        .addStringOption(option =>
            option.setName("club")
                .setDescription("Elige el club que quieres")
                .setRequired(true)
                .addChoices(
                    { name: "MysticGalaxy", value: "MysticGalaxy" },
                    { name: "MysticGalaxyII", value: "MysticGalaxyII" },
                    { name: "MysticGalaxyIII", value: "MysticGalaxyIII" },
                    { name: "MysticGalaxyIV", value: "MysticGalaxyIV" },
                    { name: "MysticGalaxyV", value: "MysticGalaxyV" },
                    { name: "MysticGalaxyVI", value: "MysticGalaxyVI" },
                    { name: "MysticGalaxyVII", value: "MysticGalaxyVII" }
                )
        ),

    async run(client, int) {
        try {
            const { Client: BrawlClient } = require("brawl-api-wrapper");
            const { tokenb, I, II, III, IV, V, VI, VII } = require("../../Id,typ.json");
            const clienta = new BrawlClient(tokenb);

            const clubelegido = int.options.getString("club");
            const tags = { MysticGalaxy: I, MysticGalaxyII: II, MysticGalaxyIII: III, MysticGalaxyIV: IV, MysticGalaxyV: V, MysticGalaxyVI: VI, MysticGalaxyVII: VII };
            const tagclub = tags[clubelegido];

            const ranking = await clienta.getRankingOfClubs("es");
            const club = await clienta.getClub(tagclub);
            let pos = ranking.findIndex(rank => rank.tag === tagclub);
            if (pos === -1) pos = "Sin Top";

            const customRoleNames = {
                senior: "Veterano",
                vicePresident: "Vicepresidente",
                member: "Miembro",
                president: "Presidente"
            };

            function getFormattedRole(roleName) {
                return customRoleNames[roleName] || roleName;
            }

            const clubTypeNames = {
                open: "Abierto",
                closed: "Cerrado",
                inviteOnly: "Con Invitación"
            };

            function getFormattedClubType(clubType) {
                return clubTypeNames[clubType] || clubType;
            }

            function getUserFromDB(tag) {
                return new Promise((resolve, reject) => {
                    db_bot.get(`SELECT * FROM usuariosbrawl WHERE tag = ?`, [tag], (err, row) => {
                        if (err) return reject(err);
                        resolve(row);
                    });
                });
            }

            let presidente = null;

            const members = await Promise.all(
                club.members.map(async (member, index) => {
                    try {
                        const filas = await getUserFromDB(member.tag);

                        let emojir;
                        if (member.role === "president") {
                            presidente = member;
                            emojir = "1266440594260099175";
                        } else if (member.role === "vicePresident") {
                            emojir = "1266440582889213953";
                        } else if (member.role === "senior") {
                            emojir = "1266440572155990028";
                        } else if (member.role === "member") {
                            emojir = "1266440552065536060";
                        }

                        return {
                            position: index + 1,
                            name: member.name,
                            tag: member.tag,
                            verificado: !!filas,
                            role: getFormattedRole(member.role),
                            trophies: `${member.trophies.toLocaleString("es-ES", { useGrouping: true })}`,
                            emoji: emojir
                        };
                    } catch (error) {
                        console.error(`Error procesando miembro ${member.tag}:`, error);
                        return null;
                    }
                })
            );

            const validMembers = members.filter(member => member !== null);

            const tipoclub = getFormattedClubType(club.type);
            const embed = new EmbedBuilder()
                .setAuthor({ name: "Team Galaxy" })
                .setTitle(`${club.name} | ${club.tag}`)
                .setColor(0xFFFB00)
                .setFooter({ text: `Creado por fjfh | Solicitado por: ${int.member.displayName}` })
                .addFields(
                    { name: "Trofeos", value: `${club.trophies.toLocaleString("es-ES", { useGrouping: true })}`, inline: true },
                    { name: "Trofeos Requeridos", value: `${club.requiredTrophies.toLocaleString("es-ES", { useGrouping: true })}`, inline: true },
                    { name: "Miembros", value: `**\`${club.memberCount}\`**\`/30\``, inline: true },
                    { name: "Estado", value: `**\`${tipoclub}\`**`, inline: true },
                    { name: "Top Español", value: `${isNaN(pos) ? pos : pos + 1} <a:spain:854090681830998097>`, inline: true },
                    { name: "Presidente", value: presidente ? `**${presidente.name}** ${presidente.tag}\n**\`${presidente.trophies.toLocaleString("es-ES", { useGrouping: true })}\`**` : "No especificado", inline: true },
                    { name: "Descripción", value: `${club.description}`, inline: false }
                );

            const memberChunks = [];
            for (let i = 0; i < validMembers.length; i += 15) {
                memberChunks.push(validMembers.slice(i, i + 15));
            }

            const selectMenus = memberChunks.map((chunk, index) => {
                const menu = new StringSelectMenuBuilder()
                    .setCustomId(`members_${index}`)
                    .setPlaceholder(`Miembros ${index * 15 + 1} - ${index * 15 + chunk.length}`);

                chunk.forEach(member => {
                    menu.addOptions({
                        label: `${member.position}º ${member.name} | ${member.tag} - ${member.verificado ? "Verificado" : "No Verificado"}`,
                        description: `${member.trophies} 🏆`,
                        value: `${member.position}`,
                        emoji: `${member.emoji}`
                    });
                });

                return new ActionRowBuilder().addComponents(menu);
            });

            await int.reply({ embeds: [embed], components: selectMenus });

        } catch (err) {
            switch (err.status) {
                case 503:
                    return int.reply({ content: "La API de Brawl Stars está en mantenimiento", flags: MessageFlags.Ephemeral });
                case 404:
                    return int.reply({ content: "Club no encontrado", flags: MessageFlags.Ephemeral });
                case 500:
                    return int.reply({ content: "Error inesperado", flags: MessageFlags.Ephemeral });
                default:
                    console.log(err);
                    return int.reply({ content: "Ocurrió un error inesperado", flags: MessageFlags.Ephemeral });
            }
        }
    }
};
