const Discord = require("discord.js");
const { ChannelType } = require("discord.js");
module.exports = {
    name: "guildMemberAdd",
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
            if (!member.roles.cache.has("880812001205571644")) {
                member.roles.add("880812001205571644")
            } else { }
            const bienvenido = new Discord.EmbedBuilder()
                .setAuthor({ name: `Hola ${member.user.username}, bienvenido a ${member.guild.name}!` })
                .setDescription(`
**<@${member.user.id}>**
**1-** Dirígete al canal de <#883330411671982110> y verifícate.  
**2-** Si eres parte de la familia MysticGalaxy de Brawl Stars, ve a <#802575562823565312> y reacciona para obtener el rol de tu club.  
**3-** Si no eres parte de la familia de Brawl Stars y quieres o puedes jugar Discord Hunter, ve a <#1344644625335324723> y pulsa el respectivo botón.  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

Si necesitas ayuda, dirígete al canal de <#907349681108041778> o contacta con los <@&841323449867567144> y te ayudaremos.  
¡Sigue los pasos!
`)
                .setColor(0x00FFFF)
                .setImage("https://media.discordapp.net/attachments/804689456292167721/882725309252792420/GIF-201121_120619.gif")
                .setFooter({ text: `${member.user.username} | Creado por fjfh` })
            bienvenido.data.author.icon_url = member.guild.iconURL({ forceStatic: false }) ?? ""
            client.channels.cache.get("705727294307827762").send({ embeds: [bienvenido] })

        }

    }
};