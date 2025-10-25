const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Te doy mi información"),

    async run(client, int){

        let emoji = "📌"
        let emoji1 = "🗓"
        let { prefix } = require("../../Id,typ.json")

        const embed = new Discord.EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTitle("Menu de ayuda "+emoji1+" "+int.user.username)
            .setDescription(
                `> ${emoji} \`|\` Prefix \`${prefix}\`\n> ${emoji} \`|\` Comandos \`77\`\n> ${emoji} \`|\` Servidores \`${client.guilds.cache.size}\`\n> ${emoji} \`|\` Ping \`${client.ws.ping}ms\`\n\n**\`\`\`Hola ${int.user.username}, Para ver mis comandos utiliza: /ayuda\`\`\`**`
            )
            .setColor("#1A1A1A")
            .addFields(
                {
                name: ":gear: • **Soporte**", 
                value: "Si tienes alguna duda del bot ve a <#907349681108041778> donde te podremos atender"
                }
            )
            .setFooter({text: "Creado por fjfh", iconURL: int.guild.iconURL({ dynamic: true })})
            .setTimestamp()
        int.reply({ embeds: [embed]})
    }
}