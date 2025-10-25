const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { PresenceUpdateStatus } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("servidor")
    .setDescription("Te doy la información del server"),

    async run(client, int){

      try {

      const fetchedMembers = await int.guild.members.fetch({ withPresences: true });
      const presence = fetchedMembers.filter(member => ['online', 'idle', 'dnd'].includes(member.presence?.status));

        const embed = new Discord.EmbedBuilder()
        .setAuthor({name: 'Team Galaxy'})
      .setColor("Purple")
      .setThumbnail(int.guild.iconURL({ dynamic: true }))
      .setTitle(`${int.guild.name} información del servidor`)
      .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
      .addFields(
        {
          name: "🌍 Propietario: ",
          value: `<@${int.guild.ownerId}>`,
          inline: true
        },
        {
          name: "👥 Miembros: ",
          value: `Hay ${int.guild.memberCount} miembros en el servidor!`,
          inline: true
        },
        {
          name: "🟢 Miembros en línea: ",
          value: `Hay ${presence.size} usuarios en línea!`,
          inline: true
        },
        {
          name: "🤖 BOTS: ",
          value: `Hay ${int.guild.members.cache.filter(m => m.user.bot).size} bots en el servidor!`,
          inline: true
        },
        {
          name: "📅 Fecha de creación: ",
          value: int.guild.createdAt.toLocaleDateString("es"),
          inline: true
        },
        {
          name: "🔢 Número de roles: ",
          value: `Hay ${int.guild.roles.cache.size} roles en el servidor.`,
          inline: true,
        },
        {
          name: `✅ Verificado: `,
          value: int.guild.verified ? 'El servidor esta verficado.' : `El servidor no esta verficado.`,
          inline: true
        },
        {
          name: '🔮 Boosters: ',
          value: int.guild.premiumSubscriptionCount >= 1 ? `Hay ${int.guild.premiumSubscriptionCount} de usuarios mejorando el servidor` : `No hay nadie mejorando el servidor`,
          inline: true
        },
        {
          name: "🤨 Emojis: ",
          value: int.guild.emojis.cache.size >= 1 ? `Hay ${int.guild.emojis.cache.size} emojis!` : 'No hay emojis',
          inline: true
        }
      )
        await int.reply({ embeds: [embed]})

    } catch (e){
      await int.reply("Error al ver los usuarios en linea")
    }
    }
}