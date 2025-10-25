const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const ms = require("ms")
const { MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("limpiar")
    .setDescription("Puedes eliminar el exceso de mensajes")
    .addIntegerOption(option =>
        option.setName("cantidad")
        .setDescription("Pon el numero de mensajes que quieres borrar")
        .setRequired(true)
    ),

    async run(client, int){

        const cantidad = int.options.getInteger("cantidad")

      let permiso = int.member.permissions.has("ManageMessages")
      if(!permiso){
        const embed = new Discord.EmbedBuilder()
        .setTitle(":x: No tienes los permisos suficientes para realizar esta acción")
        .setColor("Red") 
        .setFooter({text: "Creado por fjfh"})
        .setTimestamp()
        return int.reply({embeds: [embed]})
      }

      if(cantidad <= "0"){
        const embed = new Discord.EmbedBuilder()
        .setTitle(":x: La cantidad no puede ser menor o igual a 0")
        .setColor("Red") 
        .setFooter({text: "Creado por fjfh"})
        .setTimestamp()
        return int.reply({embeds : [embed]})  
      }
        
      if(cantidad >= "100"){
        const embed = new Discord.EmbedBuilder()
        .setTitle(":x: La cantidad no puede ser mayor o igual a 100")
        .setColor("Red")  
        .setFooter({text: "Creado por fjfh"})
        .setTimestamp()
        return int.reply({embeds: [embed]})
        }

      
      const messages = await int.channel.messages.fetch({ limit: cantidad})
      const filtered = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms("14 days"))
      const days = messages.filter((msg) => Date.now() - msg.createdTimestamp > ms("14 days"))

      let mensaje;
      if (filtered.size  <= 1) {
        mensaje = "mensaje"
      } else if (filtered.size  >= 1) {
        mensaje = "mensajes"
      }
      
      
     
          if(days.size === 0){
     await int.channel.bulkDelete(filtered.size
      ).then(() => {
        return int.reply({content:`Se han borrado ${filtered.size} ${mensaje}`, flags: MessageFlags.Ephemeral})
      })
          }
      
         
       if(filtered.size === 0){
          return int.reply({content:"No he podido borrar ningun mensaje de este canal porque todos los mensajes se crearon hace más de 14 días", flags: MessageFlags.Ephemeral})
       }
         if(days.size !== 0){
         await int.channel.bulkDelete(filtered.size ).then(() => {
           return int.reply({content: `Se han borrado ${filtered.size} ${mensaje} porque algunos de los mensajes que has dicho tienen más de 14 días y no los puedo borrar`, flags: MessageFlags.Ephemeral})
         })
        }
    }
}