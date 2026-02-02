import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("embed_user")
        .setDescription("Crea un embed simulando ser tu usuario")
        .addStringOption(option =>
            option.setName("titulo")
                .setDescription("Título del embed")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("descripcion")
                .setDescription("Descripción del embed")
                .setRequired(true)
        ),

    async run(client, int) {
        await int.deferReply({ flags: MessageFlags.Ephemeral });

        const titulo = int.options.getString("titulo");
        const descripcion = int.options.getString("descripcion");
        let webhook;

        try {
            webhook = await int.channel.createWebhook({
                name: int.member.displayName,
                avatar: int.member.user.displayAvatarURL({ dynamic: true }),
            });

            const embed = new EmbedBuilder()
                .setTitle(titulo)
                .setDescription(descripcion)
                .setThumbnail(int.guild.iconURL({ dynamic: true }))
                .setColor("Random")
                .setFooter({ text: `Embed creado por ${int.member.displayName}` })
                .setTimestamp();

            await webhook.send({
                embeds: [embed],
                username: int.member.displayName,
                avatarURL: int.member.user.displayAvatarURL({ dynamic: true }),
            });

            await int.editReply("✅ Embed enviado correctamente.");

        } catch (error) {
            console.error('Error con webhook:', error);
            await int.editReply("❌ Hubo un error al crear el embed.");
        } finally {
            if (webhook) {
                try {
                    await webhook.delete('Limpieza post-comando');
                } catch (e) {
                    // Ignore deletion errors
                }
            }
        }
    }
};