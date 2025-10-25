const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Te doy mi ping"),

    async run(client, int){
        const embed = new Discord.EmbedBuilder()
           .setTitle("Team Galaxy")
           .setDescription(`Mi ping es de **${client.ws.ping}ms** 🏓`)
           .setColor(0x0A69CF)
           .setFooter({text: 'Creado por fjfh'})
           .setTimestamp()
        int.reply({ embeds: [embed]})
    }
}