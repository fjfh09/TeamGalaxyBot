const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
//const db = require('megadb');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("registrar_deudor")
    .setDescription("Registra a un usuario que te debe dinero")
    .addStringOption(option =>
        option.setName("nombre_deudor")
        .setDescription("Pon el nombre de la persona que te debe dinero")
        .setRequired(true)
    )
    .addNumberOption(option =>
        option.setName("dinero")
        .setDescription("Pon cuanto dinero te debe")
        .setRequired(true)
    ),

    async run(client, int){

//         let user_id = int.member.id;
// const cuentauser = new db.crearDB(`${user_id}`, 'economia');

// const deudor_nombre = int.options.getString("nombre_deudor");
// const deudor_debe = int.options.getNumber("dinero");

// if (!cuentauser.tiene(`${user_id}`)) {
//     const embed = new Discord.EmbedBuilder()
//         .setThumbnail(int.guild.iconURL({ dynamic: true }))
//         .setAuthor({name: 'Team Galaxy'})
//         .setColor(0xFFFB00)
//         .setTitle('No estás registrado en la base de datos')
//         .setDescription('Para crearte un perfil utiliza el comando /crear_cuenta')
//         .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
//     int.reply({ embeds: [embed] });
// } else {
//     let deudores = cuentauser.obtener(`deudores`) || {};

//     if (deudores.hasOwnProperty(deudor_nombre)) {
//         const embedExistente = new Discord.EmbedBuilder()
//             .setThumbnail(int.guild.iconURL({ dynamic: true }))
//             .setAuthor({name: 'Team Galaxy'})
//             .setColor(0xFFFB00)
//             .setTitle('Deudor ya registrado')
//             .setDescription(`El deudor ${deudor_nombre} ya está registrado en la base de datos.`)
//             .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
//         int.reply({ embeds: [embedExistente] });
//     } else {
//         deudores[deudor_nombre] = deudor_debe;
//         cuentauser.establecer(`deudores`, deudores);

//         const embedNuevo = new Discord.EmbedBuilder()
//             .setThumbnail(int.guild.iconURL({ dynamic: true }))
//             .setAuthor({name: 'Team Galaxy'})
//             .setColor(0xFFFB00)
//             .setTitle(`Se ha registrado el deudor con nombre ${deudor_nombre}`)
//             .setDescription(`Te debe ${deudor_debe}€`)
//             .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
//         int.reply({ embeds: [embedNuevo] });
//     }
// }


        

    }
}