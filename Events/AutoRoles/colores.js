import { Events, MessageFlags } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (!interaction.isButton()) return;
        
        // Check if it's one of our color buttons.
        // The CustomIDs are specific: "A.o", "A", etc.
        const validIds = ["A.o", "A", "B", "A.a", "R.o", "V", "M", "N.a", "V.o", "G", "R", "M.a", "N", "T"];
        if (!validIds.includes(interaction.customId)) return;

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        let rolid;
        switch (interaction.customId) {
            case "A.o": rolid = "786704348519464960"; break;
            case "A": rolid = "786703088425762846"; break;
            case "B": rolid = "786702673100800000"; break;
            case "A.a": rolid = "786703187552894987"; break;
            case "R.o": rolid = "786703285473640458"; break;
            case "V": rolid = "786703508493041714"; break;
            case "M": rolid = "786703645101129788"; break;
            case "N.a": rolid = "786704123054522368"; break;
            case "V.o": rolid = "786704731384709151"; break;
            case "G": rolid = "786703415983341579"; break;
            case "R": rolid = "786702971001241621"; break;
            case "M.a": rolid = "786709556885323778"; break;
            case "N": rolid = "786709742956445738"; break;
            case "T": rolid = "789567820098043924"; break;
        }

        const role = interaction.guild.roles.cache.get(rolid);
        if (!role) {
            return interaction.editReply("❌ El rol no existe o ha sido eliminado.");
        }

        try {
            if (!interaction.member.roles.cache.has(rolid)) {
                await interaction.member.roles.add(rolid);
                await interaction.editReply(`✅ **Añadido:** ${role.name}`);
            } else {
                await interaction.member.roles.remove(rolid);
                await interaction.editReply(`🗑️ **Quitado:** ${role.name}`);
            }
        } catch (error) {
            console.error('Error al modificar el rol:', error);
            await interaction.editReply('❌ Hubo un error al modificar tu rol. Verifica mis permisos.');
        }
    }
};
