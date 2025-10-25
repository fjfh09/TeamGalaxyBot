const { PermissionsBitField } = require('discord.js');
const { ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "voiceStateUpdate",
    once: false,
    async execute(client, oldState, newState) {

        const CREAR_TORNEO_CHANNEL_ID = '863440215838425098'; // Reemplaza esto con el ID del canal "crear torneo"

        // Verifica si el usuario se ha unido al canal "crear torneo"
        if (newState.channelId === CREAR_TORNEO_CHANNEL_ID && oldState.channelId !== CREAR_TORNEO_CHANNEL_ID) {
            try {
                const guild = newState.guild;
                const member = newState.member;

                const club1 = guild.roles.cache.find(y => y.id === "701142143988793445")
                const club2 = guild.roles.cache.find(y => y.id === "700328143394832435")
                const club3 = guild.roles.cache.find(y => y.id === "739819152130441278")
                const club4 = guild.roles.cache.find(y => y.id === "743136692172619848")
                const club5 = guild.roles.cache.find(y => y.id === "891633479907962900")
                const club6 = guild.roles.cache.find(y => y.id === "891633655200501772")
                const club7 = guild.roles.cache.find(y => y.id === "913144606386950144")
                const carnal = guild.roles.cache.find(y => y.id === "690527183910862879")
                const silenciado = guild.roles.cache.find(y => y.id === "782372877289652304")

                const crearTorneoChannel = guild.channels.cache.get(CREAR_TORNEO_CHANNEL_ID);

                // Crea un nuevo canal de voz con capacidad para 2 miembros
                const newVoiceChannel = await guild.channels.create({
                    name: `Torneo de ${member.displayName}`,
                    type: ChannelType.GuildVoice, // Tipo de canal de voz
                    parent: "667865815475028010",
                    userLimit: 3,
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: silenciado.id,
                            deny: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: club1.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: club2.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: club3.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: club4.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: club5.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: club6.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: club7.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                        {
                            id: carnal.id,
                            allow: ["ViewChannel", PermissionsBitField.Flags.Connect],
                        },
                    ],
                });

                const parentCategory = crearTorneoChannel.parent;

                const voiceChannels = parentCategory.children;

                // Inicializar lastDuoChannel como null
                let lastTorneoChannel = null;

                // Iterar sobre las propiedades del objeto voiceChannels
                for (const channelId in voiceChannels) {
                    const channel = voiceChannels[channelId];
                    if (channel.type === 'GUILD_VOICE' && channel.name.toLowerCase().startsWith('torneo de')) {
                        lastTorneoChannel = channel;
                    }
                }

                if (lastTorneoChannel) {
                    // Si se encontró un canal "Duo de", colocar el nuevo canal después de él
                    await newVoiceChannel.setPosition(lastTorneoChannel.position + 1);
                } else {
                    // Si no se encontró ningún canal "Duo de", colocar el nuevo canal después del canal "crear duo"
                    await newVoiceChannel.setPosition(crearTorneoChannel.position + 1);
                }

                // Mueve al usuario al nuevo canal de voz
                await member.voice.setChannel(newVoiceChannel);

                // Escucha eventos para eliminar el canal cuando todos los usuarios salgan
                const onVoiceStateUpdate = async (oldState, newState) => {
                    if (newState.channelId !== newVoiceChannel.id && oldState.channelId === newVoiceChannel.id) {
                        const channel = guild.channels.cache.get(newVoiceChannel.id);
                        if (channel && channel.members.size === 0) {
                            await channel.delete();
                            client.off('voiceStateUpdate', onVoiceStateUpdate);
                        }
                    }
                };
                client.on('voiceStateUpdate', onVoiceStateUpdate);
            } catch (error) {
                console.error(`Error al crear/mover el canal de voz: ${error.message}`);
            }
        }
    },
};