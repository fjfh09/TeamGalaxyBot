///////Constanstes de Discord///////
const Discord = require("discord.js");
const { Client, ActivityType, GatewayIntentBits, Partials, Collection, WebhookClient } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildPresences, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildPresences, GuildVoiceStates],
    partials: [User, Message, GuildMember, ThreadMember, GuildMembers],
});

const { loadEvents } = require("./Handlers/eventHandler");
const axios = require("axios");

///////Secretos///////
let { prefix, token, tokenb, I, II, III, IV, V, VI, VII } = require("./Id,typ.json")
client.events = new Collection;

loadEvents(client);
///////Fechas///////
const cron = require('node-cron');


/*
///////IP DETECTOR

let ipActual = "";

client.on("clientReady", () => {
    obtenerIpPublica().then(ip => {
        ipActual = ip;
    });
});

async function verificarIp(){
    try{
        const ipNueva = await obtenerIpPublica();
        if (ipActual !== ipNueva){
            client.users.cache('739203308991807518').send(`<@739203308991807518>, La IP ha cambiado de ${ipActual} a ${ipNueva}`)
            ipActual = ipNueva;
        }
    } catch (error) {
        console.error(`Error al verificar la IP:`, error)
    }
}

async function obtenerIpPublica() {
    const respuesta = await axios.get(`https://api.ipify.org?format=json`);
    return respuesta.data.ip;
}

const intervaloVerificacion = 10000; //10 segundos
setInterval(verificarIp, intervaloVerificacion);


*/
client.on("clientReady", async () => {

    ///////////////////////////////////////////////////////////////

    console.log("Estamos Activos Papi")

    /////////////////////////ESTADO///////////////////////////////

    const time = (1000 * 10) //10 segundos

    setInterval(() => {
        function randomStatus() {

            let canciones = ["Te Boté - Remix", "No Te Veo - Remix", "Me Acostumbre", "Mirame - Remix", "Si La Calle LLama - Remix", "4K", "Dile (Homenaje)", "Hasta Que Dios Diga", "Cuidao Por Ahi", "La Jumpa", "Subelo", "Singapur - Remix", "Brindemos", "Asesina - Remix", "Soldado y Profeta - Remix"];
            let cancion = canciones[Math.floor(Math.random() * (canciones.length))];

            let status = [
                [{
                    name: 'Bot Oficial de Team Galaxy',
                    type: ActivityType.Playing
                }],
                [{
                    name: 'Creado por fjfh',
                    type: ActivityType.Playing
                }],
                [{
                    name: '/ayuda',
                    type: ActivityType.Playing
                }],
                [{
                    name: 'El Himno de España',
                    type: ActivityType.Listening
                }],
                [{
                    name: `${cancion}`,
                    type: ActivityType.Listening
                }]
            ]

            let rstatus = status[Math.floor(Math.random() * status.length)];
            client.user.setPresence({ activities: rstatus, status: 'online' });
        }
        randomStatus();
    }, time)


})
//////////////////////////////////////////////////////////////////////////////////////////

const fs = require("fs");
let { readdirSync } = require("fs")

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./comandos").filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`)
    client.commands.set(command.name, command)
}

client.slashcommands = new Collection();
fs.readdirSync("./slashs/").forEach((dir) => {
    const slashcommandsFiles = fs.readdirSync(`./slashs/${dir}`).filter(file => file.endsWith(".js"))

    for (const file of slashcommandsFiles) {
        const slash = require(`./slashs/${dir}/${file}`)
        client.slashcommands.set(slash.data.name, slash)
    }

});

client.on("interactionCreate", async (int) => {
    if (!int.isCommand()) return;

    const slashcmds = client.slashcommands.get(int.commandName)

    if (!slashcmds) return;
    try {
        await slashcmds.run(client, int)
    } catch (e) {
        console.error(e)
    }
})
client.on("messageCreate", (message) => {

    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)

    const command = args.shift().toLowerCase();

    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command))

    if (cmd) {
        cmd.execute(client, message, args)
    }
})

client.login(token)