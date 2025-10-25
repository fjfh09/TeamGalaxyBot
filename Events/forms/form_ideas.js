const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
const { MessageFlags } = require('discord.js');
module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (!interaction.isModalSubmit()) return;


        
        const id = interaction.user.id
        const quieneres = interaction.fields.getTextInputValue('quieneres');
        const erroresbot = interaction.fields.getTextInputValue('erroresbot');
        const comandosbot = interaction.fields.getTextInputValue('comandosbot');
        const server = interaction.fields.getTextInputValue('server');

        db_bot.run(`INSERT INTO formularioideas(id, nombre, errores, comandos, server) VALUES('${id}' ,'${quieneres}', '${erroresbot}', '${comandosbot}', '${server}')`, function (err) {
            if (err) return console.log("problema al insertar datos en la bd formularios ideas")
        })

        if (interaction.customId === 'ideas') {
            let embed = new Discord.EmbedBuilder()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setAuthor({ name: 'Team Galaxy' })
                .setColor("Random")
                .setTitle(`Gracias por responder al formulario para mejorar el server y el bot`)
                .setFooter({ text: 'Creado por fjfh' })
                .setTimestamp()
                .setDescription(`Estas han sido tus respuestas:\n\n- **Eres:**\n${quieneres}\n\n- **Errores del bot:**\n${erroresbot}\n\n- **Comandos para el bot:**\n${comandosbot}\n\n- **Sugerencias para el servidor:**\n${server}`)

            await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }



    }
};
