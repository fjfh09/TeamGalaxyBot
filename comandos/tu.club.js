const Discord = require('discord.js')
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "679437",
    alias: [],

    execute(client,message,args){

          message.delete();
        const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("1c")
            .setLabel("1️⃣")
            .setStyle(ButtonStyle.Danger),
            new Discord.ButtonBuilder()
            .setCustomId("2c")
            .setLabel("2️⃣")
            .setStyle(ButtonStyle.Primary),
            new Discord.ButtonBuilder()
            .setCustomId("3c")
            .setLabel("3️⃣")
            .setStyle(ButtonStyle.Success),
            new Discord.ButtonBuilder()
            .setCustomId("4c")
            .setLabel("4️⃣")
            .setStyle(ButtonStyle.Secondary)
        )
        const arow = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("5c")
            .setLabel("5️⃣")
            .setStyle(ButtonStyle.Danger),
            new Discord.ButtonBuilder()
            .setCustomId("6c")
            .setLabel("6️⃣")
            .setStyle(ButtonStyle.Primary),
            new Discord.ButtonBuilder()
            .setCustomId("7c")
            .setLabel("7️⃣")
            .setStyle(ButtonStyle.Success),
            new Discord.ButtonBuilder()
            .setCustomId("0c")
            .setLabel("0️⃣")
            .setStyle(ButtonStyle.Secondary)
        )

            const embed = new Discord.EmbedBuilder()
            .setTitle("Tu Club")
            .setDescription("Pulsa uno de estos botones para asignarte el rol del club de Brawl Stars al que perteneces:\n\n1️⃣ **MysticGalaxy**\n\n2️⃣ **MysticGalaxyII**\n\n3️⃣ **MysticGalaxyIII**\n\n4️⃣ **MysticGalaxyIV**\n\n5️⃣ **MysticGalaxyV**\n\n6️⃣ **MysticGalaxyVI**\n\n7️⃣ **MysticGalaxyVII**\n\n0️⃣ **No perteneces a ninguno**")
            .setColor(0x00ffff)
            .setFooter({ text: 'Obligatorio solo pulsar un botón, si queréis quitaros ese rol solo tedréis que pulsarlo de nuevo, y ya podréis pulsar otro botón diferente.\n\nCreado por fjfh'})

            message.channel.send({ embeds: [embed], components: [row,arow] })
           
    }
}