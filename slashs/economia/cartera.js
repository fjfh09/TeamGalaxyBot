import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("cartera")
        .setDescription("Revisa tu crédito del casino"),

    async run(client, int) {
        await int.deferReply();

        try {
            const user = await dbService.cartera.get("SELECT * FROM usuarios WHERE id = ?", [int.member.id]);
            const monedas = user ? user.monedas : 0;

            if (monedas <= 0) {
                return int.editReply({ 
                    embeds: [new EmbedBuilder()
                        .setDescription(`💸 **¡Estás en bancarrota! No tienes monedas.**`)
                        .setColor(0x95F5FC)
                    ]
                });
            }

            const embed = new EmbedBuilder()
                .setDescription(`**:credit_card: __CARTERA DEL CASINO__**\n\n**Monedas:** ${monedas} 💠`)
                .setColor(0x95F5FC)
                .setThumbnail(int.user.displayAvatarURL())
                .setTimestamp();

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("❌ Error al consultar la cartera.");
        }
    }
};