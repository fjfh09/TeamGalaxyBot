import { SlashCommandBuilder } from "@discordjs/builders"
import Discord from "discord.js"
import { ButtonStyle } from 'discord.js';
import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
    .setName("formulario")
    .setDescription("Dame ideas para mejorarme"),

    async run(client, int){
        const modal = new ModalBuilder()
			.setCustomId('ideas')
			.setTitle('Ideas para el servidor y TG Bot');

            const quieneres = new TextInputBuilder()
			.setCustomId('quieneres')
		    // The label is the prompt the user sees for this input
			.setLabel("Quien eres?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short)
            .setPlaceholder('Escribe tu nombre')
            .setRequired(true);

            const erroresbot = new TextInputBuilder()
			.setCustomId('erroresbot')
			.setLabel("Errores del bot")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Escribe los errores que conozcas del bot')
            .setRequired(true);

            const comandosbot = new TextInputBuilder()
			.setCustomId('comandosbot')
			.setLabel("Sugerencias de comandos para el bot")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Sugiere comandos para añadirselos al bot')
            .setRequired(true);

            const server = new TextInputBuilder()
			.setCustomId('server')
			.setLabel("Sugerencias para el servidor")
		    // Paragraph means multiple lines of text.
            .setPlaceholder('Sugiere ideas para el servidor')
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const unoActionRow = new ActionRowBuilder().addComponents(quieneres);
		    const dosActionRow = new ActionRowBuilder().addComponents(erroresbot);
            const tresActionRow = new ActionRowBuilder().addComponents(comandosbot);
            const cuatroActionRow = new ActionRowBuilder().addComponents(server);

            modal.addComponents(unoActionRow, dosActionRow, tresActionRow, cuatroActionRow);

            await int.showModal(modal);
    }
}