// app/api/form/route.js

import { fetchMessagesByClientID, insertMessage } from "../_common/db";

export async function POST(request) {

  try {
    const reqData = await request.json();
    console.log('reqData', reqData)
    const { clientID, chatID } = reqData;
    const data = JSON.stringify(reqData);

    if (!clientID) {
      return Response.json({ message: 'Email or other client ID is required' }, { status: 400 });
    }

    if (!chatID) {
      return Response.json({ message: 'Chat ID is required' }, { status: 400 });
    }

    insertMessage(clientID, chatID, data);



    return Response.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: `Failed to save data: ${error.message}` }, { status: 500 });
  }
}
export async function GET(request) {
  try {
    const clientID = request.nextUrl.searchParams.get('clientID');
    const contacts = await fetchMessagesByClientID(clientID)
    return Response.json({ contacts });
  } catch (error) {
    console.error('Failed to fetch data: ', error.message);
    return Response.json({ message: 'Failed to fetch data' });
  }

}
