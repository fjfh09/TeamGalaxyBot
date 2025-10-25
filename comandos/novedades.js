const Discord = require('discord.js')

module.exports = {
    name: "novedades",
    alias: [],

    execute(client,message,args){


              let {version} = require("../package.json")
            const embed = new Discord.EmbedBuilder()
           .setTitle("Team Galaxy\n¿Que novedades tengo?")
           .setDescription(`**1º** Actualización a  la version **${version}**\n**2º** Cambiado el comando para dar los comandos a **tg!ayuda**, cambiada su forma de estructurarse y añadido un menu para mejor rapidez al saber los comandos.\n**3º** Cambiada la estetica de todos los comandos que hay en el bot menos el de **tg!decir**.\n**4º** Añadida la categoria de entretenimiento (comando: **tg!ayuda.e**) que consta de 4 comandos por ahora.\n**5º** Los comandos **tg!info-server** y **tg!usuario** estan renovados.`)
           .setColor("DARK_GOLD")
           .setFooter({text: 'Creado por fjfh'})
           .setTimestamp()
           
           message.channel.send({embeds: [embed] })
           
    }
}