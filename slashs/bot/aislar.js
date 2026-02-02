import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import ms from "ms";

export default {
    data: new SlashCommandBuilder()
        .setName("aislar")
        .setDescription("Aísla (timeout) a un miembro del servidor")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Usuario a aislar")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("tiempo")
                .setDescription("Duración (ej: 1h, 10m)")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("razon")
                .setDescription("Razón del aislamiento")
                .setRequired(true)
        ),

    async run(client, int) {
        await int.deferReply();

        const user = int.options.getUser("usuario");
        const tiempo = int.options.getString("tiempo");
        const razon = int.options.getString("razon");
        
        try {
            const member = await int.guild.members.fetch(user.id);

            if (member.isCommunicationDisabled()) {
                return int.editReply("❌ Este usuario ya está aislado.");
            }

            // Check hierarchy
            if (!member.moderatable) {
                return int.editReply("❌ No puedo aislar a este usuario (rol superior o igual al mío).");
            }

            const timeMs = ms(tiempo);
            if (!timeMs) return int.editReply("❌ Formato de tiempo inválido.");

            await member.timeout(timeMs, razon);

            const embed = new EmbedBuilder()
                .setTitle(`⛔ Usuario Aislado`)
                .setDescription(`**Usuario:** ${user.tag}\n**Tiempo:** ${tiempo}\n**Razón:** ${razon}`)
                .setFooter({ text: `Moderador: ${int.user.tag}` })
                .setColor("Red")
                .setTimestamp();

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("❌ Error al intentar aislar al usuario (posiblemente no está en el servidor o error de API).");
        }
    }
};