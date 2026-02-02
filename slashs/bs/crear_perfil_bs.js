import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags } from 'discord.js';
import { dbService } from "../../Services/DatabaseService.js";
import { brawlService } from "../../Services/BrawlStarsService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("crear_perfil_bs")
        .setDescription("Te creas un perfil donde se guardara tu perfil de Brawl Stars")
        .addStringOption(option =>
            option.setName("tag")
                .setDescription("Pon el tag de tu perfil de Brawl Stars")
                .setRequired(true)
        ),

    async run(client, int) {
        await int.deferReply({ flags: MessageFlags.Ephemeral });

        const user_id = int.member.id;
        const raw_tag = int.options.getString("tag");
        const bs_tag = (raw_tag.startsWith("#") ? raw_tag.toUpperCase() : "#" + raw_tag.toUpperCase()).replace(/O/g, "0");

        try {
            // Check if user exists in DB
            const existingUser = await dbService.bot.get(`SELECT * FROM usuariosbrawl WHERE id = ?`, [user_id]);

            // Validate Tag via API
            try {
                const jugador = await brawlService.getPlayer(bs_tag, true); // Force update to ensure valid tag

                // Success Embed
                const embedSuccess = new EmbedBuilder()
                    .setThumbnail(int.guild.iconURL({ dynamic: true }))
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0xFFFB00)
                    .setTitle(`${jugador.name} | ${jugador.tag}`)
                    .setDescription(`**¡Perfil guardado satisfactoriamente!**\n\nTrofeos: ${jugador.trophies.toLocaleString('es-ES')} 🏆\n\nHas sido registrado correctamente en la base de datos.`)
                    .setFooter({ text: `Solicitado por: ${int.member.displayName}` });

                if (existingUser) {
                    // Update
                    await dbService.bot.run(`UPDATE usuariosbrawl SET tag = ? WHERE id = ?`, [jugador.tag, user_id]);
                } else {
                    // Insert
                    await dbService.bot.run(`INSERT INTO usuariosbrawl(id, tag) VALUES(?, ?)`, [user_id, jugador.tag]);
                }

                // Add Role (if configured)
                try {
                    await int.member.roles.add("1253637489256693820");
                } catch (roleError) {
                    console.warn(`Could not add role to ${int.member.displayName}:`, roleError.message);
                }

                await int.editReply({ embeds: [embedSuccess] });

                // Audit Log (Private DM to owner/log)
                try {
                    const owner = await client.users.fetch('739203308991807518');
                    if (owner) {
                        owner.send(`${int.member.displayName} se ha registrado con la cuenta **${jugador.name}** (${jugador.tag}).`);
                    }
                } catch (dmError) {
                    // Ignore DM errors
                }

            } catch (apiError) {
                if (apiError.status === 404) {
                    const embedNotFound = new EmbedBuilder()
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0xFFFB00)
                        .setTitle("Usuario no encontrado")
                        .setDescription(`El usuario de Brawl Stars con tag **${bs_tag}** no existe.\nVerifica que lo has escrito bien (el tag está en tu perfil de juego, debajo de tu foto).`)
                        .setFooter({ text: `Solicitado por: ${int.member.displayName}` });
                    return int.editReply({ embeds: [embedNotFound] });
                } else if (apiError.status === 503) {
                     const embedMaint = new EmbedBuilder()
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0xFF0000)
                        .setDescription(`:bangbang: **Brawl Stars está en Mantenimiento** :bangbang:\nInténtalo más tarde.`)
                        .setFooter({ text: `Solicitado por: ${int.member.displayName}` });
                    return int.editReply({ embeds: [embedMaint] });
                } else {
                    throw apiError; // Rethrow other errors
                }
            }

        } catch (error) {
            console.error("Error in crear_perfil_bs:", error);
            const embedError = new EmbedBuilder()
                .setAuthor({ name: 'Team Galaxy' })
                .setColor(0xFF0000)
                .setDescription(`:bangbang: **Error inesperado**\nOcurrió un error al procesar tu solicitud.`)
                .setFooter({ text: `Solicitado por: ${int.member.displayName}` });
            
            if (int.deferred || int.replied) {
                await int.editReply({ embeds: [embedError] });
            } else {
                await int.reply({ embeds: [embedError], flags: MessageFlags.Ephemeral });
            }
        }
    }
}