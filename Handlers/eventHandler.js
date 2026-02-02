import { loadFiles } from "../Functions/fileLoader.js";
import ascii from "ascii-table";
import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";

export async function loadEvents(client) {
    const table = new ascii().setHeading("Event", "Status");

    await client.events.clear();
    const Files = await loadFiles("Events");

    for (const file of Files) {
        try {
            // Import dynamically
            // file is an absolute path. For import() on windows it might need file:// but on linux it usually works or requires it too. 
            // Better to prepend file:// just in case or ensure it works.
            const url = `file://${file}`;
            const eventModule = await import(url);
            const event = eventModule.default;

            if (!event || !event.name) {
                console.warn(`Event in ${file} is missing 'name' or not exporting default.`);
                continue;
            }

            const execute = (...args) => event.execute(client, ...args);
            client.events.set(event.name, execute);

            if (event.rest) {
                if (event.once) client.rest.once(event.name, execute);
                else client.rest.on(event.name, execute);
            } else {
                if (event.once) client.once(event.name, execute);
                else client.on(event.name, execute);
            }

            table.addRow(event.name, "🟩");
        } catch (error) {
            console.error(`Error loading event ${file}:`, error);
            table.addRow(file, "🟥");
        }
    }

    console.log(table.toString(), "\nEvents loaded successfully");
}