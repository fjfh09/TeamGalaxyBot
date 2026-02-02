import Discord from 'discord.js'
import { ButtonStyle } from 'discord.js';

export default {
    name: "926468",
    alias: [],

    execute(client,message,args){

message.delete();
 const embed = new Discord.EmbedBuilder()
 .setTitle(":thinking: SI TIENES ALGÚN PROBLEMA, O ALGUNA DUDA: :bulb:")
 .setDescription("Presiona el botón (🎫) para habilitar un canal de consultas.\n\nAlguien te atenderá pronto :ok_hand:")
 .setColor("Green")
 .setFooter({ text: 'Creado por fjfh'})

 const row = new Discord.ActionRowBuilder()
 .addComponents(
   new Discord.ButtonBuilder()
   .setCustomId("tickets")
   .setStyle(ButtonStyle.Success)
   .setLabel("Crear Ticket")
   .setEmoji("🎫")
 )

 message.channel.send({ embeds: [embed], components: [row] })

    }
}