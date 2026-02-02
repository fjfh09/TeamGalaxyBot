import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags, PermissionsBitField } from "discord.js";
import ms from "ms";

export default {
    data: new SlashCommandBuilder()
        .setName("limpiar")
        .setDescription("Elimina mensajes del canal")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addIntegerOption(option =>
            option.setName("cantidad")
                .setDescription("Número de mensajes a borrar (1-100)")
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        ),

    async run(client, int) {
        await int.deferReply({ flags: MessageFlags.Ephemeral });
        const cantidad = int.options.getInteger("cantidad");

        try {
            const deleted = await int.channel.bulkDelete(cantidad, true);
            const count = deleted.size;
            
            let message = `✅ Se han borrado **${count}** mensajes.`;
            if (count < cantidad) {
                message += `\n⚠️ No se pudieron borrar ${cantidad - count} mensajes porque son mayores a 14 días.`;
            }

            await int.editReply(message);

        } catch (error) {
            console.error(error);
            await int.editReply("❌ Ocurrió un error al intentar borrar mensajes.");
        }
    }
};