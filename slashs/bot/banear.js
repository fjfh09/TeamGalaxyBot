const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("banear")
    .setDescription("Puedes banear a alguien del server")
    .addUserOption(option =>
        option.setName("usuario")
        .setDescription("Pon al usuario que quieres banear")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("razon")
        .setDescription("¿Porque lo quieres banear?")
        .setRequired(true)
    ),

    async run(client, int){

        const user = int.options.getMember("usuario")
        const razon = int.options.getString("razon")
  
        let permisos = int.member.permissions.has("Administrator")
        if(!permisos) return int.reply("No tienes suficientes permisos")
  
        if(user === int.author) return int.reply("No te puedes banear a ti mismo :joy:")

        int.guild.members.cache.get(user.id).ban({reason: razon})
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Usuario baneado`)
        .setDescription(`Se ha baneado a ${user}\n\nPor: ${razon}`)
        .setFooter({text: "Creado por fjfh"})
        .setColor(0xFF0000)
        int.reply({ embeds: [embed] })
    }
}