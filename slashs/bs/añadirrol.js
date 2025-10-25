const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { PermissionsBitField } = require('discord.js');
const {idserver} = require("../../Id,typ.json")
const { MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("arreglarrolbrawl")
    .setDescription("Arreglo quien tiene que tener el rol Brawl Stars")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int){

        if (int.guildId !== idserver) {
            return int.reply({ content: "Este comando solo puede ser ejecutado en un servidor específico.", flags: MessageFlags.Ephemeral });
        }
        const roles_filtrar = ["701142143988793445", "700328143394832435", "739819152130441278", "743136692172619848", "891633479907962900", "891633655200501772", "913144606386950144"]
        const rol_añadir = "910183222833467523"

        int.guild.members.cache.forEach(member => {
            // Verificar si el miembro tiene alguno de los roles a filtrar
            if (member.roles.cache.some(role => roles_filtrar.includes(role.id))) {
                // Verificar si el miembro ya tiene el rol a añadir
                if (!member.roles.cache.has(rol_añadir)) {
                    // Añadir el rol al miembro
                    member.roles.add(rol_añadir);
                }
            }
        });

        int.guild.members.cache.forEach(member => {
            // Verificar si el miembro  no tiene alguno de los roles a filtrar
            if (!member.roles.cache.some(role => roles_filtrar.includes(role.id))) {
                // Verificar si el miembro ya tiene el rol a añadir
                if (member.roles.cache.has(rol_añadir)) {
                    // Quitar el rol al miembro
                    member.roles.remove(rol_añadir);
                }
            }
        });

        // Responder al usuario
        await int.reply({ content: `Se ha añadido el rol a los miembros <@&${rol_añadir}> a los que tienen que tenerlo`, flags: MessageFlags.Ephemeral });
    }
}