const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
const { Client } = require('brawl-api-wrapper');
const { rolpresi1, rolvice1, rolpresi2, rolvice2, rolpresi3, rolvice3, 
  rolpresi4, rolvice4, rolpresi5, rolvice5, rolpresi6, rolvice6, rolpresi7, rolvice7 } = require("../../Brawl/rolbrawl.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buscar_user_brawl")
    .setDescription("Muestra el perfil de Brawl Stars de un usuario")
    .addUserOption(option =>
      option.setName("usuario")
        .setDescription("Busca al usuario a través del usuario de Discord")
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName("nombre_brawl")
        .setDescription("Busca al usuario a través del nombre en Brawl Stars")
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName("tag_brawl")
        .setDescription("Busca al usuario a través del tag en Brawl Stars")
        .setRequired(false)
    ),

  async run(client, int) {
    await int.deferReply();
    try {

      const rolesPermitidos = [rolpresi1, rolpresi2, rolpresi3, rolpresi4, rolpresi5, rolpresi6, rolpresi7, 
        rolvice1, rolvice2, rolvice3, rolvice4, rolvice5, rolvice6, rolvice7, '708352560964304957', '749181768980103199', '841323449867567144']; // Reemplaza con los IDs de los roles permitidos

      // Verificar si el usuario tiene algún rol permitido
      const miembro = int.member;
      if (!miembro.roles.cache.some(rol => rolesPermitidos.includes(rol.id))) {
        const embed = new Discord.EmbedBuilder()
          .setAuthor({ name: 'Team Galaxy' })
          .setColor(0xFF0000)
          .setTitle(":no_entry: Permiso denegado")
          .setDescription("No tienes los permisos necesarios para usar este comando.")
          .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
        return int.editReply({ embeds: [embed] });
      }
      const { tokenb, idserver } = require("../../Id,typ.json");
      const clienta = new Client(tokenb);

      const user = int.options.getUser("usuario");
      const nombreBrawl = int.options.getString("nombre_brawl");
      const tagBrawl = int.options.getString("tag_brawl");

      if (user) {
        // Buscar el perfil mediante el usuario de Discord
        db_bot.get(`SELECT * FROM usuariosbrawl WHERE id = ?`, [user.id], async (err, filas) => {
          if (err) return console.error(`Error en la consulta SQL: ${err.message}`);
          if (!filas) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: 'Team Galaxy' })
              .setColor(0xFFFB00)
              .setTitle(`${user.username} no tiene un perfil creado`)
              .setDescription("Usa el comando /crear_perfil_bs para crear uno.")
              .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
            return int.editReply({ embeds: [embed] });
          }

          const bs_id = filas.tag;
          const jugador = await clienta.getPlayer(bs_id, false);

          const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: 'Team Galaxy' })
            .setTitle(`Perfil de ${jugador.name}`)
            .setDescription(`**Usuario Discord:** <@${user.id}>\n**Nombre Brawl:** ${jugador.name}\n**Tag Brawl:** ${jugador.tag}\n**Club:** ${jugador.club.name || 'Sin Club'}`)
            .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
          return int.editReply({ embeds: [embed] });
        });
      } else if (tagBrawl) {
        // Buscar el perfil mediante el tag de Brawl
        db_bot.get(`SELECT * FROM usuariosbrawl WHERE tag = ?`, [tagBrawl], async (err, filas) => {
          if (err) return console.error(`Error en la consulta SQL: ${err.message}`);
          if (!filas) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: 'Team Galaxy' })
              .setColor(0xFFFB00)
              .setTitle("Usuario no registrado")
              .setDescription("El usuario con ese tag no está registrado en nuestra base de datos.")
              .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
            return int.editReply({ embeds: [embed] });
          }

          const bs_id = filas.tag;
          const id = filas.id
          const jugador = await clienta.getPlayer(bs_id, false);

          const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: 'Team Galaxy' })
            .setTitle(`Perfil de ${jugador.name}`)
            .setDescription(`**Usuario Discord:** <@${id}>\n**Nombre Brawl:** ${jugador.name}\n**Tag Brawl:** ${jugador.tag}\n**Club:** ${jugador.club.name || 'Sin Club'}`)
            .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
          return int.editReply({ embeds: [embed] });
        });
      } else if (nombreBrawl) {
        // Buscar usuarios registrados que coincidan con el nombre en Brawl Stars
        db_bot.all('SELECT * FROM usuariosbrawl', async (err, usuarios) => {
          if (err) return console.error(`Error en la consulta SQL: ${err.message}`);

          const validUsuarios = [];
          const guild = client.guilds.cache.get(idserver);
          if (!guild) return console.error(`Guild con ID '${idserver}' no encontrada.`);

          for (const usuario of usuarios) {
            const bs_id = usuario.tag;
            try {
              const jugador = await clienta.getPlayer(bs_id, true);
              const member = guild.members.cache.get(usuario.id);
              if (!member) {
                console.error(`${usuario.id} no está en el servidor.`);
                db_bot.run(`DELETE FROM usuariosbrawl WHERE id = ?`, [usuario.id], function (err) {
                  if (err) return console.log(`Error al eliminar de la base de datos: ${err.message}`);
                });
                continue;
              }

              if (jugador.name.toLowerCase() === nombreBrawl.toLowerCase()) {
                validUsuarios.push({
                  id: usuario.id,
                  name: jugador.name,
                  tag: jugador.tag,
                  club: jugador.club
                });
              }
            } catch (error) {
              console.error(`Error obteniendo datos del jugador con tag ${bs_id}:`, error);
            }
          }

          if (validUsuarios.length === 0) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: 'Team Galaxy' })
              .setColor(0xFFFB00)
              .setTitle("Usuario no encontrado")
              .setDescription(`No se encontró ningún jugador registrado con el nombre **${nombreBrawl}**.`)
              .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
            return int.editReply({ embeds: [embed] });
          }

          const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: 'Team Galaxy' })
            .setTitle(`Usuarios encontrados con el nombre ${nombreBrawl}`)
            .setColor(0x00FF00)
            .setDescription(
                validUsuarios.map(u => `**Usuario Discord:** <@${u.id}>\n**Nombre Brawl:** ${u.name}\n**Tag Brawl:** ${u.tag}\n**Club:** ${u.club.name || 'Sin Club'}`).join("\n\n")
              )
            .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });
          int.editReply({ embeds: [embed] });
        });
      } else {
        int.editReply("Por favor, especifica al menos una opción para buscar.");
      }
    } catch (err) {
      console.error("Error en la ejecución del comando:", err);
      const embedError = new Discord.EmbedBuilder()
        .setAuthor({ name: 'Team Galaxy' })
        .setColor(0xFF0000)
        .setDescription(":bangbang: Error inesperado en la ejecución del comando :bangbang:");
      int.editReply({ embeds: [embedError] });
    }
  }
};
