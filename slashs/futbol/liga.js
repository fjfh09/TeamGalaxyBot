const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const axios = require('axios');
// const { createCanvas, loadImage } = require('canvas');
// const { existsSync } = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("liga")
        .setDescription("Te digo la clasificación de la Liga")
        .addStringOption((o) =>
            o
                .setName('competición')
                .setDescription('La competición de la que quieres ver la clasificación.')
                .addChoices({ name: 'LALIGA EASports 2024/2025', value: 'laliga-easports-2024:LALIGA EASPORTS:24/25:ea.png' }, { name: 'LALIGA EASports 2023/2024', value: 'laliga-easports-2023:LALIGA EASPORTS:23/24:ea.png' }, { name: 'LALIGA Santander 2022/2023', value: 'laliga-santander-2022:LALIGA SANTANDER:22/23:santander.png' }, { name: 'LALIGA Santander 2021/2022', value: 'laliga-santander-2021:LALIGA SANTANDER:21/22:santander.png' }, { name: 'LALIGA Santander 2020/2021', value: 'laliga-santander-2020:LALIGA SANTANDER:20/21:santander.png' })
        ),
    async run(client, int) {

        // await int.deferReply();

        // const opt = int.options.getString('competición')

        // const [ comp, name, year, logo ] = opt? opt.split(':') : 'laliga-easports-2024:LALIGA EASPORTS:24/25:ea.png'.split(':');

        // console.log(comp, name, year, logo)

        // const teams = await axios.get(`https://apim.laliga.com/public-service/api/v1/subscriptions/${comp}/standing?contentLanguage=es&countryCode=ES&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e`)
        //     .then((res) => res.data.standings);

        // const canvasWidth = 1050;
        // const canvasHeight = 1050;
        // const rowHeight = 45;
        // const margin = 20;
        // const logoSize = 40;
        // const titleHeight = 100;

        // const canvas = createCanvas(canvasWidth, canvasHeight);
        // const ctx = canvas.getContext('2d');

        // async function loadAndDrawImage(url, x, y, width, height) {
        //     const img = await loadImage(url);
        //     ctx.drawImage(img, x, y, width, height);
        // }

        // async function drawRanking() {
        //     ctx.textAlign = 'center';
        //     ctx.fillStyle = '#d3d3d3';
        //     ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        //     ctx.font = 'bold 30px Sans-serif';
        //     ctx.fillStyle = '#000000';

        //     const logoPath = path.join(__dirname, `../../archivos/liga/${logo}`);
        //     if (existsSync(logoPath)) {
        //         await loadAndDrawImage(logoPath, margin, margin, 80, 80);
        //     } else {
        //         console.warn(`Logo file not found at path: ${logoPath}`);
        //     }

        //     ctx.font = 'bold 30px Sans-serif';
        //     ctx.fillText(name, canvas.width / 2, 50);

        //     ctx.font = 'bold 20px Sans-serif';
        //     ctx.fillText(year, canvasWidth - 70, 50);

        //     ctx.font = 'bold 20px Sans-serif';
        //     const headersY = titleHeight + margin;
        //     const colOffset = 5;
        //     ctx.fillText('PJ', canvasWidth - 480 + colOffset, headersY);
        //     ctx.fillText('V', canvasWidth - 420 + colOffset, headersY);
        //     ctx.fillText('E', canvasWidth - 360 + colOffset, headersY);
        //     ctx.fillText('D', canvasWidth - 300 + colOffset, headersY);
        //     ctx.fillText('Pts', canvasWidth - 240 + colOffset, headersY);
        //     ctx.fillText('GF', canvasWidth - 180 + colOffset, headersY);
        //     ctx.fillText('GC', canvasWidth - 120 + colOffset, headersY);
        //     ctx.fillText('Dif', canvasWidth - 60 + colOffset, headersY);

        //     for (let i = 0; i < teams.length; i++) {
        //         ctx.textAlign = 'left';
        //         const team = teams[i];
        //         const y = headersY + (i + 1) * rowHeight;

        //         ctx.fillStyle = getColorForPosition(i + 1);
        //         ctx.fillRect(margin - 10, y - 30, 5, rowHeight);

        //         ctx.fillStyle = '#000000';
        //         ctx.font = '20px Sans-serif';
        //         ctx.textAlign = 'center';
        //         ctx.fillText((i + 1).toString(), margin + 20, y);
        //         await loadAndDrawImage(team.team.shield.url, margin + 40, y - 30, logoSize, logoSize);
        //         ctx.textAlign = 'left';
        //         ctx.fillText(team.team.nickname, margin + logoSize + 60, y);
        //         ctx.textAlign = 'center';
        //         ctx.fillText(team.played.toString(), canvasWidth - 480 + colOffset, y);
        //         ctx.fillText(team.won.toString(), canvasWidth - 420 + colOffset, y);
        //         ctx.fillText(team.drawn.toString(), canvasWidth - 360 + colOffset, y);
        //         ctx.fillText(team.lost.toString(), canvasWidth - 300 + colOffset, y);

        //         ctx.font = 'bold 20px Sans-serif';
        //         ctx.fillText(team.points.toString(), canvasWidth - 240 + colOffset, y);
        //         ctx.font = '20px Sans-serif';

        //         ctx.fillText(team.goals_for.toString(), canvasWidth - 180 + colOffset, y);
        //         ctx.fillText(team.goals_against.toString(), canvasWidth - 120 + colOffset, y);
        //         ctx.fillText(team.goal_difference.toString(), canvasWidth - 60 + colOffset, y);
        //     }

        //     return canvas.toBuffer('image/png');
        // }

        // function getColorForPosition(position) {
        //     if (position <= 4) return '#0000FF';
        //     if (position <= 6) return '#FFA500';
        //     if (position === 7) return '#008000';
        //     if (position >= 18) return '#FF0000';
        //     return '#d3d3d3';
        // }

        // const buffer = await drawRanking();


        // const attachment = new Discord.AttachmentBuilder(buffer, { name: 'ligaclasificacion.png' });
        // const logoAttachment = new Discord.AttachmentBuilder(`/home/TeamGalaxy/TeamGalaxyBot/archivos/liga/${logo}`, { name: 'logo-liga.png' });

        // const embed = new Discord.EmbedBuilder()
        //     .setThumbnail('attachment://logo-liga.png')
        //     .setAuthor({ name: 'Team Galaxy' })
        //     .setColor(0xFF0000)
        //     .setImage("attachment://ligaclasificacion.png")
        //     .setTitle(`${name} ${year}`)
        //     .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName });

        // await int.editReply({ embeds: [embed], files: [attachment, logoAttachment] });
    }
};
