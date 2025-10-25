const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ver_futbol")
    .setDescription("Podrás ver el futbol de la Liga Santander"),

    async run(client, int){

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel("Click Aquí")
               .setURL("https://www.rojadirectatvenvivo.com/")
               .setStyle(ButtonStyle.Link)
              )   
        const embed = new Discord.EmbedBuilder()
        .setTitle("Team Galaxy")
        .setDescription(`Podrás ver los partidos de futbol gratis\n**¿Quieres ver el futbol?**\n**Pulsa el botón**`)
        .setColor(0x0A69CF)
        .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
        .setTimestamp()   
        int.reply({ embeds: [embed], components: [row] })
    }
}