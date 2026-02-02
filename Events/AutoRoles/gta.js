import { Events, MessageFlags } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== "gta") return;

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const rolid = "1344235107766239242";
        const role = interaction.guild.roles.cache.get(rolid);

        if (!role) {
            return interaction.editReply("❌ El rol de GTA no existe o ha sido eliminado.");
        }

        try {
            if (!interaction.member.roles.cache.has(rolid)) {
                await interaction.member.roles.add(rolid);
                await interaction.editReply("✅ Chat de GTA y canal de voz habilitados.");
            } else {
                await interaction.member.roles.remove(rolid);
                await interaction.editReply("✅ Chat de GTA y canal de voz deshabilitados.");
            }
        } catch (error) {
            console.error('Error al modificar el rol:', error);
            await interaction.editReply("❌ Error al modificar el rol. Verifica mis permisos.");
        }
    }
};
