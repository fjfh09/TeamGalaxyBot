const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let cooldown = new Set();
const { ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ayuda")
        .setDescription("Te doy mis comandos"),

    async run(client, int) {
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId("menu_ayuda")
                    .setMaxValues(1)
                    .setPlaceholder('🗂¿Que categoria quieres?🗃')
                    .addOptions([
                        {
                            label: "Comandos del bot",
                            description: "Te doy los comandos para info mia o del server",
                            value: "bot",
                            emoji: "🤖",
                        },
                        {
                            label: "Comandos de Economia",
                            description: "Te enseño cuales son los comandos del sistema de Economía",
                            value: "eco",
                            emoji: "💶",
                        },
                        {
                            label: "Comandos de BS",
                            description: "Te doy un comando de Brawl Stars",
                            value: "bs",
                            emoji: "🎮",
                        },
                        {
                            label: "Comandos de musica",
                            description: "Comandos para reproducir musica",
                            value: "musi",
                            emoji: "🎵",
                        },
                        {
                            label: "Comando de Redes Sociales",
                            description: "Te doy el comando de las redes sociales del TG",
                            value: "rs",
                            emoji: "📷",
                        },
                        {
                            label: "Comandos de Futbol",
                            description: "Te doy el comando de futbol de la liga española",
                            value: "f",
                            emoji: "⚽",
                        },
                        {
                            label: "Comandos de entretenimiento",
                            description: "Te doy los comandos de entretenimiento del bot",
                            value: "e",
                            emoji: "🎪",
                        },
                        {
                            label: "Menu principal",
                            description: "Te pongo el mensaje inicial",
                            value: "menu",
                            emoji: "📖",
                        },
                        {
                            label: "Novedades",
                            description: "Te doy mis novedades actuales",
                            value: "n",
                            emoji: "🆕",
                        }
                    ])
            )

        const embed = new Discord.EmbedBuilder()
            .setThumbnail(int.guild.iconURL({ dynamic: true }))
            .setAuthor({ name: 'Team Galaxy' })
            .setColor(0x00FF51)
            .setTitle(`Estos son mis comandos en forma de categorias`)
            .setFooter({ text: 'Creado por fjfh' })
            .setTimestamp()
            .addFields(
                {
                    name: "Ayuda Bot",
                    value: "Te doy los comandos para info mia o del server",
                    inline: true
                },
                {
                    name: "Ayuda Economia",
                    value: "Te enseño cuales son los comandos del sistema de Economía",
                    inline: true
                },
                {
                    name: "Ayuda bs",
                    value: "Te doy un comando de Brawl Stars",
                    inline: true
                },
                {
                    name: "Ayuda Musica",
                    value: "Comandos para reproducir musica",
                    inline: true
                },
                {
                    name: "Ayuda Redes Sociales",
                    value: "Te doy el comando de las redes sociales del TG",
                    inline: true
                },
                {
                    name: "Ayuda Futbol",
                    value: "Te doy los comandos de futbol de la liga española",
                    inline: true
                },
                {
                    name: "Ayuda Entretenimiento",
                    value: "Te doy los comandos de entretenimiento",
                    inline: true
                },
                {
                    name: "Novedades",
                    value: "Te doy mis novedades actuales",
                    inline: true
                }
            )

        ////////////////////////////

        int.reply({ embeds: [embed], components: [row], fetchReply: true })
    }
}