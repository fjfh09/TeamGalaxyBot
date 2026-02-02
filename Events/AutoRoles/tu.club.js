import { Events, MessageFlags } from 'discord.js';

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(client, interaction) {
    if (!interaction.isButton()) return;
    
    // Check if it's one of our club buttons
    const validIds = ["1c", "2c", "3c", "4c", "5c", "6c", "7c", "0c"];
    if (!validIds.includes(interaction.customId)) return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    let rolid;
    switch (interaction.customId) {
      case "1c": rolid = "701142143988793445"; break;
      case "2c": rolid = "700328143394832435"; break;
      case "3c": rolid = "739819152130441278"; break;
      case "4c": rolid = "743136692172619848"; break;
      case "5c": rolid = "891633479907962900"; break;
      case "6c": rolid = "891633655200501772"; break;
      case "7c": rolid = "913144606386950144"; break;
      case "0c": rolid = "690527183910862879"; break;
    }

    const role = interaction.guild.roles.cache.get(rolid);
    if (!role) {
      return interaction.editReply("❌ El rol no existe.");
    }
    
    const secondaryRole = "910183222833467523";

    try {
      if (!interaction.member.roles.cache.has(rolid)) {
        await interaction.member.roles.add(rolid);
        await interaction.member.roles.add(secondaryRole).catch(() => {});
        await interaction.editReply(`✅ Te has unido al club <@&${rolid}>`);
      } else {
        await interaction.member.roles.remove(rolid);
        await interaction.member.roles.remove(secondaryRole).catch(() => {});
        await interaction.editReply(`🗑️ Te has salido del club <@&${rolid}>`);
      }
    } catch (error) {
      console.error('Error al modificar el rol:', error);
      await interaction.editReply("❌ Error al modificar el rol.");
    }
  }
};
