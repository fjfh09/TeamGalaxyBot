import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./BD/db_cartera.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS deudores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id TEXT,
    debtor_name TEXT,
    amount INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error("Error creating table:", err);
    } else {
        console.log("Table 'deudores' created or already exists.");
    }
});
