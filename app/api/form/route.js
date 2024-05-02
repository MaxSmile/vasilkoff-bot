// app/api/form/route.js

import { insertMessage } from "../_common/db";

export async function POST(request) {

  try {
      const reqData = await request.json();
      const {clientID, chatID} = reqData; 
      const data = JSON.stringify(reqData); 

      if (!clientID) {
          return Response({error:'Email or other client ID is required'}, { status: 400 });
      }

      if (!chatID) {
        return Response({error:'Chat ID is required'}, { status: 400 });
    }

      insertMessage(clientID, chatID, data);

      

      return Response.json({success:'Data saved successfully'}, { status: 200 });
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
