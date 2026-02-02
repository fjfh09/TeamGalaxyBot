import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, MessageFlags } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";
import { brawlService } from "../../Services/BrawlStarsService.js";
import fs from 'fs';
import path from 'path';

// Load Roles Config
const rolBrawlPath = path.join(process.cwd(), "Brawl", "rolbrawl.json");
const rolesConfig = JSON.parse(fs.readFileSync(rolBrawlPath, "utf-8"));
const rolesPermitidos = [
    rolesConfig.rolpresi1, rolesConfig.rolvice1, rolesConfig.rolpresi2, rolesConfig.rolvice2,
    rolesConfig.rolpresi3, rolesConfig.rolvice3, rolesConfig.rolpresi4, rolesConfig.rolvice4,
    rolesConfig.rolpresi5, rolesConfig.rolvice5, rolesConfig.rolpresi6, rolesConfig.rolvice6,
    rolesConfig.rolpresi7, rolesConfig.rolvice7,
    '708352560964304957', '749181768980103199', '841323449867567144'
];

export default {
    data: new SlashCommandBuilder()
        .setName("buscar_user_brawl")
        .setDescription("Muestra el perfil de Brawl Stars de un usuario")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Busca al usuario a través del usuario de Discord")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("nombre_brawl")
                .setDescription("Busca al usuario a través del nombre en Brawl Stars (Lento)")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("tag_brawl")
                .setDescription("Busca al usuario a través del tag en Brawl Stars")
                .setRequired(false)
        ),

    async run(client, int) {
        await int.deferReply();

        try {
            // Permission Check
            const miembro = int.member;
            if (!miembro.roles.cache.some(rol => rolesPermitidos.includes(rol.id))) {
                const embedPerms = new EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0xFF0000)
                    .setTitle(":no_entry: Permiso denegado")
                    .setDescription("No tienes los permisos necesarios para usar este comando.")
                    .setFooter({ text: `Solicitado por: ${int.member.displayName}` });
                return int.editReply({ embeds: [embedPerms] });
            }

            const userOpt = int.options.getUser("usuario");
            const nombreBrawlOpt = int.options.getString("nombre_brawl");
            const tagBrawlOpt = int.options.getString("tag_brawl");

            if (userOpt) {
                // Search by Discord User
                const fila = await dbService.bot.get(`SELECT * FROM usuariosbrawl WHERE id = ?`, [userOpt.id]);
                if (!fila) {
                    return int.editReply({
                        embeds: [new EmbedBuilder()
                            .setColor(0xFFFB00)
                            .setTitle("Usuario no encontrado")
                            .setDescription(`<@${userOpt.id}> no tiene un perfil en la base de datos.`)
                        ]
                    });
                }
                const jugador = await brawlService.getPlayer(fila.tag);
                await sendPlayerEmbed(int, jugador, userOpt.id);

            } else if (tagBrawlOpt) {
                // Search by Tag (DB Lookup first to find owner, else just API)
                const finalTag = (tagBrawlOpt.startsWith("#") ? tagBrawlOpt : "#" + tagBrawlOpt).toUpperCase().replace("O","0");
                
                const fila = await dbService.bot.get(`SELECT * FROM usuariosbrawl WHERE tag = ?`, [finalTag]);
                const jugador = await brawlService.getPlayer(finalTag);
                
                await sendPlayerEmbed(int, jugador, fila ? fila.id : null);

            } else if (nombreBrawlOpt) {
                // Search by Name (Scan all DB users)
                const rows = await dbService.bot.all('SELECT * FROM usuariosbrawl');
                const validUsuarios = [];
                const guild = int.guild; // Optimization: Use int.guild directly if possible or fetched

                await int.editReply({ content: "🔎 Buscando usuarios... esto puede tardar unos segundos..." });

                // Process in chunks of 10 to avoid rate limits
                 const chunkSize = 10;
                 for (let i = 0; i < rows.length; i += chunkSize) {
                    const chunk = rows.slice(i, i + chunkSize);
                    const promises = chunk.map(async (row) => {
                        // Check guild membership first (fast)
                        if (!guild.members.cache.has(row.id)) return null;

                        try {
                            // Fetch player from API (cached by service)
                            const p = await brawlService.getPlayer(row.tag);
                            if (p.name.toLowerCase() === nombreBrawlOpt.toLowerCase()) {
                                return {
                                    id: row.id,
                                    name: p.name,
                                    tag: p.tag,
                                    club: p.club
                                };
                            }
                        } catch (e) {
                            return null;
                        }
                    });
                    
                    const results = await Promise.all(promises);
                    validUsuarios.push(...results.filter(r => r !== null));
                 }

                 if (validUsuarios.length === 0) {
                     return int.editReply({ content: null, embeds: [new EmbedBuilder().setColor(0xFFFB00).setDescription(`No se encontró nadie con el nombre **${nombreBrawlOpt}**.`)] });
                 }

                 // Show results
                 const embedResults = new EmbedBuilder()
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0x00FF00)
                    .setTitle(`Usuarios encontrados: ${nombreBrawlOpt}`)
                    .setDescription(validUsuarios.map(u => 
                        `**Usuario:** <@${u.id}>\n**Nombre:** ${u.name}\n**Tag:** ${u.tag}\n**Club:** ${u.club ? u.club.name : 'Sin Club'}`
                    ).join("\n\n"))
                    .setFooter({ text: `Solicitado por: ${int.member.displayName}` });

                 await int.editReply({ content: null, embeds: [embedResults] });

            } else {
                 int.editReply("Debes especificar un usuario, un tag o un nombre.");
            }

        } catch (error) {
            console.error("Error in buscar_user_brawl:", error);
            int.editReply({ content: "Ocurrió un error al buscar el usuario (posiblemente API caída o tag inválido)." });
        }
    }
};

async function sendPlayerEmbed(int, jugador, discordId) {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Team Galaxy' })
        .setTitle(`Perfil de ${jugador.name}`)
        .setColor(0xFFFB00)
        .setDescription(`**Nombre Brawl:** ${jugador.name}\n**Tag Brawl:** ${jugador.tag}\n**Club:** ${jugador.club ? jugador.club.name : 'Sin Club'}\n${discordId ? `**Usuario Discord:** <@${discordId}>` : '**Usuario Discord:** No registrado'}`)
        .setFooter({ text: `Solicitado por: ${int.member.displayName}` });
    
    await int.editReply({ content: null, embeds: [embed] });
}
