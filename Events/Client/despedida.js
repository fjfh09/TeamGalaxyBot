import Discord from "discord.js";
import { ChannelType } from "discord.js";
export default {
    name: "guildMemberRemove",
    once: false,
    async execute(client, member) {

        if (member.guild.id === "667865814879305750") {
            //////////Member Count/////////////////////
            const channelmembercount = await member.guild.channels.fetch("842087277630980188");
            const newName1 = `👥 | Miembros: ${member.guild.memberCount}`
            if (channelmembercount.type === ChannelType.GuildVoice) {
                // Renombrar el canal de voz
                await channelmembercount.edit({ name: newName1 });
            }
            ///////Bots Count//////////////////////
            const channelcountbot = await member.guild.channels.fetch("842087284404387880");
            const newName2 = `🤖 | Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`
            if (channelcountbot.type === ChannelType.GuildVoice) {
                // Renombrar el canal de voz
                await channelcountbot.edit({ name: newName2 });
            }

            let usuario;

            if (member.user.discriminator = "0") {
                usuario = member.user.username
            } else {
                usuario = `${member.user.username}#${member.user.discriminator}`
            }

            client.channels.cache.get("782645222890668067").send(`**${usuario}** se fue del servidor`)

        }

    }
};