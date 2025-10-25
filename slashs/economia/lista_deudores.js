const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
//const db = require('megadb');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("lista_deudores")
    .setDescription("Mira quien te debe dinero"),

    async run(client, int){

//         let user_id = int.member.id;
//         const cuentauser = new db.crearDB(`${user_id}`, 'economia');

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

//     if (Object.keys(deudores).length === 0) {
//         const embedSinDeudores = new Discord.EmbedBuilder()
//             .setThumbnail(int.guild.iconURL({ dynamic: true }))
//             .setAuthor({name: 'Team Galaxy'})
//             .setColor(0xFFFB00)
//             .setTitle('No tienes deudores registrados')
//             .setDescription('No tienes ninguna deuda registrada en la base de datos.')
//             .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
//         int.reply({ embeds: [embedSinDeudores] });

//     } else {


//         let deudoresLista = '';
//         for (const [deudor, cantidad] of Object.entries(deudores)) {
//             deudoresLista += `- ${deudor}: ${cantidad}€\n`;
//         }

//         const embedDeudores = new Discord.EmbedBuilder()
//             .setThumbnail(int.guild.iconURL({ dynamic: true }))
//             .setAuthor({name: 'Team Galaxy'})
//             .setColor(0xFFFB00)
//             .setTitle('Lista de Deudores Registrados')
//             .setDescription(deudoresLista)
//             .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
//         int.reply({ embeds: [embedDeudores] });
//         }
//         }


        

    }
}