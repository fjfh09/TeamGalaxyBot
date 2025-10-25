const { SlashCommandBuilder } = require("@discordjs/builders");
const { Discord, MessageFlags, PermissionsBitField } = require('discord.js');
const sqlite3 = require("sqlite3").verbose();
const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("arreglarrolverificado")
        .setDescription("Arreglo quien tiene que tener el rol verificado")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        const rol_añadir = "1253637489256693820";
        
        // Obtener lista de usuarios en la base de datos
        db_bot.all("SELECT id FROM usuariosbrawl", async (err, usuarios) => {
            if (err) throw err;
            
            const usuariosBD = new Set(usuarios.map(u => u.id));
            const miembros = await int.guild.members.fetch();

            for (let member of miembros.values()) {
                if (member.roles.cache.has(rol_añadir)) {
                    // Si tiene el rol pero no esta en la BD, se lo quitamos
                    if (!usuariosBD.has(member.id)) {
                        await member.roles.remove(rol_añadir);
                    }
                } else {
                    // Si no tiene el rol pero esta en la BD, se lo añadimos
                    if (usuariosBD.has(member.id)) {
                        await member.roles.add(rol_añadir);
                    }
                }
            }
        });

        // Responder al usuario
        await int.reply({ content: `Se ha actualizado el rol <@&${rol_añadir}> segun la base de datos.`, flags: MessageFlags.Ephemeral });
    }
};
