import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags } from "discord.js";
import { brawlService } from "../../Services/BrawlStarsService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("clubes_e")
        .setDescription("Te muestro las estadisticas y el top de los clubes de Brawl Stars"),

    async run(client, int) {
        await int.deferReply();

        try {
            const clubTags = [
                process.env.TAG_I, process.env.TAG_II, process.env.TAG_III,
                process.env.TAG_IV, process.env.TAG_V, process.env.TAG_VI, process.env.TAG_VII
            ];

            // Fetch Data in Parallel
            const [clubs, ranking] = await Promise.all([
                Promise.all(clubTags.map(tag => brawlService.getClub(tag))),
                brawlService.getRankingOfClubs("es")
            ]);

            // Calculate Stats
            let totalTrophies = 0, totalMembers = 0, totalReq = 0;
            const clubFields = [];

            clubs.forEach((club, index) => {
                totalTrophies += club.trophies;
                totalMembers += club.memberCount;
                totalReq += club.requiredTrophies;

                // Find Rank
                let rankIndex = ranking.findIndex(r => r.tag === club.tag);
                let rankStr = rankIndex === -1 ? "Sin Top" : `${rankIndex + 1} <a:spain:854090681830998097>`;

                clubFields.push({
                    name: club.name,
                    value: `🏆 ${club.trophies.toLocaleString('es-ES')}\n🏆 Req: ${club.requiredTrophies.toLocaleString('es-ES')}\n👥 ${club.memberCount}/30\n🏅 ${rankStr}`,
                    inline: true
                });
            });

            const avgTrophies = (totalTrophies / 7).toFixed(2);
            const avgReq = (totalReq / 7).toFixed(2);
            const avgMembers = (totalMembers / 7).toFixed(2);

            // Fetch Message to Edit (Specific Legacy Feature)
            try {
                const channel = await client.channels.fetch("909445252199374938");
                if (channel) {
                    const msg = await channel.messages.fetch("1082383206176784504");
                    if (msg) {
                        const embedGeneral = new EmbedBuilder()
                            .setAuthor({ name: 'Team Galaxy' })
                            .setTitle(`Estadisticas de los clubes de Mystic Galaxy | Descripción General\n`)
                            .setColor(0xFFFB00)
                            .addFields(
                                { name: `Nº Clubes`, value: `\n7`, inline: true },
                                { name: `Trofeos Totales`, value: `\n🏆 ${totalTrophies.toLocaleString('es-ES')}`, inline: true },
                                { name: `Media de Trofeos`, value: `\n🏆 ${parseFloat(avgTrophies).toLocaleString('es-ES')}`, inline: true },
                                { name: `Media de Trofeos Req.`, value: `\n🏆 ${parseFloat(avgReq).toLocaleString('es-ES')}`, inline: true },
                                { name: `Miembros Totales`, value: `\n👥 ${totalMembers}/210`, inline: true },
                                { name: `Media de Miembros`, value: `\n👥 ${parseFloat(avgMembers).toLocaleString('es-ES')}/30`, inline: true },
                            );

                        const embedClubs = new EmbedBuilder()
                            .setAuthor({ name: 'Team Galaxy' })
                            .setColor(0xFFFB00)
                            .setTitle(`Estadisticas de los clubes de Mystic Galaxy\n`)
                            .addFields(clubFields)
                            .setFooter({ text: `Actualizado por ${int.member.displayName} | Última Actualización` })
                            .setTimestamp();

                        await msg.edit({ embeds: [embedGeneral, embedClubs] });
                        console.log(`Editado el mensaje de estadísticas por ${int.member.displayName}`);
                    }
                }
            } catch (e) {
                console.warn("No se pudo editar el mensaje de estadísticas (canal/mensaje no encontrado o sin permisos).", e.message);
            }

            // Reply to User
            const embedSuccess = new EmbedBuilder()
                .setThumbnail(int.guild.iconURL({ dynamic: true }))
                .setAuthor({ name: 'Team Galaxy' })
                .setColor(0xFFFB00)
                .setTitle(`Se han actualizado las estadisticas de los clubes`)
                .setDescription("Puedes verlas en <#909445252199374938>")
                .setFooter({ text: `Solicitado por: ${int.member.displayName}` });

            await int.editReply({ embeds: [embedSuccess] });

        } catch (error) {
            console.error(error);
            const embedError = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy' })
                .setColor(0xFF0000)
                .setDescription(error.status === 503 ? `:bangbang: Brawl Stars en Mantenimiento` : `:bangbang: Error al actualizar estadísticas`)
                .setFooter({ text: `Solicitado por: ${int.member.displayName}` });
            
            await int.editReply({ embeds: [embedError] });
        }
    }
};