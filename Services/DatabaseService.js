import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class DatabaseService {
    constructor() {
        this.dbs = {};
    }

    getDatabase(name) {
        if (!this.dbs[name]) {
            const dbPath = `./BD/${name}.sqlite`;
            const db = new sqlite3.Database(dbPath);
            
            this.dbs[name] = {
                db,
                get: promisify(db.get.bind(db)),
                all: promisify(db.all.bind(db)),
                run: promisify(db.run.bind(db)),
                exec: promisify(db.exec.bind(db))
            };
        }
        return this.dbs[name];
    }

    // Shorcuts for common databases
    get bot() {
        return this.getDatabase('db_bot');
    }

    get webhooks() {
        return this.getDatabase('db_webhooks');
    }
    
    get cartera() {
        return this.getDatabase('db_cartera');
    }
}

export const dbService = new DatabaseService();
