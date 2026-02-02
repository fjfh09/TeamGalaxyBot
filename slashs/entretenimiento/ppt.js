import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ppt")
        .setDescription("Juega Piedra, Papel o Tijeras contra el bot")
        .addStringOption(option =>
            option.setName("eleccion")
                .setDescription("Tu elección")
                .setRequired(true)
                .addChoices(
                    { name: "Piedra 👊", value: "Piedra" },
                    { name: "Papel 📃", value: "Papel" },
                    { name: "Tijeras ✂️", value: "Tijeras" }
                )
        ),

    async run(client, int) {
        await int.deferReply();

        const userChoice = int.options.getString("eleccion");
        const options = ["Piedra", "Papel", "Tijeras"];
        const botChoice = options[Math.floor(Math.random() * options.length)];

        const emojis = { "Piedra": "👊", "Papel": "📃", "Tijeras": "✂️" };
        
        let result;
        if (userChoice === botChoice) {
            result = "🔆 ¡EMPATE! 🔆";
        } else if (
            (userChoice === "Piedra" && botChoice === "Tijeras") ||
            (userChoice === "Papel" && botChoice === "Piedra") ||
            (userChoice === "Tijeras" && botChoice === "Papel")
        ) {
            result = "✅ ¡GANASTE! ✅";
        } else {
            result = "❌ ¡PERDISTE! ❌";
        }

        const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setTitle(result)
            .addFields(
                { name: "Tu elección", value: `${userChoice} ${emojis[userChoice]}`, inline: true },
                { name: "Mi elección", value: `${botChoice} ${emojis[botChoice]}`, inline: true }
            )
            .setFooter({ text: `${int.user.username} vs Bot` })
            .setTimestamp();

        await int.editReply({ embeds: [embed] });
    }
};