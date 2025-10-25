/*const Discord = require("discord.js");
const { ChannelType } = require("discord.js");

module.exports = {
    name: "presenceUpdate",
    once: false,
    async execute(client, oldPresence, newPresence) {

        if (newPresence.guild.id === "667865814879305750") {

            const guild = newPresence.guild;
            const canalenlinea = await guild.channels.fetch("1247873351427559504");

            const fetchedMembers = await guild.members.fetch({ withPresences: true });
            const presence = fetchedMembers.filter(member => ['online', 'idle', 'dnd'].includes(member.presence?.status));

            const newName1 = `🟢 | En Linea: ${presence.size}`

            if (canalenlinea.type === ChannelType.GuildVoice) {
                // Renombrar el canal de voz
                await canalenlinea.edit({ name: newName1 });
            }
        }

    },
};*/