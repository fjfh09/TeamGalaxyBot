const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const ms = require("ms")

const sqlite3 = require('sqlite3').verbose();
const db_cartera = new sqlite3.Database("./BD/db_cartera.sqlite");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("cartera")
    .setDescription("Revisa tu credito dell casino"),

    async run(client, int){

        db_cartera.get(`SELECT * FROM usuarios WHERE id = ${int.member.id}`, async (err, filas) => {
            if(err) return console.log(err.message + ` ${message.content} ERROR #1 comando "cartera" => ${message.content}`)
            if(!filas) return int.reply({ embeds: [new Discord.EmbedBuilder().setDescription(`:money_with_wings: **¡Eres pobre! No tienes nada en la cartera**`).setColor(0x95F5FC)]})
            if(filas.monedas === 0) return int.reply({ embeds: [new Discord.EmbedBuilder().setDescription(`:money_with_wings: **¡Eres pobre! No tienes nada en la cartera**`).setColor(0x95F5FC)]})
            let embed = new Discord.EmbedBuilder()
              .setDescription(`**:credit_card: __CARTERA DEL CASINO__**\n\n**Monedas del casino:** ${filas.monedas} :diamond_shape_with_a_dot_inside:`)
              .setColor(0x95F5FC)
              .setThumbnail(int.user.displayAvatarURL({ dynamic: false }))
              .setTimestamp();
            return int.reply({ embeds: [embed]});
          });

    }
}