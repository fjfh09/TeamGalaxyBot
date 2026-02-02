import { Events, MessageFlags } from 'discord.js';

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(client, interaction) {
    if (!interaction.isButton()) return;
    
    let rolid;
    // Map customIds to role IDs
    const roles = {
      "madrid": "730555751361282059",
      "espanyol": "761958561315422249",
      "betis": "789876948171620432",
      "valencia": "789876951828922399",
      "villareal": "906916161696989194",
      "barsa": "730555857267589120",
      "granada": "789876940152504340",
      "sevilla": "789876955461451826",
      "celta": "789876936003289099",
      "levante": "906915432743718912",
      "Atl.madrid": "789881356925927446",
      "r.sociedad": "789880590580449350",
      "bilbao": "789885892504322059",
      "osasuna": "906919065396846673",
      "rayo": "906919211106971688"
    };

    if (roles[interaction.customId]) {
      rolid = roles[interaction.customId];
    } else {
      return;
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const role = interaction.guild.roles.cache.get(rolid);
    if (!role) {
      return interaction.editReply("❌ El rol no existe.");
    }

    try {
      if (!interaction.member.roles.cache.has(rolid)) {
        await interaction.member.roles.add(rolid);
        await interaction.editReply(`✅ Te has unido a <@&${rolid}>`);
      } else {
        await interaction.member.roles.remove(rolid);
        await interaction.editReply(`🗑️ Te has salido de <@&${rolid}>`);
      }
    } catch (error) {
      console.error('Error al modificar el rol:', error);
      await interaction.editReply("❌ Error al modificar el rol.");
    }
  }
};
