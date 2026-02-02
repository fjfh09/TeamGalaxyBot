import Discord from 'discord.js'

export default {
    name: "rs",
    alias: [],

    execute(client,message,args){
         
         message.delete();
        const embed = new Discord.EmbedBuilder()
          .setAuthor({ name: 'Team Galaxy'})
          .setColor(0x00FFF7)
          .setTitle(`Redes Sociales de __Mystic Galaxy__`)
          .setFooter({ text: 'Creado por fjfh' })
          .addFields(
            {
              name: "Instagram <:ig:811148406038331412>",
              value: "- [Click Aquí](https://instagram.com/teamgalaxy_bs)",
              inline: false
            },
            {
              name: "Twitter <:twitter:811149096303460383>",
              value: "- [Click Aquí](https://twitter.com/TeamGalaxy_BS)",
              inline: false
              
            },
            {
              name: "Apoya a Team Galaxy <:paypal:873239409565241365>",
              value: "- [Click Aquí](https://www.paypal.com/paypalme/damedamedinero)",
              inline: false
            }
    
          )
          message.channel.send({embeds: [embed] })
           
    }
}