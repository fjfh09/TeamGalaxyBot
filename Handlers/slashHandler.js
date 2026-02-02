import { loadFiles } from "../Functions/fileLoader.js";
import ascii from "ascii-table";

export async function loadSlashCommands(client) {
    const table = new ascii().setHeading("Slash Command", "Status");

    // Clear existing commands
    client.slashcommands.clear();

    const Files = await loadFiles("slashs");

    for (const file of Files) {
        try {
            const url = `file://${file}`;
            const slashModule = await import(url);
            const slash = slashModule.default;

            if (slash && slash.data && slash.data.name) {
                client.slashcommands.set(slash.data.name, slash);
                table.addRow(slash.data.name, "🟩");
            } else {
                table.addRow(file, "🟥 (Missing data.name)");
            }
        } catch (error) {
            console.error(`Error loading slash command ${file}:`, error);
            table.addRow(file, "🟥 (Error)");
        }
    }

    console.log(table.toString(), "\nSlash Commands loaded successfully");
}
