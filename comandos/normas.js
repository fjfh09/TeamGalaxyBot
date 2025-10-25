const Discord = require('discord.js')
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "normas",
    alias: [],

    execute(client,message,args){

            message.delete();    
                const row = new Discord.ActionRowBuilder()
            .addComponents(
               new Discord.ButtonBuilder()
               .setLabel("Normas de Discord")
               .setURL("https://discord.com/terms")
               .setStyle(ButtonStyle.Link)
              )   
            const embed = new Discord.EmbedBuilder()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor({ name: 'Team Galaxy'})
            .setColor(0x00FF2A)
            .setTitle(`NORMAS`)
            .setFooter({ text: 'Creado por fjfh | Normas creadas por OriolLS#'})
            .addFields(
              {
                name: "Obligatorio Cumplimiento",
                value: ":one: Se tratará con respeto a todos los miembros del servidor, quedando prohibido todo tipo de insultos.\n\n:two: Está totalmente prohibido enviar contenido inapropiado o +18.\n\n:three: Prohibido hacer flood (uso excesivo de emojis, repetición de palabras o mensajes y uso continuado de mayúsculas).\n\n:four: No se permite promocionar ni hacer spam en cualquier tipo de canal excepto en <#747058714611154964>.\n\n:five: Se debe respetar la finalidad de cada canal y utilizarlo correctamente.\n\n:six: Debe de haber sentido común y un buen comportamiento. El Staff del servidor puede actuar ante el incumplimiento de alguna de las normas.\n\n\n**NOTA:** Debes seguir todos los Términos y Condiciones de Discord, ya que también se aplican en el servidor.",
                inline: false
              }
            )
           
           message.channel.send({embeds: [embed], components: [row] })
           
    }
}