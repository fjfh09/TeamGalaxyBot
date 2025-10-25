const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const memes = require("memes.spain");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Te enseño un meme"),

    async run(client, int){

        const meme = memes.Memes();

        const embed = new Discord.EmbedBuilder()
        .setTitle("Meme")
        .setColor(0xFF0000)
        .setImage(meme)
        .setFooter({text: `Creado por fjfh | Solicitado por ${int.member.displayName}`})
        .setTimestamp()
        int.reply({ embeds: [embed]})
    }
}