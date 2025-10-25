const Discord = require('discord.js');
const { MessageFlags } = require('discord.js');
module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    if (interaction.isButton()) {
      let rolid;

      switch (interaction.customId) {
        case "futbol":
          rolid = "789868960992067586";
          break;
        case "deporte":
          rolid = "789870047862456341";
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
          interaction.reply({ content: `Ya formas parte de la gente que le gusta: <@&${rolid}>`, flags: MessageFlags.Ephemeral });
        } else {
          await interaction.member.roles.remove(rolid);
          interaction.reply({ content: `Ya no formas parte de la gente que le gusta: <@&${rolid}>`, flags: MessageFlags.Ephemeral });
        }
      } catch (error) {
        console.error('Error al modificar el rol:', error);
        interaction.reply({ content: 'Hubo un error al modificar tu rol. Por favor, contacta a un administrador.', flags: MessageFlags.Ephemeral });
      }
    }
  }
};
