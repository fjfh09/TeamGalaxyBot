import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";

const workCooldowns = new Set();

export default {
    data: new SlashCommandBuilder()
        .setName("trabajar")
        .setDescription("Trabaja para ganar algunas monedas"),

    async run(client, int) {
        if (workCooldowns.has(int.user.id)) {
            return int.reply({ content: "⏳ Debes descansar 1 hora antes de volver a trabajar.", ephemeral: true });
        }
        
        await int.deferReply();

        const earnings = Math.floor(Math.random() * 401) + 100; // 100-500 coins
        workCooldowns.add(int.user.id);
        setTimeout(() => workCooldowns.delete(int.user.id), 3600000); // 1 hour

        try {
            const user = await dbService.cartera.get("SELECT * FROM usuarios WHERE id = ?", [int.user.id]);
            
            if (!user) {
                await dbService.cartera.run("INSERT INTO usuarios(id, monedas) VALUES(?, ?)", [int.user.id, earnings]);
            } else {
                await dbService.cartera.run("UPDATE usuarios SET monedas = monedas + ? WHERE id = ?", [earnings, int.user.id]);
            }

            const jobs = ["programador", "camarero", "minero", "youtuber", "taxista"];
            const job = jobs[Math.floor(Math.random() * jobs.length)];

            const embed = new EmbedBuilder()
                .setTitle("💼 ¡Has trabajado duramente!")
                .setDescription(`Trabajaste como **${job}** y ganaste **${earnings}** monedas.`)
                .setColor("Green")
                .setTimestamp();

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            workCooldowns.delete(int.user.id); // Refund cooldown on error
            await int.editReply("❌ Error al procesar tu trabajo.");
        }
    }
};
