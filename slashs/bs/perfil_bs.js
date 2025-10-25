const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
const fs = require('fs');
const path = require('path');
const { Client, TrophyBox } = require('brawl-api-wrapper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("perfil")
    .setDescription("Te enseño tu perfil o de alguien de Brawl Stars")
    .addUserOption(option =>
      option.setName("usuario")
        .setDescription("Selecciona un usuario")
        .setRequired(false)
    ),

  async run(client, int) {
    const brawlerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Brawl/brawlers.json'), 'utf8'));

    function normalizarNombre(nombre) {
      switch (nombre.toUpperCase()) {
        case "MR. P":
          return "MRP";
        case "R-T":
          return "RT";
        case "LARRY & LAWRIE":
          return "LARRY_LAWRIE";
        case "8-BIT":
          return "8BIT";
        case "EL PRIMO":
          return "ELPRIMO";
        default:
          return nombre;
      }
    }

    function contarBrawlersPorCalidad(brawlers, calidad) {
      return brawlers.filter(b => {
        const nombreNormalizado = normalizarNombre(b.name);
        return brawlerData[nombreNormalizado] && brawlerData[nombreNormalizado].calidad === calidad;
      }).length;
    }

    function totalBrawlersPorCalidad(calidad) {
      return Object.values(brawlerData).filter(b => b.calidad === calidad).length;
    }

    function formatearBrawlersPorCalidad(brawlers, calidad) {
      return brawlers
        .filter(b => {
          const nombreNormalizado = normalizarNombre(b.name);
          return brawlerData[nombreNormalizado] && brawlerData[nombreNormalizado].calidad === calidad;
        })
        .map(b => {
          const nombreNormalizado = normalizarNombre(b.name);
          const poderFormateado = b.power.toString().padStart(2, '0'); // Formatea b.power a dos cifras
          return `<:${nombreNormalizado}:${brawlerData[nombreNormalizado].emoji_id}>\`${poderFormateado}\``;
        })
        .join(' ') || 'N/A';
    }

    try {
      let { tokenb } = require("../../Id,typ.json");
      const clienta = new Client(tokenb);

      let user = int.options.getUser("usuario") || int.user;

      db_bot.get(`SELECT * FROM usuariosbrawl WHERE id = ${user.id}`, async (err, filas) => {
        if (err) return console.log(`Error al ejecutar la consulta en la base de datos: ${err}`);
        if (!filas) {
          const embeda = new Discord.EmbedBuilder()
            .setThumbnail(int.guild.iconURL({ dynamic: true }))
            .setAuthor({ name: 'Team Galaxy' })
            .setColor(0xFFFB00)
            .setTitle(`${user.displayName} no tiene ningún perfil creado`)
            .setDescription(`Para crear un perfil debe utilizar el comando /crear_perfil_bs`)
            .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
          return int.reply({ embeds: [embeda] });
        }

        let bs_id = filas.tag;
        let jugador = await clienta.getPlayer(bs_id, false);
        const brawlers = jugador.brawlers;
        //console.log("Brawlers:", brawlers.map(b => normalizarNombre(b.name))); // Log para depuración
        const reset = jugador.getSeasonReset();
        const tipos = {
          [TrophyBox.SmallBox]: "Caja pequeña",
          [TrophyBox.BigBox]: "Caja grande",
          [TrophyBox.MegaBox]: "Caja mega",
          [TrophyBox.OmegaBox]: "Caja omega",
          [TrophyBox.UltraBox]: "Caja ultra"
        };

        let tipoBox = tipos[reset.trophyBox] ?? "Caja desconocida";


        const legendarios = contarBrawlersPorCalidad(brawlers, "Legendario");
        const miticos = contarBrawlersPorCalidad(brawlers, "Mítico");
        const epicos = contarBrawlersPorCalidad(brawlers, "Épico");
        const superespeciales = contarBrawlersPorCalidad(brawlers, "Superespecial");
        const especiales = contarBrawlersPorCalidad(brawlers, "Especial");
        const iniciales = contarBrawlersPorCalidad(brawlers, "Inicial");

        const totalLegendarios = totalBrawlersPorCalidad("Legendario");
        const totalMiticos = totalBrawlersPorCalidad("Mítico");
        const totalEpicos = totalBrawlersPorCalidad("Épico");
        const totalSuperespeciales = totalBrawlersPorCalidad("Superespecial");
        const totalEspeciales = totalBrawlersPorCalidad("Especial");
        const totalIniciales = totalBrawlersPorCalidad("Inicial");

        const formatearLegendarios = formatearBrawlersPorCalidad(brawlers, "Legendario");
        const formatearMiticos = formatearBrawlersPorCalidad(brawlers, "Mítico");
        const formatearEpicos = formatearBrawlersPorCalidad(brawlers, "Épico");
        const formatearSuperespeciales = formatearBrawlersPorCalidad(brawlers, "Superespecial");
        const formatearEspeciales = formatearBrawlersPorCalidad(brawlers, "Especial");
        const formatearIniciales = formatearBrawlersPorCalidad(brawlers, "Inicial");

        const embeda = new Discord.EmbedBuilder()
          .setAuthor({ name: 'Team Galaxy' })
          .setColor(0xFFFB00)
          .setTitle(`${jugador.name} | ${jugador.tag}`)
          .setURL(`https://brawlify.com/stats/profile/${(jugador.tag).substring(1)}`)
          .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
          .addFields(
            { name: "Trofeos", value: `\`${jugador.trophies.toLocaleString('es-ES', { useGrouping: true })}\` 🏆`, inline: true },
            { name: "Máximo de Trofeos", value: `\`${jugador.highestTrophies.toLocaleString('es-ES', { useGrouping: true })}\` 🏆`, inline: true },
            { name: "Nivel", value: `<:XP:1264958241524154388>**\`${jugador.level}\`**`, inline: true },
            { name: "Club", value: jugador.club ? `<:Club:1264958203611971677> ${jugador.club.name} \`${jugador.club.tag}\`` : 'Sin Club', inline: true },
            { name: "Victorias en Supervivencia (Solo)", value: `<:Solo:1264958228526006423> ${jugador.soloVictories.toLocaleString('es-ES', { useGrouping: true })}`, inline: true },
            { name: "Victorias en Supervivencia (Dúos)", value: `<:Duo:1264958214756237384> ${jugador.duoVictories.toLocaleString('es-ES', { useGrouping: true })}`, inline: true },
            { name: "Victorias en 3 vs 3", value: `<:3v3:1264958180501356595> ${jugador["3vs3Victories"].toLocaleString('es-ES', { useGrouping: true })}`, inline: true },
            { name: "Recompensa de Temporada", value: `📦 \`${tipoBox}\``, inline: true },
            { name: "Reseteo de Temporada", value: `Trofeos: \`${reset.remainingTrophies.toLocaleString('es-ES', { useGrouping: true })}\`(\`-${(jugador.trophies - reset.remainingTrophies).toLocaleString('es-ES', { useGrouping: true })}\`) 🏆\n<:Vacio:1264966068993003580>`, inline: true },
            { name: `Legendario (${legendarios}/${totalLegendarios})`, value: formatearLegendarios, inline: false },
            { name: `Mítico (${miticos}/${totalMiticos})`, value: formatearMiticos, inline: false },
            { name: `Épico (${epicos}/${totalEpicos})`, value: formatearEpicos, inline: false },
            { name: `Superespecial (${superespeciales}/${totalSuperespeciales})`, value: formatearSuperespeciales, inline: false },
            { name: `Especial (${especiales}/${totalEspeciales})`, value: formatearEspeciales, inline: false },
            { name: `Inicial (${iniciales}/${totalIniciales})`, value: formatearIniciales, inline: false }
          );
        int.reply({ embeds: [embeda] });
      });
    } catch (err) {
      switch (err.status) {
          case 503: {
              console.log('La Api de brawl está caída');

              const errorillo = new Discord.EmbedBuilder()
                  .setAuthor({ name: 'Team Galaxy' })
                  .setColor(0xFF0000)
                  .setDescription(`:bangbang:Brawl Stars en Mantenimiento:bangbang:`)
                  .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
              return int.reply({ embeds: [errorillo] })
          }
          case 404: {
              console.log('Jugador no encontrado');
              return int.reply('Jugador no encontrado');
              // Player no encontrado
              // Aquí puedes agregar el manejo para el error 404 si es necesario
              break;
          }

          case 500: {
              console.log('Error inesperdado');
              const errorillo2 = new Discord.EmbedBuilder()
                  .setAuthor({ name: 'Team Galaxy' })
                  .setColor(0xFF0000)
                  .setDescription(`:bangbang:Error inesperado:bangbang:`)
                  .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName })
              return int.reply({ embeds: [errorillo2] })
              // Player no encontrado
              // Aquí puedes agregar el manejo para el error 404 si es necesario
              break;
          }
          default: {
            console.log("Error raro")
          }
      }
  }
  }
};
