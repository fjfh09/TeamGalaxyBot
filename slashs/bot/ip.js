const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ip")
    .setDescription("Obtienes la ip del bot"),

    async run(client, int){
        const id = "739203308991807518";

        let fjfh = int.member.id === id

        if(!fjfh) return int.reply("No eres fjfh asi que no puedes usar este comando").then(m => setTimeout(() => m.delete(), 5000))

        async function obtenerIpPublica() {
        const respuesta = await axios.get(`https://api.ipify.org?format=json`);
        return respuesta.data.ip;
        }

        const IP = await obtenerIpPublica();

        const embed = new Discord.EmbedBuilder()
        .setTitle(`La ip es:`)
        .setDescription(`${IP}`)
        .setFooter({text: "Creado por fjfh"})
        .setColor(0xFF0000)
        int.reply({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000))
    }
}