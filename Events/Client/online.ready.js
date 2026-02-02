import Discord from "discord.js";
import { ChannelType } from "discord.js";
import cron from 'node-cron';

export default {
    name: "clientReady",
    once: false,
    async execute(client) {

        async function online() {
            const guild = client.guilds.cache.get("667865814879305750");
            const canalenlinea = await guild.channels.fetch("1247873351427559504");

            const fetchedMembers = await guild.members.fetch({ withPresences: true });
            const presence = fetchedMembers.filter(member => ['online', 'idle', 'dnd'].includes(member.presence?.status));

            const newName1 = `🟢 | En Linea: ${presence.size}`

            if (canalenlinea.type === ChannelType.GuildVoice) {
                // Renombrar el canal de voz
                canalenlinea.edit({ name: newName1 });

            }
            console.log("Editado numero canal en linea")
        }
        if (client.guilds.cache.get("667865814879305750").id === "667865814879305750") {
            try {
            cron.schedule('*/4 * * * *', () => {
                online();
            }, {
                scheduled: true,
                timezone: "Europe/Madrid"
            });
        } catch (err) {
            console.log(err)
        }
        }

    },
};