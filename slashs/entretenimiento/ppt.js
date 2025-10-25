const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ppt")
    .setDescription("Puedes jugar a Piedra, Papel o Tijeras")
    .addStringOption(option =>
        option.setName("eleccion")
        .setDescription("Escoje tu eleccion")
        .setRequired(true)
        .addChoices(
            {
                name: "Piedra",
                value: "Piedra",
              },
              {
                name: "Papel",
                value: "Papel",
              },
              {
                name: "Tijeras",
                value: "Tijeras",
              },
        )
    ),

    async run(client, int){

        let user = int.member;

        let eleccion = int.options.getString("eleccion")

        let opciones = ["Piedra", "Papel", "Tijeras"];
        let respuesta = opciones[Math.floor(Math.random()*(opciones.length))];

        var vyd = null;
    if (eleccion == "Papel" && respuesta == "Papel"){
      vyd = "🔅 ¡EMPATASTE! 🔅"
    }if (eleccion == "Piedra"&& respuesta == "Piedra"){
      vyd = "🔅 ¡EMPATASTE! 🔅"
    }if (eleccion == "Tijeras" && respuesta == "Tijeras"){
      vyd = "🔅 ¡EMPATASTE! 🔅"
    }if (eleccion == "Papel" && respuesta == "Piedra"){
      vyd = "✅ ¡GANASTE! ✅"
    }if (eleccion == "Papel" && respuesta == "Tijeras"){
      vyd = "❌ ¡PERDISTE! ❌"
    }if (eleccion == "Piedra" && respuesta == "Papel"){
      vyd = "❌ ¡PERDISTE! ❌"
    }if (eleccion == "Piedra" && respuesta == "Tijeras"){
      vyd = "✅ ¡GANASTE! ✅"
    }if (eleccion == "Tijeras" && respuesta == "Papel"){
      vyd = "✅ ¡GANASTE! ✅"
    }if (eleccion == "Tijeras" && respuesta == "Piedra"){
      vyd = "❌ ¡PERDISTE! ❌"
    };

    var uelec = null;
    if (eleccion == "Piedra") {
        uelec = `Piedra 👊`
    }if (eleccion == "Papel"){
        uelec = "Papel 📃"
    }if (eleccion == "Tijeras"){
      uelec = "Tijeras ✂️"
    };

    var belec = null;
    if (respuesta == "Piedra") {
        belec = `Piedra 👊`
    }if (respuesta == "Papel"){
        belec = "Papel 📃"
    }if (respuesta == "Tijeras"){
      belec = "Tijeras ✂️"
    };

        const embed = new Discord.EmbedBuilder()
        .setColor("DarkBlue")
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${vyd}`)
        .setDescription(`Has elegido: **${uelec}**\nTeam Galaxy ha elegido: **${belec}**`)
        .setFooter({ text: `${user.user.username} contra Team Galaxy bot | Creado por fjfh`})
        .setTimestamp()
        int.reply({ embeds: [embed]})
    }
}