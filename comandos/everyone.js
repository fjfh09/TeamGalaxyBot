const Discord = require('discord.js')

module.exports = {
    name: "everyone",
    alias: [],

    execute(client,message,args){

       message.delete()
      let permiso = message.member.permissions.has("ADMINISTRATOR")
      if(!permiso) return message.channel.send("No tienes permisos")

        message.channel.send("@everyone")
           
    }
}