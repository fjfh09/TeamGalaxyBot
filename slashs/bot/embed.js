import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags, PermissionsBitField } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Crea y envía un embed al canal actual")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
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
        const titulo = int.options.getString("titulo");
        const descripcion = int.options.getString("descripcion");

        const embed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(descripcion)
            .setThumbnail(int.guild.iconURL({ dynamic: true }))
            .setColor("Blue")
            .setFooter({ text: `Creado por ${int.user.tag}` })
            .setTimestamp();

        try {
            await int.channel.send({ embeds: [embed] });
            await int.reply({ content: "✅ Embed enviado correctamente.", flags: MessageFlags.Ephemeral });
        } catch (e) {
            await int.reply({ content: "❌ Error al enviar el embed (¿tengo permisos?).", flags: MessageFlags.Ephemeral });
        }
    }
};