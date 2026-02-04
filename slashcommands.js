import "dotenv/config";
import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { pathToFileURL } from "url";

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const commands = [];

async function main() {
    const slashDirs = fs.readdirSync("./slashs/");
    
    for (const dir of slashDirs) {
        const dirPath = path.join(process.cwd(), "slashs", dir);
        if (fs.statSync(dirPath).isDirectory()) {
             const slashcommandsFiles = fs.readdirSync(dirPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));
             for (const file of slashcommandsFiles) {
                 try {
                     const filePath = path.join(dirPath, file);
                     const slashModule = await import(pathToFileURL(filePath).href);
                     const slash = slashModule.default;
                     if (slash?.data) {
                        commands.push(slash.data.toJSON());
                     }
                 } catch (err) {
                     console.error(`Error loading ${file}:`, err);
                 }
             }
        }
    }

    const rest = new REST({ version: "9" }).setToken(token);

    console.log("Started refreshing application (/) commands.");

    try {
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        );
        console.log("Comandos de barra agregados correctamente");
    } catch (e) {
        console.error(e);
    }
}

main();