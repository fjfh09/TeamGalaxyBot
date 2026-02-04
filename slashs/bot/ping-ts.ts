import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping-ts")
        .setDescription("Muestra la latencia del bot"),

    async run(client: Client, int: CommandInteraction) {
        await int.deferReply();
        const start = Date.now();
        
        const embed = new EmbedBuilder()
            .setColor(0x0A69CF)
            .setTitle("🏓 Pong!")
            .setDescription(`**Latencia Websocket:** ${client.ws.ping}ms\n**Respuesta API:** ${Date.now() - int.createdTimestamp}ms`)
            .setFooter({ text: `Solicitado por ${int.user.username}` })
            .setTimestamp();

        await int.editReply({ embeds: [embed] });
    }
};