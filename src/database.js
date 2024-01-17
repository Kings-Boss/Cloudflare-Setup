
export async function putdb(path, data) {
    const databaseUrl = `https://contact-bot-0105-default-rtdb.firebaseio.com/${path}.json`;

        // Make a PUT request to the Firebase Realtime Database
        await fetch(databaseUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
        });
}


export async function getdb(path) {
    const databaseUrl = `https://contact-bot-0105-default-rtdb.firebaseio.com/${path}.json`;
    const response = await fetch(databaseUrl);
    const data = await response.json();
    return data
}

export async function deldb(path) {
    const databaseUrl = `https://contact-bot-0105-default-rtdb.firebaseio.com/${path}.json`;

    // Make a DELETE request to the Firebase Realtime Database
    await fetch(databaseUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
}