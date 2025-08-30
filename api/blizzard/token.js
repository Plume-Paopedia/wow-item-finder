// Vercel serverless function for Blizzard OAuth2 token
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Blizzard API credentials
    const CLIENT_ID = '88495238ffe246c5a3f73cc731065b91';
    const CLIENT_SECRET = 'qo7FIA1BwKs46tLk1teAI1UE91eIVLq8';
    const AUTH_URL = 'https://eu.battle.net/oauth/token';

    // Create credentials for Basic Auth
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    // Request access token from Blizzard
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Blizzard OAuth error:', response.status, errorText);
      res.status(response.status).json({ 
        error: 'Failed to get access token from Blizzard',
        details: errorText
      });
      return;
    }

    const data = await response.json();
    
    // Return the token data
    res.status(200).json({
      access_token: data.access_token,
      token_type: data.token_type || 'bearer',
      expires_in: data.expires_in || 3600,
      scope: data.scope || ''
    });

  } catch (error) {
    console.error('Token endpoint error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}