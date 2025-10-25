const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const Discord = require("discord.js")
const sqlite3 = require('sqlite3').verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
const { MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("r29_activar")
    .setDescription("Activas o Desactivas la notificacion de r29")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption(option =>
        option.setName("eleccion")
        .setDescription("Escoje tu eleccion")
        .setRequired(true)
        .addChoices(
            {
                name: "Si",
                value: "Si",
            },
            {
                name: "No",
                value: "No",
            }
        )
    ),

    async run(client, int){
        let eleccion = int.options.getString("eleccion")

        if(eleccion == "Si"){
            db_bot.run(`UPDATE brawlopciones SET activo = 1 WHERE id = 1`, function(err) {
                if(err) return console.log(err.message + ` ${message.content} ERROR #2 poniendo que la noticia no esta enviada`)
                return int.reply({ embeds: [new Discord.EmbedBuilder().setDescription("Activada la notificacion para r29").setColor(0x008000)], flags: MessageFlags.Ephemeral  })
            })
        } else if(eleccion == "No"){
            db_bot.run(`UPDATE brawlopciones SET activo = 0 WHERE id = 1`, function(err) {
                if(err) return console.log(err.message + ` ${message.content} ERROR #2 poniendo que la noticia no esta enviada`)
                return int.reply({ embeds: [new Discord.EmbedBuilder().setDescription("Desactivada la notificacion para r29").setColor(0xFF0000)], flags: MessageFlags.Ephemeral  })
            })
        }
    }
}