const Discord = require('discord.js')
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "124127",
    alias: [],

    execute(client,message,args){

          message.delete();
        const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("futbol")
            .setLabel("⚽")
            .setStyle(ButtonStyle.Danger),
            new Discord.ButtonBuilder()
            .setCustomId("deporte")
            .setLabel("💪")
            .setStyle(ButtonStyle.Primary)
        )
        
            const embed = new Discord.EmbedBuilder()
            .setTitle("Deportes")
            .setDescription("Pulsa algún botón para poder hablar en tu canal de deporte favorito:\n⚽ Fútbol\n💪 Otros deportes")
            .setColor(0x0CFF00)
            .setFooter({ text:'Podéis pulsar los botones que queráis.\nCreado por fjfh'})

            message.channel.send({ embeds: [embed], components: [row] })
           
    }
}