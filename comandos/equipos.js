const Discord = require('discord.js')
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "579321",
    alias: [],

    execute(client,message,args){

          message.delete();
        const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("madrid")
            .setLabel("🤍")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("espanyol")
            .setLabel("💙")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("betis")
            .setLabel("💚")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("valencia")
            .setLabel("🧡")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("villareal")
            .setLabel("🏡")
            .setStyle(ButtonStyle.Secondary)   
        )
        const arow = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("barsa")
            .setLabel("🔴")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("granada")
            .setLabel("💣")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("sevilla")
            .setLabel("💃")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("celta")
            .setLabel("💧")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("levante")
            .setLabel("🌅")
            .setStyle(ButtonStyle.Secondary)
        )
        const brow = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("Atl.madrid")
            .setLabel("🏃‍♂️")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("r.sociedad")
            .setLabel("🏐")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("bilbao")
            .setLabel("👋")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("osasuna")
            .setLabel("🐻")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("rayo")
            .setLabel("⚡")
            .setStyle(ButtonStyle.Secondary)
        )

            const embed = new Discord.EmbedBuilder()

            .setTitle("Equipos")
            .setDescription("Pulsa algún botón para recibir rol de tu equipo favorito:\n🤍 Real Madrid\n💙 Espanyol\n💚 Betis\n🧡 Valencia\n🏡 Villareal\n🔴 Barça\n💣 Granada\n💃 Sevilla\n💧 Celta\n🌅 Levante\n🏃‍♂️ Atlético de Madrid\n🏐 Real Sociedad\n👋 Bilbao\n🐻 Osasuna\n⚡ Rayo Vallecano")
            .setColor(0x0064FF)
            .setFooter({ text: 'Podéis pulsar los botones que queráis.\nCreado por fjfh'})

            message.channel.send({ embeds: [embed], components: [row,arow,brow] })
           
    }
}