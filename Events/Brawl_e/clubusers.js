import sqlite3 from 'sqlite3';
const { Database } = sqlite3.verbose();
import Discord from "discord.js";
import cron from 'node-cron';

import { Client } from 'brawl-api-wrapper';
import fs from 'fs';
import path from 'path';

const db_bot = new Database("./BD/db_bot.sqlite");
const tokenb = process.env.TOKEN_B;
const I = process.env.TAG_I;
const II = process.env.TAG_II;
const III = process.env.TAG_III;
const IV = process.env.TAG_IV;
const V = process.env.TAG_V;
const VI = process.env.TAG_VI;
const VII = process.env.TAG_VII;

const rolBrawlPath = path.join(process.cwd(), "Brawl", "rolbrawl.json");
const { rolpresi1, rolvice1, rolvete1, rol1,
    rolpresi2, rolvice2, rolvete2, rol2,
    rolpresi3, rolvice3, rolvete3, rol3,
    rolpresi4, rolvice4, rolvete4, rol4,
    rolpresi5, rolvice5, rolvete5, rol5,
    rolpresi6, rolvice6, rolvete6, rol6,
    rolpresi7, rolvice7, rolvete7, rol7,
    rolcarnal, rolbrawl, rolsinclub } = JSON.parse(fs.readFileSync(rolBrawlPath, "utf-8"));


export default {
    name: "clientReady",
    once: true,
    async execute(client) {

        const clienta = new Client(tokenb);

        async function compararClubes() {
            db_bot.all('SELECT * FROM usuariosbrawl', async (err, usuarios) => {
                if (err) throw err;

                for (let usuario of usuarios) {
                    let bs_id = usuario.tag;

                    try {
                        let jugador = await clienta.getPlayer(bs_id, true);
                        let clubTag = jugador.club ? jugador.club.tag : null;

                        let guild = client.guilds.cache.get('667865814879305750'); // Reemplaza 'your-guild-id' con el ID de tu servidor de Discord
                        if (!guild) {
                            console.error(`Guild con ID 'your-guild-id' no encontrada.`);
                            continue;
                        }

                        let member = guild.members.cache.get(usuario.id);
if (!member) {
    console.error(`${usuario.id} no está en el servidor.`);
    db_bot.run(`DELETE FROM usuariosbrawl WHERE id = '${usuario.id}'`, function (err) {
        if (err) return console.log(err.message + ` Eliminándolo de la base de datos`);
    });
    continue;
}

                        /*

                        let apodo = member.nickname || member.user.username;
                        let apodobrawl = jugador.name; // Supongo que jugador.name es único por miembro

                        // Normalizamos ambos apodos
                        let apodoNormalizado = apodo
                        let apodobrawlNormalizado = apodobrawl

                        // Si el apodo es exactamente igual a apodobrawl (normalizados), no hacemos nada
                        if (apodoNormalizado === apodobrawlNormalizado) {
                            // No hacemos nada ya que el apodo es exactamente igual
                        }
                        // Si el apodo ya contiene apodobrawl entre paréntesis, no hacemos nada
                        else if (apodo.includes(`(${apodobrawl})`)) {
                            // No hacemos nada ya que ya está actualizado
                        }
                        else {
                            try {
                                // Si el apodo no lo contiene, lo actualizamos
                                let nuevoApodo = `${apodo} (${apodobrawl})`;

                                // Verificamos si el nuevo apodo tiene menos de 30 caracteres
                                if (nuevoApodo.length < 30) {
                                    await member.setNickname(nuevoApodo);
                                    console.log(`Apodo de ${member.id} actualizado a: ${nuevoApodo}`);
                                } else {
                                    console.log(`El nuevo apodo para ${member.id} es demasiado largo y no se actualizará.`);
                                }
                            } catch (error) {
                                console.error(`Error actualizando el apodo de ${member.id}:`, error);
                            }
                        }


                        console.log(`Apodo actual de ${member.id}: ${apodo}`);
                        console.log(`Apodo de jugador: ${apodobrawl}`);

                        */
                        const updateRoles = async (clubTag, rol, rolpresi, rolvice, rolvete) => {
                            const club = await clienta.getClub(clubTag);
                            const clubMember = club.members.find(m => m.tag === bs_id);
                            const jugadorRol = clubMember ? clubMember.role : 'member';

                            const rolesToAdd = [rol, rolbrawl];
                            const rolesToRemove = [rol1, rol2, rol3, rol4, rol5, rol6, rol7, rolcarnal, rolsinclub, rolpresi1, rolvice1, rolvete1, rolpresi2, rolvice2, rolvete2, rolpresi3, rolvice3, rolvete3, rolpresi4, rolvice4, rolvete4, rolpresi5, rolvice5, rolvete5, rolpresi6, rolvice6, rolvete6, rolpresi7, rolvice7, rolvete7];

                            if (jugadorRol === 'president') {
                                rolesToAdd.push(rolpresi);
                            } else if (jugadorRol === 'vicePresident') {
                                rolesToAdd.push(rolvice);
                            } else if (jugadorRol === 'senior') {
                                rolesToAdd.push(rolvete);
                            }
                            console.log(jugador.name+`||||`+clubMember.role)

                            await member.roles.add(rolesToAdd);
                            await member.roles.remove(rolesToRemove.filter(r => !rolesToAdd.includes(r)));
                        };

                        if (clubTag === I) {
                            await updateRoles(I, rol1, rolpresi1, rolvice1, rolvete1);
                        } else if (clubTag === II) {
                            await updateRoles(II, rol2, rolpresi2, rolvice2, rolvete2);
                        } else if (clubTag === III) {
                            await updateRoles(III, rol3, rolpresi3, rolvice3, rolvete3);
                        } else if (clubTag === IV) {
                            await updateRoles(IV, rol4, rolpresi4, rolvice4, rolvete4);
                        } else if (clubTag === V) {
                            await updateRoles(V, rol5, rolpresi5, rolvice5, rolvete5);
                        } else if (clubTag === VI) {
                            await updateRoles(VI, rol6, rolpresi6, rolvice6, rolvete6);
                        } else if (clubTag === VII) {
                            await updateRoles(VII, rol7, rolpresi7, rolvice7, rolvete7);
                        } else if (clubTag === null) {
                            const rolesToAddd = [rolcarnal, rolsinclub, rolbrawl];
                            const rolesToRemovee = [rol1, rol2, rol3, rol4, rol5, rol6, rol7, rolpresi1, rolvice1, rolvete1, rolpresi2, rolvice2, rolvete2, rolpresi3, rolvice3, rolvete3, rolpresi4, rolvice4, rolvete4, rolpresi5, rolvice5, rolvete5, rolpresi6, rolvice6, rolvete6, rolpresi7, rolvice7, rolvete7];
                            await member.roles.add(rolesToAddd);
                            await member.roles.remove(rolesToRemovee);
                        } else {
                            const rolesToAdddd = [rolcarnal, rolbrawl];
                            const rolesToRemoveee = [rol1, rol2, rol3, rol4, rol5, rol6, rol7, rolsinclub, rolpresi1, rolvice1, rolvete1, rolpresi2, rolvice2, rolvete2, rolpresi3, rolvice3, rolvete3, rolpresi4, rolvice4, rolvete4, rolpresi5, rolvice5, rolvete5, rolpresi6, rolvice6, rolvete6, rolpresi7, rolvice7, rolvete7];
                            await member.roles.add(rolesToAdddd);
                            await member.roles.remove(rolesToRemoveee);
                        }
                    } catch (error) {
                        console.error(`Error obteniendo datos del jugador con tag ${bs_id}:`, error);
                    }
                }
            });
        }
        if (client.guilds.cache.get("667865814879305750").id === "667865814879305750") {
            try {
                cron.schedule('0 * * * *', () => {
                    compararClubes();
                }, {
                    scheduled: true,
                    timezone: "Europe/Madrid"
                });
            } catch (err) {
                console.error('Error general:', err);
                if (err.status === 503) {
                    console.log('La API de Brawl Stars está caída');
                } else if (err.status === 404) {
                    console.log('Jugador no encontrado');
                } else if (err.status === 500) {
                    console.log('Error inesperado');
                } else {
                    throw err;
                }
            }
        }
        
    }
};
