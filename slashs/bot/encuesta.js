import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("encuesta")
        .setDescription("Crea una encuesta pública")
        .addStringOption(o => o.setName("pregunta").setDescription("La pregunta").setRequired(true))
        .addStringOption(o => o.setName("opcion_a").setDescription("Opción A").setRequired(true))
        .addStringOption(o => o.setName("opcion_b").setDescription("Opción B").setRequired(true))
        .addStringOption(o => o.setName("opcion_c").setDescription("Opción C").setRequired(false))
        .addStringOption(o => o.setName("opcion_d").setDescription("Opción D").setRequired(false))
        .addStringOption(o => o.setName("opcion_e").setDescription("Opción E").setRequired(false)),

    async run(client, int) {
        await int.deferReply();

        const pregunta = int.options.getString("pregunta");
        const opts = [
            { text: int.options.getString("opcion_a"), emoji: "🇦" },
            { text: int.options.getString("opcion_b"), emoji: "🇧" },
            { text: int.options.getString("opcion_c"), emoji: "🇨" },
            { text: int.options.getString("opcion_d"), emoji: "🇩" },
            { text: int.options.getString("opcion_e"), emoji: "🇪" }
        ].filter(o => o.text);

        const descripcion = opts.map(o => `${o.emoji} ${o.text}`).join("\n\n");

        const embed = new EmbedBuilder()
            .setTitle(`📊 ${pregunta}`)
            .setDescription(descripcion)
            .setColor(0x0A69CF)
            .setFooter({ text: `Encuesta iniciada por ${int.member.displayName}` });

        const msg = await int.editReply({ embeds: [embed] });

        for (const o of opts) {
            await msg.react(o.emoji);
        }
    }
};