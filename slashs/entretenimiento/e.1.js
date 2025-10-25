const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ButtonStyle } = require('discord.js');
let cooldown = new Set();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("e_1")
    .setDescription("Adivina que es"),

    async run(client, int){

        if (cooldown.has(int.member.id)) {
            const embed = new Discord.EmbedBuilder()
              .setTitle("Tienes que esperar 20s para ejecutar otra vez este comando")
              .setColor("Red")
              .setFooter({ text: `Creado por fjfh` })
              .setTimestamp()
      
            return int.reply({ embeds: [embed] })
          } cooldown.add(int.member.id);
      
          setTimeout(() => {
            cooldown.delete(int.user.id);
          }, 20010);

          const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("b1")
                .setLabel("Me cago en tu puta madre")
                .setEmoji("🤬")
                .setStyle(ButtonStyle.Danger)
            )
        
        const embed = new Discord.EmbedBuilder()
        .setTitle("Se tenia que decir:")
        .setColor("Fuchsia")
        .setFooter({text: "El botón dejará de funcionar en 20 segundos"})

        const m = await int.reply({ embeds: [embed], components: [row], fetchReply: true })
      
        const ifilter = i => i.user.id === int.member.id;
    
        const collector = m.createMessageComponentCollector({ filter: ifilter, time: 20000 })

        collector.on("collect", async (i) => {

            if(i.customId === "b1"){
                await i.deferUpdate()
                const embeda = new Discord.EmbedBuilder()
                .setTitle("y tu tambien eres una puta :joy::joy:")
                .setColor("Red")
                i.editReply({ embeds: [embeda], components: [], fetchReply: true }).then(m => setTimeout(() => m.delete(), 5000))
            }
        })
    }
}