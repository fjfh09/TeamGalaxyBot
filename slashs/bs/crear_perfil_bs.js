const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const sqlite3 = require('sqlite3').verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("crear_perfil_bs")
        .setDescription("Te creas un perfil donde se guardara tu perfil de Brawl Stars")
        .addStringOption(option =>
            option.setName("tag")
                .setDescription("Pon el tag de tu perfil de Brawl Stars")
                .setRequired(true)
        ),

    async run(client, int) {

        let user_id = int.member.id
        let bs_id = int.options.getString("tag")
        const fbs_id = (bs_id.startsWith("#") ? bs_id.toUpperCase() : "#" + bs_id.toUpperCase()).replace(/O/g, "0");

        db_bot.get(`SELECT * FROM usuariosbrawl WHERE id = ${user_id}`, async (err, filas) => {
            if (err) return console.log(err.int + ` ${int.content} ERROR #1 comando "caballos" => ${int.content}`)
            if (!filas) {
                try {

                    const { Client } = require('brawl-api-wrapper')
                    let { tokenb } = require("../../Id,typ.json")
                    const clienta = new Client(tokenb)

                    const jugador = await clienta.getPlayer(fbs_id, true)

                    const embeda = new Discord.EmbedBuilder()
                        .setThumbnail(int.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0xFFFB00)
                        .setTitle(`${jugador.name} | ${jugador.tag} con ${jugador.trophies.toLocaleString('es-ES', { useGrouping: true })} 🏆`)
                        .setDescription(`**¡Perfil guardado satisfactoriamente!**\n\nEstas bien registrado?, si no es asi vuelve a registrarte utilizando este comando \n\`/crear_perfil_bs tag:#TUTAG\``)
                        .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
                    int.reply({ embeds: [embeda] })


                    db_bot.run(`INSERT INTO usuariosbrawl(id, tag) VALUES('${user_id}', '${jugador.tag}')`, function (err) {
                        if (err) return console.log(err.int + ` ${int.content} ERROR #if comando "crear perfil" => ${int.content}`)
                    })
                    await int.member.roles.add("1253637489256693820")
                    client.users.send('739203308991807518', `${int.member.displayName} se ha registrado en la base de datos con la cuenta **${jugador.name}**${jugador.tag} con ${jugador.trophies.toLocaleString('es-ES', { useGrouping: true })} 🏆`);

                } catch (err) {
                    switch (err.status) {
                        case 503: {
                            console.log('La Api de brawl está caída');

                            const errorillo = new Discord.EmbedBuilder()
                                .setThumbnail(int.guild.iconURL({ dynamic: true }))
                                .setAuthor({ name: 'Team Galaxy' })
                                .setColor(0xFF0000)
                                .setDescription(`:bangbang:Brawl Stars en Mantenimiento:bangbang:`)
                                .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
                            return int.reply({ embeds: [errorillo] })
                        }
                        case 404: {
                            console.log('Jugador no encontrado');
                            const embeda = new Discord.EmbedBuilder()
                                .setAuthor({ name: 'Team Galaxy' })
                                .setColor(0xFFFB00)
                                .setTitle("Usuario no encontrado")
                                .setDescription(`El usuario de Brawl Stars con tag **${bs_id}** no existe. Revisa bien tu perfil de Brawl Stars y vuelve a intentarlo dandole al boton rojo.`)
                                .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })

                            return int.reply({ embeds: [embeda] })
                            // Player no encontrado
                            // Aquí puedes agregar el manejo para el error 404 si es necesario
                            break;
                        }

                        case 500: {
                            console.log('Error inesperdado');
                            const errorillo2 = new Discord.EmbedBuilder()
                                .setAuthor({ name: 'Team Galaxy' })
                                .setColor(0xFF0000)
                                .setDescription(`:bangbang:Error inesperado:bangbang:`)
                                .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
                            return int.reply({ embeds: [errorillo2] })
                            // Player no encontrado
                            // Aquí puedes agregar el manejo para el error 404 si es necesario
                            break;
                        }
                        default: {
                            // Si el error no es un 503 ni un 404, puedes lanzar el error nuevamente o manejarlo de otra manera
                            throw err;
                        }
                    }
                }
            } else {
                try {

                    const { Client } = require('brawl-api-wrapper')
                    let { tokenb } = require("../../Id,typ.json")
                    const clienta = new Client(tokenb)

                    const jugador = await clienta.getPlayer(fbs_id, true)

                    const embeda = new Discord.EmbedBuilder()
                        .setThumbnail(int.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0xFFFB00)
                        .setTitle(`${jugador.name} | ${jugador.tag} con ${jugador.trophies.toLocaleString('es-ES', { useGrouping: true })} 🏆`)
                        .setDescription(`**¡Perfil guardado satisfactoriamente!**\n\nEstas bien registrado?, si no es asi vuelve a registrarte utilizando este comando \n\`/crear_perfil_bs tag:#TUTAG\``)
                        .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
                    int.reply({ embeds: [embeda] })


                    db_bot.run(`UPDATE usuariosbrawl SET tag = '${fbs_id}' WHERE id = ${user_id}`, function (err) {
                        if (err) return console.log(`ERROR #else comando crearperfil`)
                    })
                    await int.member.roles.add("1253637489256693820")
                    client.users.send('739203308991807518', `${int.member.displayName} se ha registrado en la base de datos con la cuenta **${jugador.name}**${jugador.tag} con ${jugador.trophies.toLocaleString('es-ES', { useGrouping: true })} 🏆`);

                } catch (err) {
                    switch (err.status) {
                        case 503: {
                            console.log('La Api de brawl está caída');

                            const errorillo = new Discord.EmbedBuilder()
                                .setThumbnail(int.guild.iconURL({ dynamic: true }))
                                .setAuthor({ name: 'Team Galaxy' })
                                .setColor(0xFF0000)
                                .setDescription(`:bangbang:Brawl Stars en Mantenimiento:bangbang:`)
                                .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
                            return int.reply({ embeds: [errorillo] })
                        }
                        case 404: {
                            console.log('Jugador no encontrado');
                            const embeda = new Discord.EmbedBuilder()
                                .setAuthor({ name: 'Team Galaxy' })
                                .setColor(0xFFFB00)
                                .setTitle("Usuario no encontrado")
                                .setDescription(`El usuario de Brawl Stars con tag **${bs_id}** no existe. Revisa bien tu perfil de Brawl Stars y vuelve a intentarlo dandole al boton rojo.`)
                                .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })

                            return int.reply({ embeds: [embeda] })
                            // Player no encontrado
                            // Aquí puedes agregar el manejo para el error 404 si es necesario
                            break;
                        }

                        case 500: {
                            console.log('Error inesperdado');
                            const errorillo2 = new Discord.EmbedBuilder()
                                .setAuthor({ name: 'Team Galaxy' })
                                .setColor(0xFF0000)
                                .setDescription(`:bangbang:Error inesperado:bangbang:`)
                                .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
                            return int.reply({ embeds: [errorillo2] })
                            // Player no encontrado
                            // Aquí puedes agregar el manejo para el error 404 si es necesario
                            break;
                        }
                        default: {
                            // Si el error no es un 503 ni un 404, puedes lanzar el error nuevamente o manejarlo de otra manera
                            throw err;
                        }
                    }
                }
            }
        })
    }
}