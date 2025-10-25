const Discord = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "827546",
    alias: [],

    execute(client,message,args){

          message.delete();
        const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("notificacion")
            .setLabel("🔔")
            .setStyle(ButtonStyle.Danger)
        )
        
            const embed = new Discord.EmbedBuilder()
            .setTitle("Notificaciones")
            .setDescription("Pulsa este botón 🔔 para notificarte de las encuestas, streams y tweets")
            .setColor(0xE8FF00)
            .setFooter({ text: 'Creado por fjfh'})

            message.channel.send({ embeds: [embed], components: [row] })
           
    }
}