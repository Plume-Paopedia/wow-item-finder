// Simple dev server for WoW Item Finder
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration Blizzard
const CLIENT_ID = process.env.VITE_BLIZZARD_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_BLIZZARD_CLIENT_SECRET;

console.log('🚀 Starting server...');
console.log('CLIENT_ID:', CLIENT_ID || 'NOT FOUND');
console.log('CLIENT_SECRET:', CLIENT_SECRET ? 'LOADED' : 'NOT FOUND');

let token = null;
let tokenExpiry = 0;

// Get token
async function getToken() {
  if (token && Date.now() < tokenExpiry) return token;
  
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://eu.battle.net/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  
  const data = await res.json();
  token = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  console.log('✅ Token obtained');
  return token;
}

// Token endpoint
app.get('/api/blizzard/token', async (req, res) => {
  try {
    const t = await getToken();
    res.json({ access_token: t, expires_in: 3600 });
  } catch (err) {
    console.error('Token error:', err.message);
    res.status(500).json({ error: 'Token failed' });
  }
});

// Search endpoint
app.get('/api/items/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Query required' });
    }
    
    const t = await getToken();
    const url = `https://eu.api.blizzard.com/data/wow/search/item?namespace=static-eu&locale=fr_FR&name.fr_FR=${query}&_pageSize=100&access_token=${t}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    const items = (data.results || []).map(r => ({
      id: r.data.id,
      name: r.data.name || 'Unknown',
      quality: 'common',
      item_level: 1,
      required_level: 1,
      item_class: 'Misc',
      item_subclass: 'Other',
      icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg'
    }));
    
    res.json({ items, total: items.length });
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});