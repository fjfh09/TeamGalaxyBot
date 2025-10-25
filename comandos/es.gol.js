const Discord = require('discord.js')

module.exports = {
    name: "es.gol",
    alias: [],

    execute(client,message,args){
           message.delete();
           let jugador = args.join(" ").toUpperCase()

           if(message.guild.id === "667865814879305750"){
           if(!jugador) return message.channel.send(`GOOOOOOOOOOOOOOOOOLLLLLLL DE ESPAÑA <a:spain:854090681830998097> <a:spain:854090681830998097>`).then(msg => {
            msg.react("<a:spain:854090681830998097>")
           });

           message.channel.send(`GOOOOOOOOOOOOOOOOOLLLLLLL DE ${jugador} <a:spain:854090681830998097> <a:spain:854090681830998097>`).then(msg => {
           msg.react("<a:spain:854090681830998097>")})
           }else{
            if(!jugador) return message.channel.send(`GOOOOOOOOOOOOOOOOOLLLLLLL DE ESPAÑA :flag_es: :flag_es:`).then(msg => {
                msg.react("🇪🇸")
               });
    
               message.channel.send(`GOOOOOOOOOOOOOOOOOLLLLLLL DE ${jugador} :flag_es: :flag_es:`).then(msg => {
               msg.react("🇪🇸")})
           }
           
    }
}