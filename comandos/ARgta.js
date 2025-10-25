const Discord = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "889635",
    alias: [],

    execute(client,message,args){

          message.delete();
        const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("gta")
            .setLabel("🚓")
            .setStyle(ButtonStyle.Danger)
        )
        
            const embed = new Discord.EmbedBuilder()
            .setTitle("Grand Theft Auto")
            .setDescription("Pulsa este botón 🚓 para poder con la gente del servidor al GTAV online  o hablar sobre la saga de juegos")
            .setColor(0xa80000)
            .setFooter({ text: 'Creado por fjfh'})

            message.channel.send({ embeds: [embed], components: [row] })
           
    }
}