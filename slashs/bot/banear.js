import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, PermissionsBitField } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("banear")
        .setDescription("Banea a un usuario del servidor")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Usuario a banear (mención o ID)")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("razon")
                .setDescription("Razón del ban")
                .setRequired(true)
        ),

    async run(client, int) {
        await int.deferReply();

        const user = int.options.getUser("usuario");
        const razon = int.options.getString("razon");

        if (user.id === int.user.id) return int.editReply("❌ No puedes banearte a ti mismo.");

        try {
            await int.guild.members.ban(user.id, { reason: razon });

            const embed = new EmbedBuilder()
                .setTitle(`🔨 Usuario Baneado`)
                .setDescription(`**Usuario:** ${user.tag} (${user.id})\n**Razón:** ${razon}`)
                .setFooter({ text: `Moderador: ${int.user.tag}` })
                .setColor(0xFF0000)
                .setTimestamp();

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("❌ No se pudo banear al usuario. Verifica permisos o jerarquía de roles.");
        }
    }
};