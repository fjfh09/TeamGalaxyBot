const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { PermissionsBitField } = require('discord.js');
const { MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Puedes crear un embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption(option =>
        option.setName("titulo")
        .setDescription("Especifica el titulo del embed")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("descripcion")
        .setDescription("Especifica la descripcion del embed")
        .setRequired(true)
    ),

    async run(client, int){

        let creador = int.user.tag;

        const titulo = int.options.getString("titulo")
        const descripcion = int.options.getString("descripcion")

        const embed = new Discord.EmbedBuilder()
        .setTitle(`${titulo}`)
        .setDescription(`${descripcion}`)
        .setThumbnail(int.guild.iconURL({ dynamic: true }))
        .setColor("Blue")
        .setFooter({ text: `Embed creado por ${creador} | Creado por fjfh`})
        .setTimestamp()
        int.channel.send({ embeds: [embed]})
        int.reply({ content: "Enviado", flags: MessageFlags.Ephemeral })
    }
}