const fs = require("fs")
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
let { clientId, token } = require("./Id,typ.json")
const commands = []
fs.readdirSync("./slashs/").forEach((dir) => {
const slashcommandsFiles = fs.readdirSync(`./slashs/${dir}`).filter(file => file.endsWith(".js"))

for (const file of slashcommandsFiles){
    const slash = require(`./slashs/${dir}/${file}`)
    commands.push(slash.data.toJSON())
}
});

const rest = new REST({ version: "9" }).setToken(token)

createSlash()

async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )
        console.log("Comandos de barra agregados")
    } catch(e) {
        console.error(e)
    }
}