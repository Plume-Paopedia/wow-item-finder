// Créez ce fichier pour tester
require('dotenv').config();

const CLIENT_ID = process.env.VITE_BLIZZARD_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_BLIZZARD_CLIENT_SECRET;

console.log('Checking dev-server environment:');
console.log('CLIENT_ID:', CLIENT_ID);
console.log('CLIENT_SECRET:', CLIENT_SECRET ? 'Found (' + CLIENT_SECRET.length + ' chars)' : 'NOT FOUND');
console.log('First 5 chars of secret:', CLIENT_SECRET ? CLIENT_SECRET.substring(0, 5) : 'N/A');

// Test direct
async function testAuth() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.log('❌ Missing credentials!');
        return;
    }

    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    try {
        const response = await fetch('https://oauth.battle.net/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        if (response.status === 200) {
            console.log('✅ Auth successful! Token received');
        } else {
            console.log('❌ Auth failed:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testAuth();