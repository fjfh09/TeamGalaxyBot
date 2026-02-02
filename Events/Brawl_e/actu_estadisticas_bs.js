import { EmbedBuilder, WebhookClient } from 'discord.js';
import cron from 'node-cron';
import path from "path";
import fs from "fs";
import { dbService } from "../../Services/DatabaseService.js";
import { brawlService } from "../../Services/BrawlStarsService.js";

const clubTags = [
    process.env.TAG_I,
    process.env.TAG_II,
    process.env.TAG_III,
    process.env.TAG_IV,
    process.env.TAG_V,
    process.env.TAG_VI,
    process.env.TAG_VII
];

const rolBrawlPath = path.join(process.cwd(), "Brawl", "rolbrawl.json");
const rolesData = JSON.parse(fs.readFileSync(rolBrawlPath, "utf-8"));

export default {
    name: "clientReady",
    once: true,
    async execute(client) {
        
        // Schedule: Every 2 hours
        cron.schedule('0 */2 * * *', async () => {
            await updateStats(client);
        }, { scheduled: true, timezone: "Europe/Madrid" });

        // Schedule: Every day at 10:00
        cron.schedule('0 10 * * *', async () => {
             await sendDailyUpdateWebhook();
        }, { scheduled: true, timezone: "Europe/Madrid" });

        // Run immediately on startup
        updateStats(client);

        async function updateStats(client) {
            try {
                const channel = await client.channels.fetch("909445252199374938");
                if (!channel) return console.error("Stats channel not found");
                const msg = await channel.messages.fetch("1082383206176784504");
                if (!msg) return console.error("Stats message not found");

                // Fetch all clubs in parallel
                const clubPromises = clubTags.map(tag => brawlService.getClub(tag));
                const clubs = await Promise.all(clubPromises);
                
                // Fetch ranking once
                const ranking = await brawlService.getRankingOfClubs("es");

                // Calculate Totals
                let totalMembers = 0;
                let totalTrophies = 0;
                let totalRequired = 0;
                const totalClubs = clubs.length;

                const clubFields = [];

                for (let i = 0; i < totalClubs; i++) {
                    const club = clubs[i];
                    totalMembers += club.memberCount;
                    totalTrophies += club.trophies;
                    totalRequired += club.requiredTrophies;

                    let rankPos = ranking.findIndex(r => r.tag === club.tag);
                    const rankDisplay = rankPos === -1 ? "Sin Top" : `${rankPos + 1} <a:spain:854090681830998097>`;

                    clubFields.push({
                        name: club.name,
                        value: `🏆 ${club.trophies.toLocaleString('es-ES')}\n🏆 Req: ${club.requiredTrophies.toLocaleString('es-ES')}\n👥 ${club.memberCount}/30\n🏅 ${rankDisplay}\n`,
                        inline: true
                    });
                }

                // Averages
                const avgTrophies = (totalTrophies / totalClubs).toFixed(2);
                const avgRequired = (totalRequired / totalClubs).toFixed(2);
                const avgMembers = (totalMembers / totalClubs).toFixed(2);
                const avgTrophiesPerMember = (totalTrophies / totalMembers).toFixed(2);

                const embedSummary = new EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setTitle(`Estadisticas de los clubes de Mystic Galaxy | Descripción General\n`)
                    .setColor(0xFFFB00)
                    .addFields(
                        { name: `Nº Clubes`, value: `\n${totalClubs}`, inline: true },
                        { name: `Trofeos Totales`, value: `\n🏆 ${totalTrophies.toLocaleString('es-ES')}`, inline: true },
                        { name: `Media de Trofeos`, value: `\n🏆 ${parseFloat(avgTrophies).toLocaleString('es-ES')}`, inline: true },
                        { name: `Media de Trofeos Req.`, value: `\n🏆 ${parseFloat(avgRequired).toLocaleString('es-ES')}`, inline: true },
                        { name: `Miembros Totales`, value: `\n👥 ${totalMembers}/${totalClubs * 30}`, inline: true },
                        { name: `Media de Miembros`, value: `\n👥 ${avgMembers}/30`, inline: true },
                        { name: `Media de Trofeos por Miembro`, value: `\n\`👥\`/\`🏆\` ${parseFloat(avgTrophiesPerMember).toLocaleString('es-ES')}`, inline: true },
                    );

                const embedDetails = new EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0xFFFB00)
                    .setTitle(`Estadisticas de los clubes de Mystic Galaxy\n`)
                    .addFields(clubFields)
                    .setFooter({ text: `Creado por fjfh | Ultima Actualización` })
                    .setTimestamp();

                await msg.edit({ embeds: [embedSummary, embedDetails] });
                console.log("Stats message updated.");

                // Check for 30/30 members and send alerts
                await checkFullClubs(clubs);

            } catch (error) {
                console.error("Error updating stats:", error);
            }
        }

        async function checkFullClubs(clubs) {
            try {
                const options = await dbService.bot.get(`SELECT * FROM brawlopciones WHERE id = 1`);
                if (!options || options.activo !== 1) return;

                for (let i = 0; i < clubs.length; i++) {
                    const club = clubs[i];
                    if (club.memberCount === 30) {
                        const clubNum = i + 1; // 1 to 7
                        // Webhook number mapping (based on original code logic)
                        // Original logic: club1 -> webhook2, club2 -> webhook3, etc.
                        const webhookNum = clubNum + 1; 

                        const webhookRow = await dbService.webhooks.get(`SELECT * FROM webhookTG WHERE numero = ?`, [webhookNum]);
                        if (webhookRow) {
                             const webhookClient = new WebhookClient({ id: `${webhookRow.id}`, token: `${webhookRow.token}` });
                             
                             // Get role IDs dynamically
                             // rolesData keys: rolpresi1, rolvice1, rolvete1, etc.
                             const presiRole = rolesData[`rolpresi${clubNum}`];
                             const viceRole = rolesData[`rolvice${clubNum}`];
                             const veteRole = rolesData[`rolvete${clubNum}`];

                             const embed = new EmbedBuilder()
                                .setAuthor({ name: 'Team Galaxy' })
                                .setTitle(`EL ${club.name} NECESITA R29`)
                                .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                .setColor("Random")
                                .setFooter({ text: 'Creado por fjfh' })
                                .setTimestamp();

                             await webhookClient.send({
                                 embeds: [embed],
                                 content: `<@&${presiRole}> <@&${viceRole}> <@&${veteRole}>`,
                             });
                        }
                    }
                }
            } catch (error) {
                console.error("Error checking full clubs:", error);
            }
        }

        async function sendDailyUpdateWebhook() {
            try {
                const webhookRow = await dbService.webhooks.get(`SELECT * FROM webhookTG WHERE numero = 1`);
                if (!webhookRow) return;

                const webhookClient = new WebhookClient({ id: `${webhookRow.id}`, token: `${webhookRow.token}` });

                const embed = new EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setTitle(`ACTU DE LAS ESTADISTICAS <:TG:743104137868345447>`)
                    .setDescription("En <#909445252199374938> se acaba de actualizar las estadisticas de los 7 clubes del Mystic Galaxy")
                    .setColor("Random")
                    .setFooter({ text: 'Creado por fjfh' })
                    .setTimestamp();

                await webhookClient.send({ embeds: [embed] });

            } catch (error) {
                console.error("Error sending daily update webhook:", error);
            }
        }
    },
};