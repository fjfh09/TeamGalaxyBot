import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));

export default {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (!interaction.isStringSelectMenu()) return;
        if (interaction.customId !== "menu_ayuda") return;

        await interaction.deferUpdate();

        const selection = interaction.values[0];
        let embed = new Discord.EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setAuthor({ name: 'Team Galaxy', iconURL: client.user.displayAvatarURL() })
            .setFooter({ text: 'Creado por fjfh' })
            .setTimestamp();

        switch (selection) {
            case "menu":
                embed
                    .setColor(0x00FF51)
                    .setTitle(`Categorías de Comandos`)
                    .setDescription("Selecciona una opción del menú para ver más detalles.")
                    .addFields(
                        { name: "🤖 Ayuda Bot", value: "Información del bot y del servidor", inline: true },
                        { name: "💶 Ayuda Economía", value: "Sistema de economía global", inline: true },
                        { name: "🎮 Ayuda Brawl Stars", value: "Estadísticas, perfiles y clubes", inline: true },
                        { name: "🎵 Ayuda Música", value: "Reproducción de música (En mantenimiento)", inline: true },
                        { name: "📷 Redes Sociales", value: "Nuestras redes oficiales", inline: true },
                        { name: "⚽ Ayuda Fútbol", value: "Liga y resultados", inline: true },
                        { name: "🎪 Entretenimiento", value: "Minijuegos y diversión", inline: true },
                        { name: "🆕 Novedades", value: "Últimas actualizaciones del bot", inline: true }
                    );
                break;

            case "bot":
                embed
                    .setColor(0x16923D)
                    .setTitle(`🤖 Comandos de Bot y Servidor`)
                    .addFields(
                        { name: "/aislar", value: "Aísla a un usuario (Mods)", inline: true },
                        { name: "/quitar_aislar", value: "Retira aislamiento (Mods)", inline: true },
                        { name: "/avatar", value: "Muestra tu avatar o el de otro", inline: true },
                        { name: "/banear", value: "Banea a un usuario (Mods)", inline: true },
                        { name: "/bot", value: "Información técnica del bot", inline: true },
                        { name: "/calculadora", value: "Herramienta de cálculo sencilla", inline: true },
                        { name: "/encuesta", value: "Crea una encuesta pública", inline: true },
                        { name: "/formulario", value: "Envía sugerencias o reportes", inline: true },
                        { name: "/limpiar", value: "Borra mensajes (Mods)", inline: true },
                        { name: "/meme", value: "Envía un meme aleatorio", inline: true },
                        { name: "/ping", value: "Muestra la latencia actual", inline: true },
                        { name: "/servidor", value: "Información del servidor", inline: true },
                        { name: "/usuario", value: "Información de un usuario", inline: true }
                    );
                break;

            case "eco":
                embed
                    .setColor(0x879216)
                    .setTitle(`💶 Comandos de Economía (Mantenimiento)`)
                    .setDescription("El sistema de economía está actualmente en revisión y mejoras.")
                    .addFields(
                        { name: "/cartera", value: "Ver tu saldo", inline: true },
                        { name: "/trabajar", value: "Ganar dinero", inline: true },
                        { name: "/tienda", value: "Comprar ítems", inline: true }
                    );
                break;

            case "bs":
                embed
                    .setColor(0x165692)
                    .setTitle(`🎮 Comandos de Brawl Stars`)
                    .addFields(
                        { name: "/clubes", value: "Info de clubes Mystic Galaxy", inline: true },
                        { name: "/clubes_e", value: "Actualizar top de clubes (Admin)", inline: true },
                        { name: "/crear_perfil_bs", value: "Vincula tu cuenta de BS", inline: true },
                        { name: "/perfil", value: "Muestra tu perfil de BS", inline: true },
                        { name: "/brawlers", value: "Muestra tus brawlers", inline: true },
                        { name: "/users_brawl", value: "Lista usuarios registrados (Admin)", inline: true },
                        { name: "/buscar_user_brawl", value: "Busca usuarios por nombre/tag", inline: true },
                        { name: "/r29_activar", value: "Configura notificaciones (Admin)", inline: true }
                    );
                break;

            case "musi":
                embed
                    .setColor(0x921663)
                    .setTitle(`🎵 Comandos de Música (Mantenimiento)`)
                    .setDescription("El módulo de música está siendo reescrito.")
                    .setFields(
                        { name: "/reproducir", value: "Pone una canción", inline: true },
                        { name: "/parar", value: "Detiene la música", inline: true }
                    );
                break;

            case "rs":
                embed
                    .setColor(0x923A16)
                    .setTitle(`📷 Redes Sociales`)
                    .addFields(
                        { name: "/rs", value: "Muestra nuestras redes oficiales", inline: true }
                    );
                break;

            case "f":
                embed
                    .setColor(0xD646B1)
                    .setTitle(`⚽ Comandos de Fútbol`)
                    .addFields(
                        { name: "/liga", value: "Clasificación de La Liga", inline: true },
                        { name: "/ver_futbol", value: "Enlaces para ver partidos", inline: true }
                    );
                break;

            case "e":
                embed
                    .setColor(0xD67646)
                    .setTitle(`🎪 Entretenimiento`)
                    .addFields(
                        { name: "/8ball", value: "La bola mágica responde", inline: true },
                        { name: "/ppt", value: "Piedra, papel o tijeras", inline: true }
                    );
                break;

            case "n":
                embed
                    .setTitle(`🆕 Novedades - v${packageJson.version}`)
                    .setColor("Random")
                    .setDescription(`**Últimos cambios:**\n- Renovación completa del sistema de Brawl Stars\n- Optimización de comandos\n- Nuevos menús interactivos\n- Corrección de errores en gestión de roles`)
                    .addFields({ name: "Versión Actual", value: packageJson.version, inline: true });
                break;
        }

        if (embed) {
            await interaction.editReply({ embeds: [embed] });
        }
    }
};
