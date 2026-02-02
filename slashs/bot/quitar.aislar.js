import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, PermissionsBitField } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("quitar_aislar")
        .setDescription("Retira el aislamiento (timeout) a un usuario")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Usuario a desaislar")
                .setRequired(true)
        ),

    async run(client, int) {
        await int.deferReply();
        const user = int.options.getUser("usuario");

        try {
            const member = await int.guild.members.fetch(user.id);

            if (!member.isCommunicationDisabled()) {
                return int.editReply("⚠️ Este usuario no está aislado.");
            }

            await member.timeout(null, `Retirado por ${int.user.tag}`);

            const embed = new EmbedBuilder()
                .setTitle(`🔓 Aislamiento Retirado`)
                .setDescription(`Se ha retirado el aislamiento a **${user.tag}**.`)
                .setFooter({ text: `Moderador: ${int.user.tag}` })
                .setColor("Green")
                .setTimestamp();

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("❌ No se pudo quitar el aislamiento (usuario no encontrado o error de jerarquía).");
        }
    }
};