import Discord from 'discord.js'

export default {
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