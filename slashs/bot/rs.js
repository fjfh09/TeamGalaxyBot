import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("rs")
        .setDescription("Muestra las redes sociales de Mystic Galaxy"),

    async run(client, int) {
        await int.deferReply();

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Team Galaxy', iconURL: int.guild.iconURL() })
            .setColor(0x00FFF7)
            .setTitle(`Redes Sociales de __Mystic Galaxy__`)
            .addFields(
                {
                    name: "Instagram <:ig:811148406038331412>",
                    value: "🔗 [Instagram](https://instagram.com/teamgalaxy_bs)",
                    inline: false
                },
                {
                    name: "Twitter <:twitter:811149096303460383>",
                    value: "🔗 [Twitter](https://twitter.com/TeamGalaxy_BS)",
                    inline: false
                },
                {
                    name: "Apoya a Team Galaxy <:paypal:873239409565241365>",
                    value: "🔗 [PayPal](https://www.paypal.com/paypalme/damedamedinero)",
                    inline: false
                }
            )
            .setFooter({ text: 'Team Galaxy' });

        await int.editReply({ embeds: [embed] });
    }
};