import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags, PermissionsBitField } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("arreglarrolverificado")
        .setDescription("Arreglo quien tiene que tener el rol verificado")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ flags: MessageFlags.Ephemeral });
        const rol_añadir = "1253637489256693820";

        try {
            // Get all user IDs from DB
            const usuarios = await dbService.bot.all("SELECT id FROM usuariosbrawl");
            const usuariosBD = new Set(usuarios.map(u => u.id));

            // Fetch all members
            const miembros = await int.guild.members.fetch();
            let added = 0;
            let removed = 0;

            for (const member of miembros.values()) {
                if (member.user.bot) continue;

                const hasRole = member.roles.cache.has(rol_añadir);
                const inDB = usuariosBD.has(member.id);

                if (hasRole && !inDB) {
                    await member.roles.remove(rol_añadir).catch(() => {});
                    removed++;
                } else if (!hasRole && inDB) {
                    await member.roles.add(rol_añadir).catch(() => {});
                    added++;
                }
            }

            await int.editReply({ 
                content: `✅ Se ha actualizado el rol <@&${rol_añadir}>.\n➕ Añadidos: ${added}\n➖ Quitados: ${removed}` 
            });

        } catch (error) {
            console.error(error);
            await int.editReply({ content: "Ocurrió un error al sincronizar los roles." });
        }
    }
};
