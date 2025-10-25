const Discord = require('discord.js')
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "verificar",
    alias: [],

    execute(client,message,args){

      const embed = new Discord.EmbedBuilder()
      .setTitle("✅ | Verificación")
      .setDescription("Dale click al botón de abajo para verificarte.")
      .setColor("Green")
      .setFooter({ text: 'Creado por fjfh'})

      const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setCustomId("verificate")
        .setLabel("Verificate")
        .setEmoji("✅")
      )

      message.channel.send({ embeds: [embed], components: [row]})

    }
}