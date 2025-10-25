const Discord = require('discord.js');
const { MessageFlags } = require('discord.js');
module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    if (interaction.isButton()) {
      let rolid;

      switch (interaction.customId) {
        case "1c":
          rolid = "701142143988793445";
          break;
        case "2c":
          rolid = "700328143394832435";
          break;
        case "3c":
          rolid = "739819152130441278";
          break;
        case "4c":
          rolid = "743136692172619848";
          break;
        case "5c":
          rolid = "891633479907962900";
          break;
        case "6c":
          rolid = "891633655200501772";
          break;
        case "7c":
          rolid = "913144606386950144";
          break;
        case "0c":
          rolid = "690527183910862879";
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
          await interaction.member.roles.add("910183222833467523");
          interaction.reply({ content: `Ya formas parte de los <@&${rolid}>`, flags: MessageFlags.Ephemeral });
        } else {
          await interaction.member.roles.remove(rolid);
          await interaction.member.roles.remove("910183222833467523");
          interaction.reply({ content: `Ya no formas parte de los <@&${rolid}>`, flags: MessageFlags.Ephemeral });
        }
      } catch (error) {
        console.error('Error al modificar el rol:', error);
        interaction.reply({ content: 'Hubo un error al modificar tu rol. Por favor, contacta a un administrador.', flags: MessageFlags.Ephemeral });
      }
    }
  }
};
