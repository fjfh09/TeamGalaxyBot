const Discord = require('discord.js')

module.exports = {
    name: "decir.es",
    alias: [],

    execute(client,message,args){

    const mensaje = args.join(" ")
    let user = message.mentions.members.first() || message.member;
    if(!mensaje) return message.channel.send("¡Debes escribir algo!")


    if(message.guild.id === "667865814879305750"){
    setTimeout(function(){
        message.delete()
        message.channel.send(`Mensaje de **${user.user.username}**:\n${mensaje} <a:spain:854090681830998097>`).then(msg => {
            msg.react("<a:spain:854090681830998097>")})
    }, 100)
    } else {
    setTimeout(function(){
        message.delete()
        message.channel.send(`Mensaje de **${user.user.username}**:\n${mensaje} :flag_ea:`).then(msg => {
            msg.react("🇪🇸")})
        }, 100)
    }
           
    }
}