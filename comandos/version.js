const Discord = require('discord.js')

module.exports = {
    name: "version",
    alias: [],

    execute(client,message,args){

        let {version} = require("../package.json")
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: 'Team Galaxy'})
            .setColor(0xFFFB00)
            .setTitle(`Esta es mi información`)
            .setDescription(`Mi version es la **${version}**\n\n**¿Porque tengo esta version :thinking:?**\nPorque he tenido una de las actualizaciones mas grandes de mi historia como bot\nTeexplico las actualizaciones con el comando **tg!novedades**`)
            .setFooter({ text: `Creado por fjfh | Solicitado por: ${message.member.displayName}` })
           
           message.channel.send({embeds: [embed] })
           
    }
}