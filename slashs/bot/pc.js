const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const axios = require("axios");
const os = require("os")
const pidusage = require("pidusage")
const { MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("pc")
    .setDescription("Obtienes la información de la raspberry"),

    async run(client, int){
        const id = "739203308991807518";

        let fjfh = int.member.id === id;

        if(!fjfh) return int.reply("No eres fjfh asi que no puedes usar este comando").then(m => setTimeout(() => m.delete(), 5000))

        pidusage(process.pid, (err, stats) => {
            if (err){
                console.log('Error al obtener el usa de CPU:', err)
                return int.reply({ content: "Error al mirar el uso de la CPU", flags: MessageFlags.Ephemeral})
            }

            const memorialibre = os.freemem()/1024/1024;
            const totalmemoria = os.totalmem()/1024/1024;

            const memoriausada = totalmemoria - memorialibre

            const cpu = stats.cpu

            const embed = new Discord.EmbedBuilder()
            .setTitle(`Rendimiento de la Raspberry Pi 5`)
            .setDescription(`Memoria RAM: **${memoriausada.toLocaleString('es-ES', { useGrouping: true })}MB/${totalmemoria.toLocaleString('es-ES', { useGrouping: true })}MB**\n\nUso de la CPU: ${(cpu).toFixed(2)}%`)
            .setFooter({text: "Creado por fjfh"})
            .setColor(0xFF0000)
            int.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
        })
    }
}