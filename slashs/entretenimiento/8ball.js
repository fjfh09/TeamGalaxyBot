const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Puedes preguntarme lo que quieras")
    .addStringOption(option =>
        option.setName("pregunta")
        .setDescription("Pon la pregunta")
        .setRequired(true)
    ),

    async run(client, int){

        let pregunta = int.options.getString("pregunta")

        let respuestas = ["Si.", "No.", "Probablemente no", "Probablemente si", "Puedes confiar en eso", "Por supuesto que no!", "Claro que si", "Tu que crees", "Piensatelo dos veces", "No estoy seguro"]
        let random = respuestas [Math.floor(Math.random() * respuestas.length)];

        const embed = new Discord.EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle("8ball")
        .setDescription(`Tu pregunta:\n**${pregunta}**\n\nMi respuesta es:\n**${random}**`)
        .setFooter({ text: `Creado por fjfh`})
        int.reply({ embeds: [embed]})
    }
}