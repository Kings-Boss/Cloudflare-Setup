
export async function putdb(path, data) {
    const databaseUrl = `https://mybot-md2-default-rtdb.firebaseio.com/${path}.json`;

        // Make a PUT request to the Firebase Realtime Database
        const response = await fetch(databaseUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
        });
}


export async function getdb(path) {
    const databaseUrl = `https://mybot-md2-default-rtdb.firebaseio.com/${path}.json`;
    const response = await fetch(databaseUrl);
    const data = await response.json();
    return data
}
