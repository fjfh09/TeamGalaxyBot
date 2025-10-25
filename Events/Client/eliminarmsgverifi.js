const Discord = require("discord.js");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const canal = message.channel;
        if (canal.id === "883330411671982110") {
            let fjfh = message.member.id === "739203308991807518";
            if (message.author.bot||fjfh) return;
            message.delete();
            const embed = new Discord.EmbedBuilder()
                .setDescription(`No se puede hablar en este canal solo se pueden usar los comandos \`/crear_perfil_bs\` o \`/save\`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  Si necesitas ayuda dirígete al canal de <#907349681108041778> o contacta con los <@&841323449867567144> y te ayudaremos.`)
                .setFooter({ text: `${message.member.user.username} | Creado por fjfh` });
            return message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 10000));
        }
    },
};
