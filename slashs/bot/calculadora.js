import { SlashCommandBuilder } from "@discordjs/builders";
import Discord from "discord.js";
import { ButtonStyle } from 'discord.js';
import * as math from "mathjs";

export default {
    data: new SlashCommandBuilder()
        .setName("calculadora")
        .setDescription("Usa la calculadora"),

    async run(client, interaction) {
        let resultado = 0;
        let calculo = [];
        let evalExp = [];

        const rows1 = [
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setCustomId("off").setLabel("OFF").setStyle(ButtonStyle.Danger),
                new Discord.ButtonBuilder().setCustomId("π").setLabel("π").setStyle(ButtonStyle.Primary),
                new Discord.ButtonBuilder().setCustomId("e").setLabel("e").setStyle(ButtonStyle.Primary),
                new Discord.ButtonBuilder().setCustomId("C").setLabel("C").setStyle(ButtonStyle.Danger),
                new Discord.ButtonBuilder().setCustomId("back").setLabel("←").setStyle(ButtonStyle.Danger),
            ),
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setCustomId("^2").setLabel("x²").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("√").setLabel("√").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("(").setLabel("(").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId(")").setLabel(")").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("/").setLabel("÷").setStyle(ButtonStyle.Primary),
            ),
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setCustomId("^").setLabel("xʸ").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("7").setLabel("7").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("8").setLabel("8").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("9").setLabel("9").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("*").setLabel("*").setStyle(ButtonStyle.Primary),
            ),
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setCustomId("10^").setLabel("10ˣ").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("4").setLabel("4").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("5").setLabel("5").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("6").setLabel("6").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("-").setLabel("-").setStyle(ButtonStyle.Primary),
            ),
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setCustomId("log").setLabel("log").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("1").setLabel("1").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("2").setLabel("2").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("3").setLabel("3").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId("+").setLabel("+").setStyle(ButtonStyle.Primary),
            ),
        ];

        const rows2 = [
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setCustomId("ln").setLabel("ln").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("neg").setLabel("±").setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId("0").setLabel("0").setStyle(ButtonStyle.Success),
                new Discord.ButtonBuilder().setCustomId(".").setLabel(",").setStyle(ButtonStyle.Primary),
                new Discord.ButtonBuilder().setCustomId("=").setLabel("=").setStyle(ButtonStyle.Danger),
            )
        ];

        let msg1 = await interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: 'Calculadora', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription("```js\n" + resultado + "\n➢ \n```")
                    .setColor(`#F7F9F7`)
                    .setFooter({ text: "El menú dejará de funcionar en 10 minutos" })
            ],
            components: rows1,
            fetchReply: true
        });

        let msg2 = await interaction.channel.send({
            components: rows2,
            fetchReply: true
        });

        const filter = i => i.user.id === interaction.user.id;
        const collector1 = msg1.createMessageComponentCollector({ filter, time: 600000 });
        const collector2 = msg2.createMessageComponentCollector({ filter, time: 600000 });

        const handleCollect = async (i) => {
            if (i.customId === "off") {
                await msg2.delete();
                await msg1.edit({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setAuthor({ name: 'Calculadora', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                            .setDescription("```js\nCalculadora apagada\n```")
                            .setColor(`#F7F9F7`)
                            .setFooter({ text: "El menú ha dejado de funcionar" })
                    ],
                    components: []
                });
                collector1.stop();
                collector2.stop();
                return;
            } else if (i.customId === "C") {
                resultado = 0;
                calculo = [];
                evalExp = [];
            } else if (i.customId === "=") {
                if (evalExp.length <= 0) {
                    calculo.push("0");
                    evalExp.push("0");
                }
                try {
                    let expression = evalExp.join("");
                    expression = expression.replace(/π/g, 'pi')
                        .replace(/√/g, 'sqrt')
                        .replace(/\^2/g, '^2')
                        .replace(/\^/g, '^')
                        .replace(/10\^/g, '10^')
                        .replace(/abs/g, 'abs')
                        .replace(/neg/g, '-')
                        .replace(/log/g, 'log')
                        .replace(/ln/g, 'log')
                        .replace(/\//g, '/')
                        .replace(/\*/g, '*')
                        .replace(/\+/g, '+')
                        .replace(/-/g, '-');
                    resultado = math.evaluate(expression);
                } catch (e) {
                    resultado = "Syntax Error!";
                }
                if (isNaN(resultado) && resultado !== "Infinity") {
                    resultado = "Syntax Error!";
                } else if (resultado === "Infinity") {
                    resultado = "∞";
                }
                calculo = [resultado.toString()];
                evalExp = [resultado.toString()];
            } else if (i.customId === "back") {
                calculo.pop();
                evalExp.pop();
            } else {
                calculo.push(i.customId);
                evalExp.push(i.customId);
            }
            await msg1.edit({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setAuthor({ name: 'Calculadora', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription("```js\n" + resultado + "\n➢ " + calculo.join("") + "\n```")
                        .setColor(`#F7F9F7`)
                        .setFooter({ text: "El menú dejará de funcionar en 10 minutos" })
                ]
            });
            i.deferUpdate();
        };

        collector1.on('collect', handleCollect);
        collector2.on('collect', handleCollect);
    }
};
