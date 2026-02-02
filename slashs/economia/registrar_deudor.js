import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("registrar_deudor")
        .setDescription("Registra una deuda pendiente")
        .addStringOption(option =>
            option.setName("nombre")
                .setDescription("Nombre de la persona que te debe dinero")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("cantidad")
                .setDescription("Cantidad que te debe")
                .setRequired(true)
                .setMinValue(1)
        ),

    async run(client, int) {
        await int.deferReply();

        const nombre = int.options.getString("nombre");
        const cantidad = int.options.getInteger("cantidad");
        const ownerId = int.user.id;

        try {
            await dbService.cartera.run(
                "INSERT INTO deudores (owner_id, debtor_name, amount) VALUES (?, ?, ?)",
                [ownerId, nombre, cantidad]
            );

            const embed = new EmbedBuilder()
                .setTitle("🧾 Deuda Registrada")
                .setDescription(`Se ha registrado que **${nombre}** te debe **${cantidad}** monedas.`)
                .setColor("Green")
                .setTimestamp();

            await int.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await int.editReply("❌ Error al registrar la deuda.");
        }
    }
};
