const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db_webhooks = new sqlite3.Database("./BD/db_webhooks.sqlite");

module.exports = {
  name: "827529",
  alias: [],
  async execute(client, message, args) {

    db_webhooks.get(`SELECT * FROM webhookTG WHERE numero = 1`, async (err, filas) => {
      if (err) return console.log(err.int + ` ${int.content} ERROR #1 comando "caballos" => ${int.content}`)
      if (!filas) {
        const channel_webhook = await client.channels.fetch("788056949992325191")
        const webhook = await channel_webhook.createWebhook({
          name: 'Brawl Team Galaxy',
          avatar: 'https://cdn.discordapp.com/avatars/809790434838708224/929fb1f296a31f54f9eaea53b342b693.webp',
        });

        db_webhooks.run(`INSERT INTO webhookTG(numero, id, token) VALUES(1 ,'${webhook.id}', '${webhook.token}')`, function (err) {
          if (err) return console.log(err.int + ` ${int.content} ERROR #2 comando "caballos" => ${int.content}`)
        })

        message.channel.send({ content: "Creada la WebHook"}).then(m => setTimeout(() => m.delete(), 5000))
      } else {
        message.channel.send({ content: "Ya esta creada la WebHook"}).then(m => setTimeout(() => m.delete(), 5000))
      }
    })
    message.delete();
  }
}