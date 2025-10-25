const Discord = require('discord.js')

module.exports = {
    name: "es",
    alias: [],

    execute(client,message,args){

        if(message.guild.id === "667865814879305750"){
                message.delete()
                message.channel.send("<a:spain:854090681830998097>").then(msg => {
                    msg.react("<a:spain:854090681830998097>")})
            } else {
                message.delete()
                message.channel.send(":flag_ea:").then(msg => {
                    msg.react("🇪🇸")})
            }
           
    }
}