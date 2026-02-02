import { Events, MessageFlags } from 'discord.js';

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(client, interaction) {
    if (!interaction.isButton()) return;
    
    let rolid;
    if (interaction.customId === "futbol") rolid = "789868960992067586";
    else if (interaction.customId === "deporte") rolid = "789870047862456341";
    else return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const role = interaction.guild.roles.cache.get(rolid);
    if (!role) {
      return interaction.editReply("❌ El rol no existe.");
    }

    try {
      if (!interaction.member.roles.cache.has(rolid)) {
        await interaction.member.roles.add(rolid);
        await interaction.editReply(`✅ Añadido a los amantes de <@&${rolid}>`);
      } else {
        await interaction.member.roles.remove(rolid);
        await interaction.editReply(`🗑️ Quitado de los amantes de <@&${rolid}>`);
      }
    } catch (error) {
      console.error('Error al modificar el rol:', error);
      await interaction.editReply("❌ Error al modificar el rol.");
    }
  }
};
