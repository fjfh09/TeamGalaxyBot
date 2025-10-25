const Discord = require('discord.js');
let { tokenb, I, II, III, IV, V, VI, VII } = require("../../Id,typ.json")
const cron = require('node-cron');
const { rolpresi1, rolvice1, rolvete1,
    rolpresi2, rolvice2, rolvete2,
    rolpresi3, rolvice3, rolvete3,
    rolpresi4, rolvice4, rolvete4,
    rolpresi5, rolvice5, rolvete5,
    rolpresi6, rolvice6, rolvete6,
    rolpresi7, rolvice7, rolvete7 } = require("../../Brawl/rolbrawl.json")

module.exports = {
    name: "clientReady",
    once: true,
    async execute(client) {

        cron.schedule('0 */2 * * *', () => {
            brawl();
        }, {
            scheduled: true,
            timezone: "Europe/Madrid"
        });

        cron.schedule('0 10 * * *', () => {
            autoactu();
        }, {
            scheduled: true,
            timezone: "Europe/Madrid"
        });

        brawl()

        async function brawl() {
            try {
                ///////Brawl Stars///////
                const { Client: bClient } = require("brawl-api-wrapper");
                const clienta = new bClient(tokenb)

                const c = await client.channels.fetch("909445252199374938")

                const msg = await c.messages.fetch("1082383206176784504")

                const club1 = await clienta.getClub(I);
                const nombreclub1 = club1.name;
                const trofeos1 = club1.trophies;
                const reqtrofeos1 = club1.requiredTrophies;
                const miembros1 = club1.memberCount;
                const n1 = 1;

                var number1 = trofeos1;
                var ftrofeos1 = number1.toLocaleString('es-ES', { useGrouping: true });

                var number2 = reqtrofeos1;
                var freqtrofeos1 = number2.toLocaleString('es-ES', { useGrouping: true });

                ////2
                const club2 = await clienta.getClub(II);
                const nombreclub2 = club2.name;
                const trofeos2 = club2.trophies;
                const reqtrofeos2 = club2.requiredTrophies;
                const miembros2 = club2.memberCount;
                const n2 = 1;

                var number3 = trofeos2;
                var ftrofeos2 = number3.toLocaleString('es-ES', { useGrouping: true });

                var number4 = reqtrofeos2;
                var freqtrofeos2 = number4.toLocaleString('es-ES', { useGrouping: true });

                ////3
                const club3 = await clienta.getClub(III);
                const nombreclub3 = club3.name;
                const trofeos3 = club3.trophies;
                const reqtrofeos3 = club3.requiredTrophies;
                const miembros3 = club3.memberCount;
                const n3 = 1;

                var number5 = trofeos3;
                var ftrofeos3 = number5.toLocaleString('es-ES', { useGrouping: true });

                var number6 = reqtrofeos3;
                var freqtrofeos3 = number6.toLocaleString('es-ES', { useGrouping: true });

                ////4
                const club4 = await clienta.getClub(IV);
                const nombreclub4 = club4.name;
                const trofeos4 = club4.trophies;
                const reqtrofeos4 = club4.requiredTrophies;
                const miembros4 = club4.memberCount;
                const n4 = 1;

                var number7 = trofeos4;
                var ftrofeos4 = number7.toLocaleString('es-ES', { useGrouping: true });

                var number8 = reqtrofeos4;
                var freqtrofeos4 = number8.toLocaleString('es-ES', { useGrouping: true });

                ////5
                const club5 = await clienta.getClub(V);
                const nombreclub5 = club5.name;
                const trofeos5 = club5.trophies;
                const reqtrofeos5 = club5.requiredTrophies;
                const miembros5 = club5.memberCount;
                const n5 = 1;

                var number9 = trofeos5;
                var ftrofeos5 = number9.toLocaleString('es-ES', { useGrouping: true });

                var number10 = reqtrofeos5;
                var freqtrofeos5 = number10.toLocaleString('es-ES', { useGrouping: true });

                ////6
                const club6 = await clienta.getClub(VI);
                const nombreclub6 = club6.name;
                const trofeos6 = club6.trophies;
                const reqtrofeos6 = club6.requiredTrophies;
                const miembros6 = club6.memberCount;
                const n6 = 1;

                var number11 = trofeos6;
                var ftrofeos6 = number11.toLocaleString('es-ES', { useGrouping: true });

                var number12 = reqtrofeos6;
                var freqtrofeos6 = number12.toLocaleString('es-ES', { useGrouping: true });

                ////7
                const club7 = await clienta.getClub(VII);
                const nombreclub7 = club7.name;
                const trofeos7 = club7.trophies;
                const reqtrofeos7 = club7.requiredTrophies;
                const miembros7 = club7.memberCount;
                const n7 = 1;

                var number13 = trofeos7;
                var ftrofeos7 = number13.toLocaleString('es-ES', { useGrouping: true });

                var number14 = reqtrofeos7;
                var freqtrofeos7 = number14.toLocaleString('es-ES', { useGrouping: true });

                ///////////////////////////

                const t_club = (n1 + n2 + n3 + n4 + n5 + n6 + n7);
                const tt_club = (trofeos1 + trofeos2 + trofeos3 + trofeos4 + trofeos5 + trofeos6 + trofeos7);
                const pt_club = Number(((trofeos1 + trofeos2 + trofeos3 + trofeos4 + trofeos5 + trofeos6 + trofeos7) / t_club).toFixed(2));
                const ptr_club = Number(((reqtrofeos1 + reqtrofeos2 + reqtrofeos3 + reqtrofeos4 + reqtrofeos5 + reqtrofeos6 + reqtrofeos7) / t_club).toFixed(2));
                const m_club = (miembros1 + miembros2 + miembros3 + miembros4 + miembros5 + miembros6 + miembros7);
                const pm_club = Number(((miembros1 + miembros2 + miembros3 + miembros4 + miembros5 + miembros6 + miembros7) / t_club).toFixed(2));
                const mediaTroMiem = Number((tt_club / m_club).toFixed(2));

                var number15 = tt_club;
                var ftt_club = number15.toLocaleString('es-ES', { useGrouping: true });

                var number16 = pt_club;
                var fpt_club = number16.toLocaleString('es-ES', { useGrouping: true });

                var number17 = ptr_club;
                var fptr_club = number17.toLocaleString('es-ES', { useGrouping: true });

                var number18 = mediaTroMiem;
                var fmediaTroMiem = number18.toLocaleString('es-ES', { useGrouping: true });

                ///////////////////////////

                ////////////TOP////////////////
                const ranking = await clienta.getRankingOfClubs("es");

                let pos = ranking.findIndex((rank) => rank.tag === I);
                if (pos === -1) pos = "Sin Top"

                let pos1 = ranking.findIndex((rank) => rank.tag === II);
                if (pos1 === -1) pos1 = "Sin Top"

                let pos2 = ranking.findIndex((rank) => rank.tag === III);
                if (pos2 === -1) pos2 = "Sin Top"

                let pos3 = ranking.findIndex((rank) => rank.tag === IV);
                if (pos3 === -1) pos3 = "Sin Top"

                let pos4 = ranking.findIndex((rank) => rank.tag === V);
                if (pos4 === -1) pos4 = "Sin Top"

                let pos5 = ranking.findIndex((rank) => rank.tag === VI);
                if (pos5 === -1) pos5 = "Sin Top"

                let pos6 = ranking.findIndex((rank) => rank.tag === VII);
                if (pos6 === -1) pos6 = "Sin Top"
                ////////////////////////////

                const embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setTitle(`Estadisticas de los clubes de Mystic Galaxy | Descripción General\n`)
                    .setColor(0xFFFB00)
                    .addFields(
                        {
                            name: `Nº Clubes`,
                            value: `\n${t_club}`,
                            inline: true
                        },
                        {
                            name: `Trofeos Totales`,
                            value: `\n🏆 ${ftt_club}`,
                            inline: true
                        },
                        {
                            name: `Media de Trofeos`,
                            value: `\n🏆 ${fpt_club}`,
                            inline: true
                        },
                        {
                            name: `Media de Trofeos Req.`,
                            value: `\n🏆 ${fptr_club}`,
                            inline: true
                        },
                        {
                            name: `Miembros Totales`,
                            value: `\n👥 ${m_club}/${t_club * 30}`,
                            inline: true
                        },
                        {
                            name: `Media de Miembros`,
                            value: `\n👥 ${pm_club}/30`,
                            inline: true
                        },
                        {
                            name: `Media de Trofeos por Miembro`,
                            value: `\n\`👥\`/\`🏆\` ${fmediaTroMiem}`,
                            inline: true
                        },
                    )
                const embed1 = new Discord.EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0xFFFB00)
                    .setTitle(`Estadisticas de los clubes de Mystic Galaxy\n`)
                    .addFields(
                        {
                            name: `${nombreclub1}`,
                            value: `🏆 ${ftrofeos1}\n🏆 Req: ${freqtrofeos1}\n👥 ${miembros1}/30\n🏅 ${isNaN(pos) ? pos : pos + 1} <a:spain:854090681830998097>\n`,
                            inline: true
                        },
                        {
                            name: `${nombreclub2}`,
                            value: `🏆 ${ftrofeos2}\n🏆 Req: ${freqtrofeos2}\n👥 ${miembros2}/30\n🏅 ${isNaN(pos1) ? pos1 : pos1 + 1} <a:spain:854090681830998097>\n`,
                            inline: true
                        },
                        {
                            name: `${nombreclub3}`,
                            value: `🏆 ${ftrofeos3}\n🏆 Req: ${freqtrofeos3}\n👥 ${miembros3}/30\n🏅 ${isNaN(pos2) ? pos2 : pos2 + 1} <a:spain:854090681830998097>\n`,
                            inline: true
                        },
                        {
                            name: `${nombreclub4}`,
                            value: `🏆 ${ftrofeos4}\n🏆 Req: ${freqtrofeos4}\n👥 ${miembros4}/30\n🏅 ${isNaN(pos3) ? pos3 : pos3 + 1} <a:spain:854090681830998097>\n`,
                            inline: true
                        },
                        {
                            name: `${nombreclub5}`,
                            value: `🏆 ${ftrofeos5}\n🏆 Req: ${freqtrofeos5}\n👥 ${miembros5}/30\n🏅 ${isNaN(pos4) ? pos4 : pos4 + 1} <a:spain:854090681830998097>\n`,
                            inline: true
                        },
                        {
                            name: `${nombreclub6}`,
                            value: `🏆 ${ftrofeos6}\n🏆 Req: ${freqtrofeos6}\n👥 ${miembros6}/30\n🏅 ${isNaN(pos5) ? pos5 : pos5 + 1} <a:spain:854090681830998097>\n`,
                            inline: true
                        },
                        {
                            name: `${nombreclub7}`,
                            value: `🏆 ${ftrofeos7}\n🏆 Req: ${freqtrofeos7}\n👥 ${miembros7}/30\n🏅 ${isNaN(pos6) ? pos6 : pos6 + 1} <a:spain:854090681830998097>\n`,
                            inline: true
                        },
                    )
                    .setFooter({ text: `Creado por fjfh | Ultima Actualización` })
                    .setTimestamp()

                msg.edit({ embeds: [embed, embed1] })
                console.log("Editado el mensaje de estadisticas")
                try {
                    const sqlite3 = require('sqlite3').verbose();
                    const db_webhooks = new sqlite3.Database("./BD/db_webhooks.sqlite");
                    const db_bot = new sqlite3.Database("./BD/db_bot.sqlite");
                    db_bot.get(`SELECT * FROM brawlopciones WHERE id = 1`, async (err, filas2) => {
                        if (err) return console.log("ERROR #156 comando actudeestadisticas")

                        if (filas2.activo == 1) {
                            if (miembros1 == 30) {

                                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 2`, async (err, filas) => {
                                    if (err) return console.log("ERROR #1 comando actudeestadisticas")


                                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });


                                    const embed29I = new Discord.EmbedBuilder()
                                        .setAuthor({ name: 'Team Galaxy' })
                                        .setTitle(`EL ${nombreclub1} NECESITA R29`)
                                        .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                        .setColor("Random")
                                        .setFooter({ text: 'Creado por fjfh' })
                                        .setTimestamp()

                                    webhookClient.send({
                                        embeds: [embed29I],
                                        content: `<@&${rolpresi1}> <@&${rolvice1}> <@&${rolvete1}>`,
                                    });
                                })
                            } /*if (miembros2 == 30) {
                                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 3`, async (err, filas) => {
                                    if (err) return console.log("ERROR #1 comando actudeestadisticas")

                                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });

                                    const embed29II = new Discord.EmbedBuilder()
                                        .setAuthor({ name: 'Team Galaxy' })
                                        .setTitle(`EL ${nombreclub2} NECESITA R29`)
                                        .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                        .setColor("Random")
                                        .setFooter({ text: 'Creado por fjfh' })
                                        .setTimestamp()

                                    webhookClient.send({
                                        embeds: [embed29II],
                                        content: `<@&${rolpresi2}> <@&${rolvice2}> <@&${rolvete2}>`,
                                    });
                                })
                            }*/ if (miembros3 == 30) {
                                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 4`, async (err, filas) => {
                                    if (err) return console.log("ERROR #1 comando actudeestadisticas")

                                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });

                                    const embed29III = new Discord.EmbedBuilder()
                                        .setAuthor({ name: 'Team Galaxy' })
                                        .setTitle(`EL ${nombreclub3} NECESITA R29`)
                                        .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                        .setColor("Random")
                                        .setFooter({ text: 'Creado por fjfh' })
                                        .setTimestamp()

                                    webhookClient.send({
                                        embeds: [embed29III],
                                        content: `<@&${rolpresi3}> <@&${rolvice3}> <@&${rolvete3}>`,
                                    });
                                })

                            } if (miembros4 == 30) {
                                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 5`, async (err, filas) => {
                                    if (err) return console.log("ERROR #1 comando actudeestadisticas")

                                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });

                                    const embed29IV = new Discord.EmbedBuilder()
                                        .setAuthor({ name: 'Team Galaxy' })
                                        .setTitle(`EL ${nombreclub4} NECESITA R29`)
                                        .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                        .setColor("Random")
                                        .setFooter({ text: 'Creado por fjfh' })
                                        .setTimestamp()

                                    webhookClient.send({
                                        embeds: [embed29IV],
                                        content: `<@&${rolpresi4}> <@&${rolvice4}> <@&${rolvete4}>`,
                                    });
                                })

                            } /*if (miembros5 == 30) {
                                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 6`, async (err, filas) => {
                                    if (err) return console.log("ERROR #1 comando actudeestadisticas")

                                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });

                                    const embed29V = new Discord.EmbedBuilder()
                                        .setAuthor({ name: 'Team Galaxy' })
                                        .setTitle(`EL ${nombreclub5} NECESITA R29`)
                                        .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                        .setColor("Random")
                                        .setFooter({ text: 'Creado por fjfh' })
                                        .setTimestamp()

                                    webhookClient.send({
                                        embeds: [embed29V],
                                        content: `<@&${rolpresi5}> <@&${rolvice5}> <@&${rolvete5}>`,
                                    });
                                })

                            } */if (miembros6 == 30) {
                                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 7`, async (err, filas) => {
                                    if (err) return console.log("ERROR #1 comando actudeestadisticas")

                                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });

                                    const embed29VI = new Discord.EmbedBuilder()
                                        .setAuthor({ name: 'Team Galaxy' })
                                        .setTitle(`EL ${nombreclub6} NECESITA R29`)
                                        .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                        .setColor("Random")
                                        .setFooter({ text: 'Creado por fjfh' })
                                        .setTimestamp()

                                    webhookClient.send({
                                        embeds: [embed29VI],
                                        content: `<@&${rolpresi6}> <@&${rolvice6}> <@&${rolvete6}>`,
                                    });
                                })

                            } if (miembros7 == 30) {
                                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 8`, async (err, filas) => {
                                    if (err) return console.log("ERROR #1 comando actudeestadisticas")

                                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });

                                    const embed29VII = new Discord.EmbedBuilder()
                                        .setAuthor({ name: 'Team Galaxy' })
                                        .setTitle(`EL ${nombreclub7} NECESITA R29`)
                                        .setDescription("El Presi, los Vices y los Vetes deberian hacer r29")
                                        .setColor("Random")
                                        .setFooter({ text: 'Creado por fjfh' })
                                        .setTimestamp()

                                    webhookClient.send({
                                        embeds: [embed29VII],
                                        content: `<@&${rolpresi7}> <@&${rolvice7}> <@&${rolvete7}>`,
                                    });
                                })

                            }

                        }
                    })
                } catch (error) {
                    console.error('Error al mandar mensaje con la webhook:', error);
                }
            } catch (err) {
                switch (err.status) {
                    case 503: {
                        console.log('La Api de brawl está caída');
                    }
                    case 404: {
                        console.log('Jugador no encontrado');
                        // Player no encontrado
                        // Aquí puedes agregar el manejo para el error 404 si es necesario
                        break;
                    } case 500: {
                        console.log('Error inesperado');
                        // Player no encontrado
                        // Aquí puedes agregar el manejo para el error 404 si es necesario
                        break;
                    }
                    default: {
                        console.log(err);
                        // Si el error no es un 503 ni un 404, puedes lanzar el error nuevamente o manejarlo de otra manera
                    }
                }
            }
        }

        async function autoactu() {
            try {
                const sqlite3 = require('sqlite3').verbose();
                const db_webhooks = new sqlite3.Database("./BD/db_webhooks.sqlite");

                db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 1`, async (err, filas) => {
                    if (err) return console.log("ERROR #1 comando actudeestadisticas")


                    const webhookClient = new Discord.WebhookClient({ id: `${filas.id}`, token: `${filas.token}` });

                    const embed122 = new Discord.EmbedBuilder()
                        .setAuthor({ name: 'Team Galaxy' })
                        .setTitle(`ACTU DE LAS ESTADISTICAS <:TG:743104137868345447>`)
                        .setDescription("En <#909445252199374938> se acaba de actualizar las estadisticas de los 7 clubes del Mystic Galaxy")
                        .setColor("Random")
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()

                    // Puedes usar el webhook inmediatamente
                    webhookClient.send({
                        embeds: [embed122]
                    });
                })
            } catch (error) {
                console.error('Error al mandar mensaje con la webhook:', error);
            }
        }

    },
};