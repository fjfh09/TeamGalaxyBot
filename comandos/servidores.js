const Discord = require('discord.js')

module.exports = {
    name: "servidores",
    alias: [],

    async execute(client,message,args){

  const guilds = client.guilds.cache
  const names = []
  guilds.map(m => {
  names.push(m.name)
  }),

  message.channel.send(`${names.join("\n")}`)

}
}