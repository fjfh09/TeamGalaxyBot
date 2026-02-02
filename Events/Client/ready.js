import { ActivityType } from "discord.js";

export default {
    name: "clientReady",
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        console.log("Estamos Activos Papi");

        // Status Rotator
        const time = 10000; // 10 seconds
        setInterval(() => {
            const canciones = ["Te Boté - Remix", "No Te Veo - Remix", "Me Acostumbre", "Mirame - Remix", "Si La Calle LLama - Remix", "4K", "Dile (Homenaje)", "Hasta Que Dios Diga", "Cuidao Por Ahi", "La Jumpa", "Subelo", "Singapur - Remix", "Brindemos", "Asesina - Remix", "Soldado y Profeta - Remix"];
            const cancion = canciones[Math.floor(Math.random() * canciones.length)];

            const statuses = [
                { name: 'Bot Oficial de Team Galaxy', type: ActivityType.Playing },
                { name: 'Creado por fjfh', type: ActivityType.Playing },
                { name: '/ayuda', type: ActivityType.Playing },
                { name: 'El Himno de España', type: ActivityType.Listening },
                { name: `${cancion}`, type: ActivityType.Listening }
            ];

            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setPresence({ activities: [randomStatus], status: 'online' });
        }, time);
    },
};