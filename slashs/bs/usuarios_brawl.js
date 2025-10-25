const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
const fs = require('fs');
const path = require('path');
const { Client } = require('brawl-api-wrapper');
let { tokenb } = require("../../Id,typ.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("users_brawl")
        .setDescription("Enseño todos los usuarios creados en mi base de datos y su perfil de discord")
        .setDefaultMemberPermissions(Discord.PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply(); // Esto envía una respuesta inicial diferida

        const brawlerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Brawl/brawlers.json'), 'utf8'));
        const clienta = new Client(tokenb);
        const guildId = "667865814879305750"; // Reemplaza con el ID de tu servidor de Discord
        const itemsPerPage = 12; // Numero de jugadores por pagina

        if (int.guild.id === guildId) {
            try {
                db_bot.all('SELECT * FROM usuariosbrawl', async (err, usuarios) => {
                    if (err) throw err;

                    const validUsuarios = [];
                    for (let usuario of usuarios) {
                        let bs_id = usuario.tag;
                        try {
                            let jugador = await clienta.getPlayer(bs_id, true);
                            let guild = client.guilds.cache.get(guildId);
                            if (!guild) {
                                console.error(`Guild con ID '${guildId}' no encontrada.`);
                                continue;
                            }
                            let member = guild.members.cache.get(usuario.id);
                            if (!member) {
                                console.error(`${usuario.id} no esta en el servidor.`);
                                db_bot.run(`DELETE FROM usuariosbrawl WHERE id = '${usuario.id}'`, function (err) {
                                    if (err) return console.log(err.message + ` Eliminandolo de la base de datos`);
                                });
                                continue;
                            }

                            let jugInfo = {
                                id: usuario.id,
                                name: jugador.name,
                                tag: jugador.tag,
                                clubName: jugador.club ? jugador.club.name : null,
                                clubTag: jugador.club ? jugador.club.tag : null
                            };
                            validUsuarios.push(jugInfo);
                        } catch (error) {
                            console.error(`Error obteniendo datos del jugador con tag ${bs_id}:`, error);
                        }
                    }

                    const generateEmbed = (page) => {
                        const start = page * itemsPerPage;
                        const end = start + itemsPerPage;
                        const currentPlayers = validUsuarios.slice(start, end);

                        const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: 'Team Galaxy' })
                            .setColor(0xFFFB00)
                            .setTitle(`Jugadores de Brawl registrados: ${validUsuarios.length}`)
                            .setDescription(currentPlayers.map(player =>
                                `<@${player.id}>  \`${player.name}|${player.tag} -- ${player.clubName || 'Sin Club'}'|'${player.clubTag || ''}\``
                            ).join('\n'))
                            .setFooter({ text: `Pagina ${page + 1} de ${Math.ceil(validUsuarios.length / itemsPerPage)}` });

                        return embed;
                    };

                    let page = 0;
                    const row = new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId('previous')
                                .setLabel('Anterior')
                                .setStyle(Discord.ButtonStyle.Danger)
                                .setDisabled(page === 0),
                            new Discord.ButtonBuilder()
                                .setCustomId('next')
                                .setLabel('Siguiente')
                                .setStyle(Discord.ButtonStyle.Success)
                                .setDisabled(validUsuarios.length <= itemsPerPage)
                        );

                    const message = await int.editReply({ embeds: [generateEmbed(page)], components: [row] });

                    const collector = message.createMessageComponentCollector({
                        filter: i => i.user.id === int.user.id,
                        time: 1000*60*5
                    });

                    collector.on('collect', async (i) => {
                        if (i.customId === 'next') {
                            page++;
                        } else if (i.customId === 'previous') {
                            page--;
                        }
                        await i.update({
                            embeds: [generateEmbed(page)],
                            components: [
                                new Discord.ActionRowBuilder()
                                    .addComponents(
                                        new Discord.ButtonBuilder()
                                            .setCustomId('previous')
                                            .setLabel('Anterior')
                                            .setStyle(Discord.ButtonStyle.Danger)
                                            .setDisabled(page === 0),
                                        new Discord.ButtonBuilder()
                                            .setCustomId('next')
                                            .setLabel('Siguiente')
                                            .setStyle(Discord.ButtonStyle.Success)
                                            .setDisabled(page === Math.ceil(validUsuarios.length / itemsPerPage) - 1)
                                    )
                            ]
                        });
                    });

                    collector.on('end', () => {
                        message.edit({ components: [] });
                    });
                });

            } catch (err) {
                console.error('Error general:', err);
                if (err.status === 503) {
                    int.editReply('La API de Brawl Stars está caída');
                } else if (err.status === 404) {
                    int.editReply('Jugador no encontrado');
                } else if (err.status === 500) {
                    int.editReply('Error inesperado');
                } else {
                    int.editReply(`Error :${err}`);
                }
            }
        }
    }
};