const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("quitar_aislar")
    .setDescription("Quita el aislamiento a un miembro del servidor")
    .addUserOption(option =>
        option.setName("usuario")
        .setDescription("Especifica un usuario para quitarle el aislamiento")
        .setRequired(true)
    ),

    async run(client, int){

        const user = int.options.getMember("usuario")
  
        let permisos = int.member.permissions.has("ModerateMembers")
        if(!permisos) return int.reply("No tienes suficientes permisos")
  
        const miembro = await int.guild.members.fetch(user.id)
  
        if(!miembro.isCommunicationDisabled()) return int.reply("Ese miembro no está aislado")
  
        await miembro.timeout(null)

        const embed = new Discord.EmbedBuilder()
        .setTitle(`${user.user.username} se le ha quitado el aislamiento`)
        .setFooter({text: int.user.tag})
        .setTimestamp()
        .setColor("Blue")
        int.reply({ embeds: [embed] })
    }
}