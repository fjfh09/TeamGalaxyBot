import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionsBitField, EmbedBuilder, MessageFlags } from 'discord.js';
import { dbService } from "../../Services/DatabaseService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("r29_activar")
        .setDescription("Activas o Desactivas la notificación de r29")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addStringOption(option =>
            option.setName("eleccion")
                .setDescription("Escoge tu elección")
                .setRequired(true)
                .addChoices(
                    { name: "Si", value: "Si" },
                    { name: "No", value: "No" }
                )
        ),

    async run(client, int) {
        const eleccion = int.options.getString("eleccion");
        const activo = eleccion === "Si" ? 1 : 0;
        const mensaje = eleccion === "Si" ? "Activada" : "Desactivada";
        const color = eleccion === "Si" ? 0x008000 : 0xFF0000;

        try {
            await dbService.bot.run(`UPDATE brawlopciones SET activo = ? WHERE id = 1`, [activo]);
            
            const embed = new EmbedBuilder()
                .setDescription(`${mensaje} la notificación para r29`)
                .setColor(color);
            
            return int.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });

        } catch (err) {
            console.error(err);
            return int.reply({ content: "Error al actualizar la base de datos", flags: MessageFlags.Ephemeral });
        }
    }
};