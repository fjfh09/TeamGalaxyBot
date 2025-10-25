const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("desc_musi")
    .setDescription("Descarga la cancion que quieras")
    .addStringOption(option =>
        option.setName("cancion")
        .setDescription("Elige la cancion que quieres")
        .setRequired(true)
        .addChoices(
            {
                name: "23_Preguntas",
                value: "23_Preguntas",
            },
            {
                name: "512",
                value: "512",
            },
            {
                name: "AM_Remix",
                value: "AM_Remix",
            },
            {
                name: "Asi_soy_yo",
                value: "Asi_soy_yo",
            },
            {
                name: "Bombona",
                value: "Bombona",
            },
            {
                name: "Dakiti",
                value: "Dakiti",
            },
            {
                name: "Desesperados",
                value: "Desesperados",
            },
            {
                name: "Dictadura",
                value: "Dictadura",
            },
            {
                name: "Exit",
                value: "Exit",
            },
            {
                name: "Fiel_Remix",
                value: "Fiel_Remix",
            },
            {
                name: "Ley_Seca",
                value: "Ley_Seca",
            },
            {
                name: "Leyenda",
                value: "Leyenda",
            },
            {
                name: "Llorando_en_un_Ferrari",
                value: "Llorando_en_un_Ferrari",
            },
            {
                name: "Municiones",
                value: "Municiones",
            },
            {
                name: "No_me_Conoce_Remix",
                value: "No_me_Conoce_Remix",
            },
            {
                name: "North_Carolina",
                value: "North_Carolina",
            },
            {
                name: "Pin",
                value: "Pin",
            },
            {
                name: "Reloj",
                value: "Reloj",
            },
            {
                name: "Soy_Peor",
                value: "Soy_Peor",
            },
            {
                name: "Subelo",
                value: "Subelo",
            },
            {
                name: "Te_Bote_Remix",
                value: "Te_Bote_Remix",
            },
            {
                name: "Travesuras_Remix",
                value: "Travesuras_Remix",
            },
            {
                name: "Tu_no_Metes_Cabra_Remix",
                value: "Tu_no_Metes_Cabra_Remix",
            },
            {
                name: "Volando_Remix",
                value: "Volando_Remix",
            },
            {
                name: "Volvi",
                value: "Volvi",
            },
        )
    ),

    async run(client, int){

        let usuario = int.user.username;

        const cancion = int.options.getString("cancion")
        if(cancion === "23_Preguntas"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614529829470268/23_Preguntas.mp3)`)
          .setFooter({ text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
          
          if(cancion === "512"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614530328559666/512.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
          
              if(cancion === "AM_Remix"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614531242938388/AM-Remix.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Asi_soy_yo"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614531742064680/Asi_Soy_Yo.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Bombona"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614528420179998/Bombona.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Dakiti"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614529288380496/Dakiti.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Desesperados"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614560540151858/Desesperados.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Dictadura"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614561060249670/Dictadura.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Exit"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614561982971944/Exit_.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Fiel_Remix"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614562935095316/Fiel_-_Remix.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Ley_Seca"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614546078191646/Ley_Seca.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Leyenda"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614546539561050/Leyenda.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Llorando_en_un_Ferrari"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614546975784970/Llorando_En_Un_Ferrari.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Municiones"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614559231533126/Municiones.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "No_me_Conoce_Remix"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614559772594226/No_Me_Conoce-Remix.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "North_Carolina"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614560724697098/North_Carolina.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Pin"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614561211240519/Pin.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Reloj"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614561685192754/Reloj.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Soy_Peor"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614605717004348/Soy_Peor.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Subelo"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614606174167040/Subelo.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Te_Bote_Remix"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614606857834556/Te_Bote_-_Remix.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Travesuras_Remix"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614600570572851/Travesuras_Remix.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Tu_no_Metes_Cabra_Remix"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614602843893800/Tu_No_Mete_Cabra-Remix.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Volando_Remix"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614604471279726/Volando_Remix.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
              if(cancion === "Volvi"){
            const embed = new Discord.EmbedBuilder()
          .setTitle(`Descarga: **${cancion}**`)
          .setDescription(`Haz [click aqui](https://cdn.discordapp.com/attachments/744249848949375037/948614059404701696/Volvi.mp3)`)
          .setFooter({text: `Creado por fjfh | Solicitado por ${usuario}`})
          .setTimestamp()
          .setColor("Green")
            return int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), 120000))
          };
    }
}