import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Muestra la latencia del bot"),

    async run(client, int) {
        await int.deferReply();
        const start = Date.now();
        
        // Calculate DB latency (optional, requires async op, sticking to WS ping + roundtrip for now)
        const embed = new EmbedBuilder()
            .setColor(0x0A69CF)
            .setTitle("🏓 Pong!")
            .setDescription(`**Latencia Websocket:** ${client.ws.ping}ms\n**Respuesta API:** ${Date.now() - int.createdTimestamp}ms`)
            .setFooter({ text: `Solicitado por ${int.user.username}` })
            .setTimestamp();

        await int.editReply({ embeds: [embed] });
    }
};