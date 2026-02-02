import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("servidor")
        .setDescription("Muestra información detallada del servidor"),

    async run(client, int) {
        await int.deferReply();

        try {
            const guild = int.guild;
            const owner = await guild.fetchOwner();
            // Fetching members with presences might be heavy or restricted without intents, but standard count is fine
            // If the bot has the intent and it's a small server, this works. For large servers, it's expensive.
            // We'll trust the existing logic but wrap it safely.
            
            const members = await guild.members.fetch();
            const online = members.filter(m => !m.user.bot && ['online', 'idle', 'dnd'].includes(m.presence?.status)).size;
            const bots = members.filter(m => m.user.bot).size;
            const humans = guild.memberCount - bots; // Approximation or use filtered size

            const embed = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy', iconURL: guild.iconURL() })
                .setColor("Purple")
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setTitle(`Información del Servidor: ${guild.name}`)
                .addFields(
                    { name: "👑 Propietario", value: `<@${guild.ownerId}>`, inline: true },
                    { name: "👥 Miembros", value: `Total: ${guild.memberCount}\nHumanos: ${humans}\nBots: ${bots}`, inline: true },
                    { name: "🟢 En Línea (aprox)", value: `${online}`, inline: true },
                    { name: "📅 Creación", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                    { name: "🔢 Roles", value: `${guild.roles.cache.size}`, inline: true },
                    { name: "✅ Verificación", value: guild.verified ? 'Verificado' : 'No verificado', inline: true },
                    { name: "🔮 Mejoras (Boosts)", value: `${guild.premiumSubscriptionCount} (Nivel ${guild.premiumTier})`, inline: true },
                    { name: "😊 Emojis", value: `${guild.emojis.cache.size}`, inline: true }
                )
                .setFooter({ text: `Solicitado por ${int.user.username}` })
                .setTimestamp();

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("❌ Error al obtener información del servidor.");
        }
    }
};