const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
//const db = require('megadb');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("cuenta_create")
    .setDescription("Te creas una cuenta para registrar quien te debe dinero")
    .addStringOption(option =>
        option.setName("nombre")
        .setDescription("Pon tu nombre de esta forma Mario García=MG (Francisco Javier Fdez= FJF)")
        .setRequired(true)
    ),

    async run(client, int){

//         let user_id = int.member.id
//         const user_name = int.options.getString("nombre")
//         const cuentauser = new db.crearDB(`${user_id}`, 'economia');

//         if (cuentauser.tiene(`${user_id}`)) {

//             const embed = new Discord.EmbedBuilder()
//             .setThumbnail(int.guild.iconURL({ dynamic: true }))
//              .setAuthor({name: 'Team Galaxy'})
//              .setColor(0xFFFB00)
//              .setTitle(`Ya estas registrado en la base de datos`)
//              .setDescription(`Para añadir a la gente que te debe dinero utiliza el comando /registrar_deudor`)
//              .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
//          int.reply({ embeds: [embed]})

//         } else {

//             const embeda = new Discord.EmbedBuilder()
//             .setThumbnail(int.guild.iconURL({ dynamic: true }))
//              .setAuthor({name: 'Team Galaxy'})
//              .setColor(0xFFFB00)
//              .setTitle(`Se te ha registrado en la base de datos`)
//              .setDescription(`Para añadir a la gente que te debe dinero utiliza el comando /registrar_deudor`)
//              .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
//          int.reply({ embeds: [embeda]})

//          cuentauser.establecer(`${user_id}`, `${user_name}`)
//          cuentauser.establecer(`deudores`, {})

//         }

    }
}