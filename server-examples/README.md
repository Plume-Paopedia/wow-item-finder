# Production API Server Example

This directory contains examples for implementing server-side endpoints required for production deployment of the WoW Item Finder.

## Why Server-Side APIs are Required

The Blizzard Battle.net API requires:
1. **Client Secret Protection**: The client secret must never be exposed in frontend code
2. **OAuth2 Server Flow**: Token exchange must happen server-side
3. **Rate Limiting**: Proper handling of API rate limits
4. **Caching**: Efficient caching of API responses

## Implementation Examples

### Node.js/Express Example

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Blizzard API Configuration
const BLIZZARD_CONFIG = {
  CLIENT_ID: '88495238ffe246c5a3f73cc731065b91',
  CLIENT_SECRET: 'qo7FIA1BwKs46tLk1teAI1UE91eIVLq8',
  REGION: 'eu',
  AUTH_URL: 'https://eu.battle.net/oauth/token',
  API_BASE: 'https://eu.api.blizzard.com'
};

let accessToken = null;
let tokenExpiry = 0;

// Get Blizzard access token
async function getBlizzardToken() {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const credentials = Buffer.from(`${BLIZZARD_CONFIG.CLIENT_ID}:${BLIZZARD_CONFIG.CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(BLIZZARD_CONFIG.AUTH_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`OAuth error: ${response.status}`);
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  
  return accessToken;
}

// Token endpoint
app.get('/api/blizzard/token', async (req, res) => {
  try {
    const token = await getBlizzardToken();
    res.json({ access_token: token, expires_in: 3600 });
  } catch (error) {
    console.error('Token error:', error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

// Item search endpoint
app.get('/api/items/search', async (req, res) => {
  try {
    const { q: query, limit = 100, locale = 'fr_FR' } = req.query;
    const token = await getBlizzardToken();
    
    const searchUrl = `${BLIZZARD_CONFIG.API_BASE}/data/wow/search/item`;
    const params = new URLSearchParams({
      'namespace': 'static-eu',
      'locale': locale,
      [`name.${locale}`]: query,
      '_pageSize': limit.toString(),
      'access_token': token
    });

    const response = await fetch(`${searchUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Blizzard API error: ${response.status}`);
    }

    const data = await response.json();
    res.json({ items: data.results || [] });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Item details endpoint
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { locale = 'fr_FR' } = req.query;
    const token = await getBlizzardToken();
    
    const itemUrl = `${BLIZZARD_CONFIG.API_BASE}/data/wow/item/${id}`;
    const params = new URLSearchParams({
      'namespace': 'static-eu',
      'locale': locale,
      'access_token': token
    });

    const response = await fetch(`${itemUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Item API error: ${response.status}`);
    }

    const data = await response.json();
    res.json({ item: data });
  } catch (error) {
    console.error('Item details error:', error);
    res.status(500).json({ error: 'Failed to get item details' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
```

### Deployment Instructions

1. **Environment Variables**:
   ```env
   BLIZZARD_CLIENT_ID=88495238ffe246c5a3f73cc731065b91
   BLIZZARD_CLIENT_SECRET=qo7FIA1BwKs46tLk1teAI1UE91eIVLq8
   ```

2. **Docker Deployment**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3001
   CMD ["node", "server.js"]
   ```

3. **Vercel Deployment**:
   ```javascript
   // api/blizzard/token.js
   export default async function handler(req, res) {
     // Implementation here
   }
   ```

## Security Considerations

1. **Never expose client secret in frontend code**
2. **Use environment variables for sensitive data**
3. **Implement rate limiting**
4. **Add CORS protection**
5. **Use HTTPS in production**
6. **Implement caching to reduce API calls**

## Testing

Test your server endpoints:

```bash
# Test token endpoint
curl http://localhost:3001/api/blizzard/token

# Test search endpoint
curl "http://localhost:3001/api/items/search?q=épée&locale=fr_FR"

# Test item details
curl "http://localhost:3001/api/items/19019?locale=fr_FR"
```