const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("aislar")
    .setDescription("Aisla a un miembro del servidor")
    .addUserOption(option =>
        option.setName("usuario")
        .setDescription("Especifica un usuario para aislar")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("tiempo")
        .setDescription("Especifica el tiempo del aislamiento")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("razon")
        .setDescription("Especifica la razon del aislamiento")
        .setRequired(true)
    ),

    async run(client, int){

        const user = int.options.getMember("usuario")
        const tiempo = int.options.getString("tiempo")
        const razon = int.options.getString("razon")
  
        let permisos = int.member.permissions.has("ModerateMembers")
        if(!permisos) return int.reply("No tienes suficientes permisos")
  
        const miembro = await int.guild.members.fetch(user.id)
  
        if(miembro.isCommunicationDisabled()) return int.reply("Ese miembro ya esta aislado")
  
        const time = ms(tiempo)
  
        await miembro.timeout(time, razon)

        const embed = new Discord.EmbedBuilder()
        .setTitle(`${user.user.username} ha sido aislado correctamente`)
        .setDescription(`**Tiempo:** ${tiempo}\n**Razón:** ${razon}`)
        .setFooter({ text: int.user.tag, iconURL: int.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor("Red")
        int.reply({ embeds: [embed], fetchReply: true }).then(m => setTimeout(() => m.delete(), time))
    }
}