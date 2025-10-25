const Discord = require("discord.js");

module.exports = {
    name: "ping",
    alias: ["ping"],

    execute(client, message, args){

        var Fecha = new Intl.DateTimeFormat("es-ES", {
            dateStyle: "short",
            timeStyle: "short"
          }).format(new Date());

        message.channel.send(`Ping: **${client.ws.ping}**ms`)
        const embed = new Discord.EmbedBuilder()
           .setTitle("Team Galaxy\n¿Que novedades tengo?")
           .setDescription(`${client.ws.ping}`)
           .setColor(0xB59410)
           .setFooter({text: `Creado por fjfh | Actualizado día ${Fecha}`})
           .setTimestamp()
           
           message.channel.send({embeds: [embed] })
    }
}