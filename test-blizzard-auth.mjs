// Utilisez l'extension .mjs pour les modules ES6
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.VITE_BLIZZARD_CLIENT_ID || '88495238ffe246c5a3f73cc731065b91';
const CLIENT_SECRET = process.env.VITE_BLIZZARD_CLIENT_SECRET || 'qo7ElA1BwKs46tLklteAiIUE91eIVLq8';

console.log('Testing Blizzard OAuth...');
console.log('Client ID:', CLIENT_ID);
console.log('Secret (first 5 chars):', CLIENT_SECRET.substring(0, 5) + '...');

async function testAuth() {
    try {
        const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        
        const response = await fetch('https://oauth.battle.net/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ SUCCESS! Token received');
            console.log('Token (first 20 chars):', data.access_token.substring(0, 20) + '...');
            console.log('Expires in:', data.expires_in, 'seconds');
        } else {
            console.log('❌ Authentication failed');
            console.log('Status:', response.status);
            console.log('Error:', data);
        }
    } catch (error) {
        console.error('❌ Connection error:', error.message);
    }
}

testAuth();