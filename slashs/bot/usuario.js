import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("usuario")
        .setDescription("Muestra información detallada de un usuario")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Usuario a consultar (opcional)")
                .setRequired(false)
        ),

    async run(client, int) {
        await int.deferReply();
        const member = int.options.getMember('usuario') || int.member;
        const user = member.user;

        // Status logic
        let status;
        switch (member.presence?.status) {
            case "online": status = "🟢 En línea"; break;
            case "dnd": status = "🔴 No molestar"; break;
            case "idle": status = "🟠 Ausente"; break;
            default: status = "⚪️ Desconectado";
        }

        // Roles logic (truncate if too many)
        const roles = member.roles.cache
            .filter(r => r.name !== '@everyone')
            .sort((a, b) => b.position - a.position)
            .map(r => r.toString());
        
        let rolesString = roles.join(", ");
        if (rolesString.length > 1000) {
            rolesString = roles.slice(0, 20).join(", ") + `... y ${roles.length - 20} más.`;
        }
        if (roles.length === 0) rolesString = "Sin roles adicionales.";

        const embed = new EmbedBuilder()
            .setTitle(`Información de ${user.username}`)
            .setAuthor({ name: 'Team Galaxy', iconURL: int.guild.iconURL() })
            .setColor(member.displayHexColor !== '#000000' ? member.displayHexColor : 0x008BFF)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "👤 Usuario", value: `<@${user.id}>`, inline: true },
                { name: "🆔 ID", value: user.id, inline: true },
                { name: "🔘 Estado", value: status, inline: true },
                { name: "📅 Creado", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "📆 Unido", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "🎮 Actividad", value: member.presence?.activities[0] ? member.presence.activities[0].name : "Ninguna", inline: true },
                { name: `🔮 Roles [${roles.length}]`, value: rolesString, inline: false }
            )
            .setFooter({ text: `Solicitado por ${int.user.username}` })
            .setTimestamp();

        await int.editReply({ embeds: [embed] });
    }
};