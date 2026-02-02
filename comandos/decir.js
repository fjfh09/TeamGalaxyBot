import Discord from 'discord.js'

export default {
    name: "decir",
    alias: [],

    execute(client,message,args){

    const mensaje = args.join(" ")
    if(!mensaje) return message.channel.send("¡Debes escribir algo!")

    setTimeout(function(){
        message.delete()
        message.channel.send(`${mensaje}`)
    }, 100)

        
           
    }
}