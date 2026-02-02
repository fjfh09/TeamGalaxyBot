import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Muestra el avatar de un usuario")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Usuario (opcional)")
                .setRequired(false)
        ),

    async run(client, int) {
        await int.deferReply();
        
        const user = int.options.getUser("usuario") || int.user;
        
        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor(0x00FF08)
            .setFooter({ text: `Solicitado por ${int.member.displayName}` })
            .setTimestamp();

        await int.editReply({ embeds: [embed] });
    }
};