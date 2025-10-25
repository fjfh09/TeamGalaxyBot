const { Discord, MessageFlags } = require('discord.js');
module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (interaction.isButton()) {
            let rolid;

            switch (interaction.customId) {
                case "A.o":
                    rolid = "786704348519464960";
                    break;
                case "A":
                    rolid = "786703088425762846";
                    break;
                case "B":
                    rolid = "786702673100800000";
                    break;
                case "A.a":
                    rolid = "786703187552894987";
                    break;
                case "R.o":
                    rolid = "786703285473640458";
                    break;
                case "V":
                    rolid = "786703508493041714";
                    break;
                case "M":
                    rolid = "786703645101129788";
                    break;
                case "N.a":
                    rolid = "786704123054522368";
                    break;
                case "V.o":
                    rolid = "786704731384709151";
                    break;
                case "G":
                    rolid = "786703415983341579";
                    break;
                case "R":
                    rolid = "786702971001241621";
                    break;
                case "M.a":
                    rolid = "786709556885323778";
                    break;
                case "N":
                    rolid = "786709742956445738";
                    break;
                case "T":
                    rolid = "789567820098043924";
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
                    interaction.reply({ content: `Ya te puse el color <@&${rolid}>`, flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.member.roles.remove(rolid);
                    interaction.reply({ content: `Ya te quite el color <@&${rolid}>`, flags: MessageFlags.Ephemeral });
                }
            } catch (error) {
                console.error('Error al modificar el rol:', error);
                interaction.reply({ content: 'Hubo un error al modificar tu rol. Por favor, contacta a un administrador.', flags: MessageFlags.Ephemeral });
            }
        }
    }
};
