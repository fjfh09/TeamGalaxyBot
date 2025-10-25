const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ComponentType } = require('discord.js');
let cooldown = new Set();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("e_2")
    .setDescription("Utilizalo y ya sabras"),

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
                new Discord.StringSelectMenuBuilder()
                .setCustomId("menu_prueba")
            .setMaxValues(1)
            .setPlaceholder('Pulsa Aquí para elegir')
            .addOptions([
             {
               label: "Puta",
               description: "¿Lo eres?",
               value: "puta",
               emoji: "👄",
             },
             {
                label: "Zorra",
                description: "¿En serio?",
                value: "zorra",
                emoji: "🐺",
             },
             {
                label: "Puta y Zorra",
                description: "¿Que dices?",
                value: "putazorra",
                emoji: "🥵",
             }
            ])
         )
        
        const embed = new Discord.EmbedBuilder()
        .setTitle("Elige lo que eres")
         .setColor(0xFF00E0)
         .setFooter({text: "El menu dejará de funcionar en 20 segundos"})

        const m = await int.reply({ embeds: [embed], components: [row], fetchReply: true })
      
        const ifilter = i => i.user.id === int.member.id;
    
        const collector = m.createMessageComponentCollector({ filter: ifilter, componentType: ComponentType.StringSelect, time: 20000 })

        collector.on("collect", async (i) => {

            if(i.values[0] === "puta"){
                      await i.deferUpdate()
                      const embed = new Discord.EmbedBuilder()
                      .setTitle("¿Ostias?")
                      .setColor("Purple")
                      i.editReply({ embeds: [embed], components: [], fetchReply: true }).then(m => setTimeout(() => m.delete(), 5000))
                  }
      
                  if(i.values[0] === "zorra"){
                     await i.deferUpdate()
                     const embeda = new Discord.EmbedBuilder()
                      .setTitle("¡Lo sabia!")
                      .setColor("Purple")
                      i.editReply({ embeds: [embeda], components: [], fetchReply: true }).then(m => setTimeout(() => m.delete(), 5000))
                  }
      
                  if(i.values[0] === "putazorra"){
                      await i.deferUpdate()
                      const embedb = new Discord.EmbedBuilder()
                      .setTitle("No me lo esperaba :joy:")
                      .setColor("Purple")
                      i.editReply({ embeds: [embedb], components: [], fetchReply: true }).then(m => setTimeout(() => m.delete(), 5000))
                  }
      
                   })
    }
}