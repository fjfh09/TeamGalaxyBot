import { ButtonStyle, ChannelType } from 'discord.js';
import Discord from 'discord.js';
import { MessageFlags } from 'discord.js';
export default {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {

    if (interaction.isButton()) {
      if (interaction.customId === "tickets") {
        const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
        const mods = interaction.guild.roles.cache.find(y => y.id === "749181768980103199")
        const ayudantes = interaction.guild.roles.cache.find(p => p.id === "841323449867567144")
        interaction.guild.channels.create({
          name: `ticket-${interaction.member.displayName}`,
          type: ChannelType.GuildText,
          parent: "907343482669129768",
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: ["ViewChannel", "SendMessages"]
            },
            {
              id: everyone.id,
              deny: ["ViewChannel", "SendMessages"]
            },
            {
              id: mods.id,
              allow: ["ViewChannel", "SendMessages"]
            },
            {
              id: ayudantes.id,
              allow: ["ViewChannel", "SendMessages"]
            }
          ]
        }).then(c => {
          const mensaje = new Discord.EmbedBuilder()
            .setDescription(`🎫 **__<@${interaction.user.id}>, este es tu canal de consultas__**\n\nEscribe tu duda/pregunta aquí; un miembro del staff se pondrá en contacto contigo.\n\n*Reacciona a la 🔑 para cerrar el ticket*`)
            .setColor("Green")
            .setFooter({ text: 'Creado por fjfh' })
            .setTimestamp()

          const cerrar = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("cerrar")
                .setEmoji("🔑")
                .setStyle(ButtonStyle.Primary)
            )

          c.send({ content: `<@${interaction.user.id}>`, embeds: [mensaje], components: [cerrar] })
        })
        const embedabc = new Discord.EmbedBuilder()
          .setDescription(`<@${interaction.user.id}>, tu ticket se ha generado. Te he habilitado un canal para ello; habla a través de ahí. Gracias 😁`)
          .setColor("Green")
          .setFooter({ text: 'Creado por fjfh' })
          .setTimestamp()
        interaction.reply({ embeds: [embedabc], flags: MessageFlags.Ephemeral })
      } else if (interaction.customId === "cerrar") {
        interaction.channel.delete()
      }
    }


  },
};