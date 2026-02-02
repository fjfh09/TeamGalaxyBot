import { loadFiles } from "../Functions/fileLoader.js";
import ascii from "ascii-table";

export async function loadCommands(client) {
    const table = new ascii().setHeading("Command", "Status");

    client.commands.clear();

    const Files = await loadFiles("comandos");

    for (const file of Files) {
        try {
            const url = `file://${file}`;
            const commandModule = await import(url);
            const command = commandModule.default;

            if (command && command.name) {
                client.commands.set(command.name, command);
                table.addRow(command.name, "🟩");
            } else {
                table.addRow(file, "🟥 (Missing name)");
            }
        } catch (error) {
            console.error(`Error loading command ${file}:`, error);
            table.addRow(file, "🟥 (Error)");
        }
    }

    console.log(table.toString(), "\nLegacy Commands loaded successfully");
}
