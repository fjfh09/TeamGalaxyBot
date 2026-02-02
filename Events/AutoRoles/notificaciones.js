import { Events, MessageFlags } from 'discord.js';

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(client, interaction) {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "notificacion") return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const rolid = "877985534226616330";
    const role = interaction.guild.roles.cache.get(rolid);

    if (!role) {
      return interaction.editReply("❌ El rol de notificaciones no existe.");
    }

    try {
      if (!interaction.member.roles.cache.has(rolid)) {
        await interaction.member.roles.add(rolid);
        await interaction.editReply("✅ Ahora recibirás notificaciones.");
      } else {
        await interaction.member.roles.remove(rolid);
        await interaction.editReply("🔕 Ya no recibirás notificaciones.");
      }
    } catch (error) {
      console.error('Error al modificar el rol:', error);
      await interaction.editReply("❌ Error al modificar el rol.");
    }
  }
};
