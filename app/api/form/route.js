import sqlite3 from 'sqlite3';
import { join } from 'path';
import fs from 'fs';
import { error } from 'console';

const dataDirectory = join(process.cwd(), "_data");
const dbPath = join(dataDirectory, 'contactform.db');

// Ensure data directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Database opening error: ', err.message);
  } else {
    console.log('Database opened successfully'); 
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      data TEXT
    )`, (err) => {
        console.error('Table creation error: ', err);
    });
  }
});

export async function POST(request) {
  if (!db) {
      return Response({error:'Database is not initialized'}, { status: 500 });
  }

  try {
      const reqData = await request.json();
      const email = reqData.email; 
      const data = JSON.stringify(reqData); 

      if (!email) {
          return Response({error:'Email is required'}, { status: 400 });
      }

      const insertResult = await new Promise((resolve, reject) => {
          const query = 'INSERT INTO contacts (email, data) VALUES (?, ?)';
          db.run(query, [email, data], function(err) {
              if (err) {
                  reject(new Error(`SQL Error: ${err.message}`));
              } else {
                  resolve(this.lastID);
              }
          });
      });

      return Response.json({success:`Data saved successfully, ID: ${insertResult}`}, { status: 200 });
  } catch (error) {
      return Response.json({error: `Failed to save data: ${error.message}`}, { status: 500 });
  }
}
export async function GET() {
  try {
    const contacts = await new Promise((resolve, reject) => {
      const stmt = db.prepare('SELECT * FROM contacts');
      stmt.all(function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
      stmt.finalize();
    });
    return Response.json({ contacts });
  } catch (error) {
    console.error('Failed to fetch data: ', error.message);
    return Response.json({ error: 'Failed to fetch data' });
  } 
  
}
