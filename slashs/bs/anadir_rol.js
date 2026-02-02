import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags, PermissionsBitField } from "discord.js";

const roles_filtrar = ["701142143988793445", "700328143394832435", "739819152130441278", "743136692172619848", "891633479907962900", "891633655200501772", "913144606386950144"];
const rol_añadir = "910183222833467523";

export default {
    data: new SlashCommandBuilder()
        .setName("arreglarrolbrawl")
        .setDescription("Arreglo quien tiene que tener el rol Brawl Stars")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        if (int.guildId !== process.env.IDSERVER) {
            return int.reply({ content: "Este comando solo debe usarse en el servidor principal.", flags: MessageFlags.Ephemeral });
        }

        await int.deferReply({ flags: MessageFlags.Ephemeral });
        await int.editReply({ content: "⏳ Sincronizando rol Brawl Stars..." });

        try {
            const members = await int.guild.members.fetch();
            let added = 0;
            let removed = 0;

            for (const member of members.values()) {
                const hasFilterRole = member.roles.cache.some(role => roles_filtrar.includes(role.id));
                const hasTargetRole = member.roles.cache.has(rol_añadir);

                if (hasFilterRole && !hasTargetRole) {
                    await member.roles.add(rol_añadir).catch(() => {});
                    added++;
                } else if (!hasFilterRole && hasTargetRole) {
                    await member.roles.remove(rol_añadir).catch(() => {});
                    removed++;
                }
            }

            await int.editReply({ 
                content: `✅ Sincronización completa.\n➕ Añadido a: ${added}\n➖ Quitado a: ${removed}` 
            });

        } catch (error) {
            console.error(error);
            await int.editReply({ content: "❌ Ocurrió un error." });
        }
    }
};