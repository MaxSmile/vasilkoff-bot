import { join } from 'path';
import sqlite3 from 'sqlite3';
import { promises as fs } from 'fs';

const dataDirectory = join(process.cwd(), '_data');
const dbPath = join(dataDirectory, 'contactform.db');

async function initializeDb() {
  if (!await fs.exists(dataDirectory)) {
    await fs.mkdir(dataDirectory, { recursive: true });
  }

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error('Database opening error: ', err.message);
    }
  });

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientID TEXT,
      timestamp INTEGER,
      chatID TEXT,
      data TEXT
    )`);
  });

  return db;
}

export async function insertMessage(clientID,  chatID, data) {
  const db = await initializeDb();
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO contacts (clientID, timestamp, chatID, data) VALUES (?, ?, ?, ?)`, 
      [clientID, Date.now(), chatID, data], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

export async function fetchMessagesByClientID(clientID) {
  const db = await initializeDb();
  return new Promise((resolve, reject) => {
    db.all(`SELECT data FROM contacts WHERE clientID = ?`, [clientID], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
