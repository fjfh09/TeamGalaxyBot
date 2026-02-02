import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./BD/db_bot.sqlite');

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Tables:", tables);
    tables.forEach(table => {
        db.all(`PRAGMA table_info(${table.name})`, (err, rows) => {
            if (err) console.error(err);
            console.log(`Schema for ${table.name}:`, rows);
        });
    });
});
