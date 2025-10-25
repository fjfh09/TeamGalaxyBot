const Discord = require('discord.js');

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (interaction.isStringSelectMenu()) {
            let embed;
            switch (interaction.values[0]) {
                case "menu":
                    embed = new Discord.EmbedBuilder()
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setAuthor({ name: 'Team Galaxy' })
                    .setColor(0x00FF51)
                    .setTitle(`Estos son mis comandos en forma de categorias`)
                    .setFooter({ text: 'Creado por fjfh' })
                    .setTimestamp()
                    .addFields(
                        {
                            name: "Ayuda Bot",
                            value: "Te doy los comandos para info mia o del server",
                            inline: true
                        },
                        {
                            name: "Ayuda Economia",
                            value: "Te enseño cuales son los comandos del sistema de Economía",
                            inline: true
                        },
                        {
                            name: "Ayuda bs",
                            value: "Te doy un comando de Brawl Stars",
                            inline: true
                        },
                        {
                            name: "Ayuda Musica",
                            value: "Comandos para reproducir musica",
                            inline: true
                        },
                        {
                            name: "Ayuda Redes Sociales",
                            value: "Te doy el comando de las redes sociales del TG",
                            inline: true
                        },
                        {
                            name: "Ayuda Futbol",
                            value: "Te doy los comandos de futbol de la liga española",
                            inline: true
                        },
                        {
                            name: "Ayuda Entretenimiento",
                            value: "Te doy los comandos de entretenimiento",
                            inline: true
                        },
                        {
                            name: "Novedades",
                            value: "Te doy mis novedades actuales",
                            inline: true
                        }
                    )
                    break;
                case "bot":
                    embed = new Discord.EmbedBuilder()
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0x16923D)
                        .setTitle(`Estos comandos son para cosas mias y del server`)
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                        .addFields(
                            {
                                name: "/aislar",
                                value: "Aisla a un usuario (Solo para moderadores)",
                                inline: true
                            },
                            {
                                name: "/quitar_aislar",
                                value: "Quita el aislamiento a un usuario (Solo para moderadores)",
                                inline: true
                            },
                            {
                                name: "/avatar",
                                value: "Ves tu foto de avatar",
                                inline: true
                            },
                            {
                                name: "/banear",
                                value: "Banea a un usuario (Solo para moderadores)",
                                inline: true
                            },
                            {
                                name: "/bot",
                                value: "Te digo quien soy y que tengo",
                                inline: true
                            },
                            {
                                name: "/calculadora",
                                value: "Utiliza la calculadora",
                                inline: true
                            },
                            {
                                name: "/embed",
                                value: "Crea un embed con el usuario Team Galaxy",
                                inline: true
                            },
                            {
                                name: "/embed_user",
                                value: "Crea un embed con tu usuario",
                                inline: true
                            },
                            {
                                name: "/encuesta",
                                value: "Podrás hacer una encuesta con este comando",
                                inline: true
                            },
                            {
                                name: "/formulario",
                                value: "Te mando enlace de un formulario de errores o sugerencias",
                                inline: true
                            },
                            {
                                name: "/limpiar",
                                value: "Limpia el exceso de mensajes (Solo para moderadores)",
                                inline: true
                            },
                            {
                                name: "/meme",
                                value: "Te mando un meme",
                                inline: true
                            },
                            {
                                name: "tg!version",
                                value: "Mi version cual será utiliza este comando y lo sabras",
                                inline: true
                            },
                            {
                                name: "tg!decir",
                                value: "Puedes poner un mensaje tuyo y lo dice el bot",
                                inline: true
                            },
                            {
                                name: "tg!decir.es",
                                value: "Puedes poner un mensaje tuyo y lo dice el bot y ademas añade al final una bandera de España",
                                inline: true
                            },
                            {
                                name: "tg!es",
                                value: "Pone el bot esta bandera de España <a:spain:854090681830998097> porque eres un desgraciado y no tienes nitro",
                                inline: true
                            },
                            {
                                name: "/ayuda",
                                value: "Este es el comando que acabas de utilizar :joy::joy:",
                                inline: true,
                            },
                            {
                                name: "/ping",
                                value: "Con este comando puedes ver el ping del bot",
                                inline: true
                            },
                            {
                                name: "tg!normas",
                                value: "Con este comando puedes ver las normas del servidor",
                                inline: true
                            },
                            {
                                name: "/servidor",
                                value: "Te aparece la informacion del servidor",
                                inline: true
                            },
                            {
                                name: "/usuario",
                                value: "Con este comando puedes ver la información de la gente solo tienes que mencionarlos despues de escribir el comando <:600IQ:761566673568268319>",
                                inline: true
                            }

                        )
                    break;
                case "eco":
                    embed = new Discord.EmbedBuilder()
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0x879216)
                        .setTitle(`Estos son los comandos del sistema de Economía`)
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                        .addFields(
                            {
                                name: "/caballos",
                                value: "Haz una apuesta en una carrera de caballos",
                                inline: true
                            },
                            {
                                name: "/cartera",
                                value: "Mira tu dinero en tu cartera",
                                inline: true
                            },
                            {
                                name: "/crear",
                                value: "**Mantenimiento**\nCreate una cuenta",
                                inline: true
                            },
                            {
                                name: "/eliminar",
                                value: "**Mantenimiento**\nBorra tu cuenta",
                                inline: true
                            },
                            {
                                name: "/resetear",
                                value: "**Mantenimiento**\nResetea tu cuenta",
                                inline: true
                            },
                            {
                                name: "/trabajar",
                                value: "**Mantenimiento**\nTrabaja y ganarás dinero",
                                inline: true
                            },
                            {
                                name: "/dinero",
                                value: "**Mantenimiento**\nTe digo cuanto dinero tienes",
                                inline: true
                            },
                            {
                                name: "/ingresar",
                                value: "**Mantenimiento**\nIngresa el dinero en un banco",
                                inline: true
                            },
                            {
                                name: "/sacar",
                                value: "**Mantenimiento**\nSaca el dinero que tengas en el banco",
                                inline: true
                            },
                            {
                                name: "/dar",
                                value: "**Mantenimiento**\nIngresale dinero a un usuario",
                                inline: true
                            },
                            {
                                name: "/tienda",
                                value: "**Mantenimiento**\nEsta es la tienda donde podreis comprar cosas",
                                inline: true
                            },
                            {
                                name: "/estudiar",
                                value: "**Mantenimiento**\nTiendo donde comprar cursos (ganarás más dinero si compras cursos)",
                                inline: true
                            },
                            {
                                name: "/comprar_c",
                                value: "**Mantenimiento**\nCon este comando podras comprarte un curso",
                                inline: true
                            },
                            {
                                name: "/comprar_o",
                                value: "**Mantenimiento**\nCon este comando te podrás comprar un objeto",
                                inline: true
                            },
                        )
                    break;
                case "bs":
                    embed = new Discord.EmbedBuilder()
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0x165692)
                        .setTitle(`Comando para Brawl Stars`)
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                        .addFields(
                            {
                                name: "/clubes",
                                value: "Te doy la informacion de los clubes de TG en Brawl <:TG:743104137868345447>",
                                inline: true
                            },
                            {
                                name: "/clubes_e",
                                value: "Te permite actualizar las estadisticas y el top de los clubes de Brawl Stars del canal <#909445252199374938>",
                                inline: true
                            },
                            {
                                name: "/crear_perfil_bs",
                                value: "Te creas un perfil en el bot donde se almacena tu id de brawl",
                                inline: true
                            },
                            {
                                name: "/perfil",
                                value: "Te muestro tu perfil de Brawl Stars",
                                inline: true
                            },
                            {
                                name: "/brawlers",
                                value: "Te muestro tus brawlers de Brawl Stars",
                                inline: true
                            },
                            {
                                name: "/users_brawl",
                                value: "Enseño todos los usuarios creados en mi base de datos y su perfil de discord (Solo ADMINS)",
                                inline: true
                            },
                            {
                                name: "/buscar_user_brawl",
                                value: "Permite buscar si un usuario esta en la BD por su nombre de Brawl, su TAG o su @ de discord \n(Solo para altos mandos : ADMINS, MODS, Departamento, Presis, Vices)",
                                inline: true
                            },
                            {
                                name: "/r29_activar",
                                value: "Activas o Desactivas la notificacion de r29 (Solo ADMINS)",
                                inline: true
                            }
                        )
                    break;
                case "musi":
                    embed = new Discord.EmbedBuilder()
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0x921663)
                        .setTitle(`Estos son los comandos del sistema de Musica`)
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                        .addFields(
                            {
                                name: "/desc_musi",
                                value: "Descarga una cancion de las que vienen prestablecidas",
                                inline: true
                            },
                            {
                                name: "/reproducir",
                                value: "**Mantenimiento**\nReproduce una canción (aconseho que pongais el cantante)",
                                inline: true
                            },
                            {
                                name: "/parar",
                                value: "**Mantenimiento**\nPara la canción",
                                inline: true
                            },
                            {
                                name: "/continuar",
                                value: "**Mantenimiento**\nContinuala canción",
                                inline: true
                            },
                            {
                                name: "/saltar",
                                value: "**Mantenimiento**\nSalta la canción",
                                inline: true
                            },
                            {
                                name: "/lista",
                                value: "**Mantenimiento**\nLa lista de canciones que se van a reproducir",
                                inline: true
                            },
                            {
                                name: "/volumen",
                                value: "**Mantenimiento**\nAconsejo que este siempre al 80%",
                                inline: true
                            },
                            {
                                name: "/bucle",
                                value: "**Mantenimiento**\nRepite la lista de reproducción cuando se acabe",
                                inline: true
                            },

                        )
                    break;
                case "rs":
                    embed = new Discord.EmbedBuilder()
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0x923A16)
                        .setTitle(`Este es el comando de las Redes Sociales`)
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                        .addFields(
                            {
                                name: "/rs",
                                value: "Te muestro nuestras **Redes Sociales**",
                                inline: true
                            }

                        )
                    break;
                case "f":
                    embed = new Discord.EmbedBuilder()
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0xD646B1)
                        .setTitle(`Estos son los comandos de futbol`)
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                        .addFields(
                            {
                                name: "/liga",
                                value: "Te muestro la clasificación de la Liga Santander",
                                inline: true
                            },
                            {
                                name: "/ver_futbol",
                                value: "Con este comando puedes ver desde la plataforma roja directa los partidos de la liga",
                                inline: true
                            }
                        )
                    break;
                case "e":
                    embed = new Discord.EmbedBuilder()
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: 'Team Galaxy' })
                        .setColor(0xD67646)
                        .setTitle(`Estos son los comandos de entretenimiento`)
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                        .addFields(
                            {
                                name: "/8ball",
                                value: "Comando de tu preguntas y yo respondo",
                                inline: true
                            },
                            {
                                name: "/ppt",
                                value: "Comando de piedra, papel o tijeras contra el bot",
                                inline: true
                            },
                            {
                                name: "/e_1",
                                value: "Adivina tu que es",
                                inline: true
                            },
                            {
                                name: "/e_2",
                                value: "Utilizalo y ya sabras",
                                inline: true
                            }
                        )
                    break;
                case "n":
                    let { version } = require("../../package.json")
                    embed = new Discord.EmbedBuilder()
                        .setTitle("Team Galaxy\n¿Que novedades tengo?")
                        .setDescription(`Nuevo comando **/embed_user**: Te permite hacer un embed con tu usuario\nNuevo comando **/formulario**: Podras enviarme un formulario con todas tus ideas o propuestas\nComando arreglado **/ayuda**: Una mejora del comando para que funcione siempre y todos los comandos bien puestos con sus descripciones correctamente`)
                        .setColor("Random")
                        .setFooter({ text: 'Creado por fjfh' })
                        .setTimestamp()
                    break;

                default:
                    return; // No hace nada si el customId no coincide con ninguno de los casos
            }
            await interaction.deferUpdate()
            interaction.editReply({ embeds: [embed] });

        }
    }
};
