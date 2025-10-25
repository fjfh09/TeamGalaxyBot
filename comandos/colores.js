const Discord = require('discord.js')
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "580346",
    alias: [],

    execute(client,message,args){

        message.delete();
        const row = new Discord.ActionRowBuilder()
        .addComponents([
            new Discord.ButtonBuilder()
            .setCustomId("A.o")
            .setLabel("🌀")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("A")
            .setLabel("🔵")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("B")
            .setLabel("⚪")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("A.a")
            .setLabel("🟡")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("R.o")
            .setLabel("🌸")
            .setStyle(ButtonStyle.Secondary)
            
            
        ])
        const arow = new Discord.ActionRowBuilder()
        .addComponents([
            new Discord.ButtonBuilder()
            .setCustomId("V")
            .setLabel("🟢")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("M")
            .setLabel("🟣")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("N.a")
            .setLabel("🟠")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("V.o")
            .setLabel("🐸")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("G")
            .setLabel("🐘")
            .setStyle(ButtonStyle.Secondary)

        ])
        const brow = new Discord.ActionRowBuilder()
        .addComponents([
            new Discord.ButtonBuilder()
            .setCustomId("R")
            .setLabel("🔴")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("M.a")
            .setLabel("🟤")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("N")
            .setLabel("⚫")
            .setStyle(ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("T")
            .setLabel("🌊")
            .setStyle(ButtonStyle.Secondary)

        ])

            const embed = new Discord.EmbedBuilder()

            .setTitle("Colores")
            .setDescription("Pulsa uno de estos botones para asignarte el rol del color que quieras:\n🌀 Azul Oscuro\n🔵 Azul\n⚪ Blanco\n🟡 Amarillo\n🌸 Rosa\n🟢 Verde\n🟣 Morado\n🟠 Naranja\n🐸 Verde Oscuro\n🐘 Gris\n🔴 Rojo\n🟤 Marron\n⚫ Negro\n🌊 Turquesa")
            .setColor(0x00ffff)
            .setFooter({ text: 'Obligatorio solo pulsar un botón, si queréis quitaros ese rol solo tedréis que pulsarlo de nuevo, y ya podréis pulsar otro botón diferente.\n\nCreado por fjfh'})

            message.channel.send({ embeds: [embed], components: [row,arow,brow] })
           
    }
}