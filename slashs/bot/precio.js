const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const axios = require("axios")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("precio")
    .setDescription("Te doy el precio del ordenador"),

    async run(client, int){
        try {
            // Hacer una solicitud a la página de búsqueda de PC Componentes
            const response = await fetch('https://www.pccomponentes.com/api/articles/10810270/buybox').then((res) => res.json())
            const price = response.originalPrice

            // Enviar el precio como mensaje
            int.reply(`El precio de https://www.pccomponentes.com/msi-katana-15-b13vfk-1854xes-intel-core-i7-13700h-16gb-1tb-ssd-rtx-4060-156 en PC Componentes es ${price} euros.`);
        } catch (error) {
            console.error('Error al obtener el precio:', error);
            int.reply('Hubo un error al obtener el precio del producto.');
        }
    }
}