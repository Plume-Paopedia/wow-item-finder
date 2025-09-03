require('dotenv').config();

console.log('=== Server Configuration Check ===');
console.log('');
console.log('Environment Variables:');
console.log('- VITE_BLIZZARD_CLIENT_ID:', process.env.VITE_BLIZZARD_CLIENT_ID || '❌ NOT SET');
console.log('- VITE_BLIZZARD_CLIENT_SECRET:', process.env.VITE_BLIZZARD_CLIENT_SECRET ? '✅ SET' : '❌ NOT SET');
console.log('- VITE_BLIZZARD_REGION:', process.env.VITE_BLIZZARD_REGION || 'eu (default)');
console.log('');

// Test OAuth
async function testOAuth() {
    const CLIENT_ID = process.env.VITE_BLIZZARD_CLIENT_ID;
    const CLIENT_SECRET = process.env.VITE_BLIZZARD_CLIENT_SECRET;

    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.log('❌ Missing credentials in environment');
        return;
    }

    try {
        const response = await fetch('https://oauth.battle.net/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        if (response.ok) {
            console.log('✅ OAuth test successful - API credentials are valid');
        } else {
            console.log('❌ OAuth test failed - Status:', response.status);
        }
    } catch (error) {
        console.log('❌ Connection error:', error.message);
    }
}

testOAuth();