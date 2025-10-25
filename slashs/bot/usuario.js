const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("usuario")
    .setDescription("Te doy tu información")
    .addUserOption(option =>
        option.setName("usuario")
        .setDescription("Selecciona un usuario que quieres ver su perfil")
        .setRequired(false)
    ),

    async run(client, int){

        let user = int.options.getMember('usuario') || int.member

    let status;
    switch (user.presence?.status) {
      case "online":
        status = "🟢 En línea";
        break;
      case "dnd":
        status = "🔴 No molestar";
        break;
      case "idle":
        status = "🟠 Ausente";
        break;
      default:
        status = "⚪️ Desconectado"
    }

        const embed = new Discord.EmbedBuilder()
        .setTitle(`Información de ${user.user.username}.`)
        .setAuthor({ name: 'Team Galaxy'})
        .setColor(0x008BFF)
        .setThumbnail(int.member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
        .addFields(
        {
          name: "🌍 Nombre: ",
          value: user.user.username,
          inline: true
        },
        {
          name: "#️⃣ Hastag: ",
          value: `#${user.user.discriminator}`,
          inline: true
        },
        {
          name: "🆔 ID: ",
          value: user.user.id,
          inline: true
        },
        {
          name: "🔘 Estado: ",
          value: status,
          inline: true
        },
        {
          name: "🎮 Actividad: ",
          value: user.presence?.activities[0] ? user.presence?.activities[0].name : `El usuario no esta jugando a nada!`,
          inline: true
        },
        {
          name: '👤 Avatar: ',
          value: `[Click aquí](${user.user.displayAvatarURL()})`,
          inline: true
        },
        {
          name: '📅 Fecha de creación: ',
          value: user.user.createdAt.toLocaleDateString("es"),
          inline: true
        },
        {
          name: '📆 Fecha de unión: ',
          value: user.joinedAt.toLocaleDateString("es"),
          inline: true
        },
        {
          name: '🔮 Roles del usuario: ',
          value: user.roles.cache.map(role => role.toString()).join(" ,"),
          inline: false
        }
      );
        int.reply({ embeds: [embed]})
    }
}