import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

const SONGS = {
    "23_Preguntas": "https://cdn.discordapp.com/attachments/744249848949375037/948614529829470268/23_Preguntas.mp3",
    "512": "https://cdn.discordapp.com/attachments/744249848949375037/948614530328559666/512.mp3",
    "AM_Remix": "https://cdn.discordapp.com/attachments/744249848949375037/948614531242938388/AM-Remix.mp3",
    "Asi_soy_yo": "https://cdn.discordapp.com/attachments/744249848949375037/948614531742064680/Asi_Soy_Yo.mp3",
    "Bombona": "https://cdn.discordapp.com/attachments/744249848949375037/948614528420179998/Bombona.mp3",
    "Dakiti": "https://cdn.discordapp.com/attachments/744249848949375037/948614529288380496/Dakiti.mp3",
    "Desesperados": "https://cdn.discordapp.com/attachments/744249848949375037/948614560540151858/Desesperados.mp3",
    "Dictadura": "https://cdn.discordapp.com/attachments/744249848949375037/948614561060249670/Dictadura.mp3",
    "Exit": "https://cdn.discordapp.com/attachments/744249848949375037/948614561982971944/Exit_.mp3",
    "Fiel_Remix": "https://cdn.discordapp.com/attachments/744249848949375037/948614562935095316/Fiel_-_Remix.mp3",
    "Ley_Seca": "https://cdn.discordapp.com/attachments/744249848949375037/948614546078191646/Ley_Seca.mp3",
    "Leyenda": "https://cdn.discordapp.com/attachments/744249848949375037/948614546539561050/Leyenda.mp3",
    "Llorando_en_un_Ferrari": "https://cdn.discordapp.com/attachments/744249848949375037/948614546975784970/Llorando_En_Un_Ferrari.mp3",
    "Municiones": "https://cdn.discordapp.com/attachments/744249848949375037/948614559231533126/Municiones.mp3",
    "No_me_Conoce_Remix": "https://cdn.discordapp.com/attachments/744249848949375037/948614559772594226/No_Me_Conoce-Remix.mp3",
    "North_Carolina": "https://cdn.discordapp.com/attachments/744249848949375037/948614560724697098/North_Carolina.mp3",
    "Pin": "https://cdn.discordapp.com/attachments/744249848949375037/948614561211240519/Pin.mp3",
    "Reloj": "https://cdn.discordapp.com/attachments/744249848949375037/948614561685192754/Reloj.mp3",
    "Soy_Peor": "https://cdn.discordapp.com/attachments/744249848949375037/948614605717004348/Soy_Peor.mp3",
    "Subelo": "https://cdn.discordapp.com/attachments/744249848949375037/948614606174167040/Subelo.mp3",
    "Te_Bote_Remix": "https://cdn.discordapp.com/attachments/744249848949375037/948614606857834556/Te_Bote_-_Remix.mp3",
    "Travesuras_Remix": "https://cdn.discordapp.com/attachments/744249848949375037/948614600570572851/Travesuras_Remix.mp3",
    "Tu_no_Metes_Cabra_Remix": "https://cdn.discordapp.com/attachments/744249848949375037/948614602843893800/Tu_No_Mete_Cabra-Remix.mp3",
    "Volando_Remix": "https://cdn.discordapp.com/attachments/744249848949375037/948614604471279726/Volando_Remix.mp3",
    "Volvi": "https://cdn.discordapp.com/attachments/744249848949375037/948614059404701696/Volvi.mp3"
};

export default {
    data: new SlashCommandBuilder()
        .setName("desc_musi")
        .setDescription("Descarga canciones seleccionadas")
        .addStringOption(option =>
            option.setName("cancion")
                .setDescription("Elige la canción")
                .setRequired(true)
                .addChoices(...Object.keys(SONGS).map(k => ({ name: k.replace(/_/g, " "), value: k })))
        ),

    async run(client, int) {
        await int.deferReply();
        
        const cancion = int.options.getString("cancion");
        const url = SONGS[cancion];

        if (url) {
            const embed = new EmbedBuilder()
                .setTitle(`🎵 ${cancion.replace(/_/g, " ")}`)
                .setDescription(`[📥 Haz clic aquí para descargar](${url})`)
                .setColor("Green")
                .setFooter({ text: `Solicitado por ${int.user.username}` })
                .setTimestamp();
            
            // Send reply and delete after 2 minutes
            const msg = await int.editReply({ embeds: [embed] });
            setTimeout(() => msg.delete().catch(() => {}), 120000);
        } else {
            await int.editReply("❌ Canción no encontrada.");
        }
    }
};