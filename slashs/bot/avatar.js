const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Puedes ver el avatar de quien quieras")
    .addUserOption(option =>
        option.setName("usuario")
        .setDescription("Selecciona un usuario")
        .setRequired(false)
    ),

    async run(client, int){

        let user;
        if (int.options.getUser("usuario")) {
            user = int.options.getUser("usuario");
        }else{
            user = int.user;
        }

        let usuario;
        if (int.options.getUser("usuario")) {
            usuario = int.options.getUser("usuario").username;
        }else{
            usuario = int.user.username;
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle(`Foto de ${usuario}.`)
            .setAuthor({name: 'Team Galaxy'})
            .setColor(0x00FF08)
            .setImage(user.displayAvatarURL({ dynamic: false }))
            .setFooter({text: 'Creado por fjfh | Solicitado por: ' + int.member.displayName})
        int.reply({ embeds: [embed]})
    }
}