const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { PermissionsBitField } = require('discord.js');
const { MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed_user")
        .setDescription("Crea un embed con tu usuario")
        .addStringOption(option =>
            option.setName("titulo")
                .setDescription("Especifica el titulo del embed")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("descripcion")
                .setDescription("Especifica la descripcion del embed")
                .setRequired(true)
        ),

    async run(client, int) {
        let creador = int.user.tag;

        const titulo = int.options.getString("titulo")
        const descripcion = int.options.getString("descripcion")

        try {
            // Crear el webhook
            const webhook = await int.channel.createWebhook({
                name: `${int.member.displayName}`,
                avatar: int.member.user.displayAvatarURL({ dynamic: true }),
            });

            const embed = new Discord.EmbedBuilder()
                .setTitle(`${titulo}`)
                .setDescription(`${descripcion}`)
                .setThumbnail(int.guild.iconURL({ dynamic: true }))
                .setColor("Random")
                .setFooter({ text: `Embed creado por ${int.member.displayName} | Creado por fjfh` })
                .setTimestamp()

            // Usar el webhook para enviar un mensaje
            await webhook.send({
                embeds: [embed],
                username: `${int.member.displayName}`,
                avatarURL: int.member.user.displayAvatarURL({ dynamic: true }),
            });

            // Eliminar el webhook
            await webhook.delete('Webhook eliminado después de enviar el mensaje');

            // Confirmar al usuario que el webhook fue creado, usado y eliminado
            int.reply({ content: 'Embed creado correctamente', flags: MessageFlags.Ephemeral });
        } catch (error) {
            console.error('Error al crear, usar o eliminar el webhook:', error);
            int.reply({ content: 'Hubo un error al crear el embed', flags: MessageFlags.Ephemeral });
        }
    }
}