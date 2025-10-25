const Discord = require('discord.js');
const { MessageFlags } = require('discord.js');
module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    if (interaction.isButton()) {
      let rolid;

      switch (interaction.customId) {
        case "madrid":
          rolid = "730555751361282059";
          break;
        case "espanyol":
          rolid = "761958561315422249";
          break;
        case "betis":
          rolid = "789876948171620432";
          break;
        case "valencia":
          rolid = "789876951828922399";
          break;
        case "villareal":
          rolid = "906916161696989194";
          break;
        case "barsa":
          rolid = "730555857267589120";
          break;
        case "granada":
          rolid = "789876940152504340";
          break;
        case "sevilla":
          rolid = "789876955461451826";
          break;
        case "celta":
          rolid = "789876936003289099";
          break;
        case "levante":
          rolid = "906915432743718912";
          break;
        case "Atl.madrid":
          rolid = "789881356925927446";
          break;
        case "r.sociedad":
          rolid = "789880590580449350";
          break;
        case "bilbao":
          rolid = "789885892504322059";
          break;
        case "osasuna":
          rolid = "906919065396846673";
          break;
        case "rayo":
          rolid = "906919211106971688";
          break;
        default:
          return; // No hace nada si el customId no coincide con ninguno de los casos
      }

      const role = interaction.guild.roles.cache.get(rolid);

      if (!role) {
        return interaction.reply({ content: `El rol con ID ${rolid} no existe.`, flags: MessageFlags.Ephemeral });
      }

      try {
        if (!interaction.member.roles.cache.has(rolid)) {
          await interaction.member.roles.add(rolid);
          interaction.reply({ content: `Ya formas parte de los <@&${rolid}>`, flags: MessageFlags.Ephemeral });
        } else {
          await interaction.member.roles.remove(rolid);
          interaction.reply({ content: `Ya no formas parte de los <@&${rolid}>`, flags: MessageFlags.Ephemeral });
        }
      } catch (error) {
        console.error('Error al modificar el rol:', error);
        interaction.reply({ content: 'Hubo un error al modificar tu rol. Por favor, contacta a un administrador.', flags: MessageFlags.Ephemeral });
      }
    }
  }
};
