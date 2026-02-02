import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("Muestra información detallada sobre el bot"),

    async run(client, int) {
        await int.deferReply();

        const serverCount = client.guilds.cache.size;
        const commandCount = client.slashCommands ? client.slashCommands.size : "70+";
        const ping = client.ws.ping;
        const emojiPin = "📌";
        const emojiStats = "📊";

        const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Información de ${client.user.username}`)
            .setDescription(
                `> ${emojiStats} \`|\` **Comandos:** \`${commandCount}\`\n> ${emojiPin} \`|\` **Servidores:** \`${serverCount}\`\n> 📶 \`|\` **Ping:** \`${ping}ms\`\n\n**Hola ${int.user.username}, para ver todos mis comandos usa** \`/ayuda\``
            )
            .setColor("#1A1A1A")
            .addFields({
                name: ":gear: • **Soporte**",
                value: "Si encuentras algún error o tienes dudas, contacta al staff en <#907349681108041778>."
            })
            .setFooter({ text: "Desarrollado por el equipo de Team Galaxy", iconURL: int.guild.iconURL() })
            .setTimestamp();

        await int.editReply({ embeds: [embed] });
    }
};