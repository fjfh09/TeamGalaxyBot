import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("lista_deudores")
        .setDescription("Muestra la lista de personas que te deben dinero"),

    async run(client, int) {
        await int.deferReply();
        const ownerId = int.user.id;

        try {
            const deudores = await dbService.cartera.all(
                "SELECT * FROM deudores WHERE owner_id = ?",
                [ownerId]
            );

            if (!deudores || deudores.length === 0) {
                return int.editReply({ 
                    embeds: [new EmbedBuilder()
                        .setDescription("✅ **¡Nadie te debe dinero!** (O no has registrado a nadie)")
                        .setColor("Green")
                    ]
                });
            }

            let description = deudores.map((d, index) => 
                `**${index + 1}.** ${d.debtor_name}: **${d.amount}** 💰`
            ).join("\n");

            const total = deudores.reduce((acc, curr) => acc + curr.amount, 0);

            const embed = new EmbedBuilder()
                .setTitle("📋 Lista de Deudores")
                .setDescription(description)
                .addFields({ name: "Total Pendiente", value: `${total} 💰` })
                .setColor("Yellow")
                .setFooter({ text: "Usa /pagar_deuda para borrar una deuda" });

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("❌ Error al obtener la lista de deudores.");
        }
    }
};
