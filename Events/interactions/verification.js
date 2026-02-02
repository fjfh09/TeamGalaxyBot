import { Events, MessageFlags } from "discord.js";

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== "verificate") return;

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        // Role ID from slashs/bs/anadir_rol_verificado.js
        const roleId = "1253637489256693820"; 
        
        try {
            const role = interaction.guild.roles.cache.get(roleId);
            if (!role) {
                return interaction.editReply("❌ El rol de verificación no está configurado correctamente.");
            }

            if (interaction.member.roles.cache.has(roleId)) {
                await interaction.member.roles.remove(roleId);
                await interaction.editReply("❌ Te has quitado el verificado.");
            } else {
                await interaction.member.roles.add(roleId);
                await interaction.editReply("✅ ¡Te has verificado correctamente!");
            }

        } catch (error) {
            console.error("Verification Error:", error);
            await interaction.editReply("❌ Ocurrió un error al intentar verificarte.");
        }
    }
};
