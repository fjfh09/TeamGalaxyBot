const { Discord, MessageFlags } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    if (interaction.isButton()) {
      let rolid;

      switch (interaction.customId) {
        case "gta":
          rolid = "1344235107766239242";
          break;
        default:
          return; // No hace nada si el customId no coincide con ninguno de los casos
      }

      const role = interaction.guild.roles.cache.get(rolid);

      if (!role) {
        return interaction.reply({ content: `El rol con ID ${rolid} no existe.`, ephemeral: true });
      }

      try {
        if (!interaction.member.roles.cache.has(rolid)) {
          await interaction.member.roles.add(rolid);
          interaction.reply({ content: `Ya tienes habilitado tu chat de GTA y tu canal de voz`, flags: MessageFlags.Ephemeral });
        } else {
          await interaction.member.roles.remove(rolid);
          interaction.reply({ content: `Se te deshabilitaron tu chat de GTA y tu canal de voz`, flags: MessageFlags.Ephemeral });        }
      } catch (error) {
        console.error('Error al modificar el rol:', error);
        interaction.reply({ content: 'Hubo un error al modificar tu rol. Por favor, contacta a un administrador.', ephemeral: true });
      }
    }
  }
};
