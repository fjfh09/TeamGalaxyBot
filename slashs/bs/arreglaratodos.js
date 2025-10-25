const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { PermissionsBitField } = require('discord.js');
const { idserver } = require("../../Id,typ.json");
const sqlite3 = require('sqlite3').verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
const { MessageFlags } = require('discord.js');
const rolesAEliminar = [
  "690525769600073788", "699966708290420807", "782560016690839583", "701142143988793445",
  "782558135638032385", "706861891292758116", "782560143090516020", "700328143394832435",
  "782558540664799254", "739819941020172328", "782560398238810122", "739819152130441278",
  "782558944362496021", "740612981804630077", "782560566136799233", "743136692172619848",
  "891633509783977984", "891633442687688734", "891633459196473364", "891633479907962900",
  "891633573017296916", "891633614809366559", "891633653078167602", "891633655200501772",
  "913145163545731073", "913144999330316288", "913144888374198344", "913144606386950144", 
  "910183222833467523", "1265036668893794385", "690527183910862879"
];
const rolVerificado = "1253637489256693820";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("arreglar_todos")
    .setDescription("Arreglo quien tiene que tener el roles de Brawl Stars")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, int) {
    // Obtén el servidor
    const guild = client.guilds.cache.get(idserver);
    if (!guild) {
      return int.reply({ content: "No se encontró el servidor.", flags: MessageFlags.Ephemeral });
    }

    // Confirma que el proceso está comenzando
    await int.reply({ content: "Iniciando el proceso de revisión de roles...", flags: MessageFlags.Ephemeral });

    // Obtén todos los miembros del servidor
    const members = await guild.members.fetch();

    members.forEach(async (member) => {
      // Comprobar si el miembro tiene algún rol de la lista y no tiene el rol de verificado
      const tieneRolAEliminar = rolesAEliminar.some(roleId => member.roles.cache.has(roleId));
      const tieneRolVerificado = member.roles.cache.has(rolVerificado);

      if (tieneRolAEliminar && !tieneRolVerificado) {
        try {
          // Si cumple las condiciones, quita todos los roles de la lista
          await member.roles.remove(rolesAEliminar);
          console.log(`Roles eliminados para ${member.user.tag}`);
        } catch (err) {
          console.error(`No se pudieron eliminar los roles para ${member.user.tag}: ${err}`);
        }
      }
    });

    // Notifica al usuario que el proceso ha finalizado
    int.followUp({ content: "Proceso de revisión de roles completado.", flags: MessageFlags.Ephemeral });
  }
};
