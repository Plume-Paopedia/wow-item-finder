// Development API server for Blizzard Battle.net API integration
const express = require('express');
const cors = require('cors');

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
    
    if (!query || query.trim().length === 0) {
      res.status(400).json({ error: 'Query parameter "q" is required' });
      return;
    }

    const token = await getBlizzardToken();
    
    const searchUrl = `${BLIZZARD_CONFIG.API_BASE}/data/wow/search/item`;
    const params = new URLSearchParams({
      'namespace': 'static-eu',
      'locale': locale,
      '_pageSize': Math.min(parseInt(limit), 1000).toString(),
      'access_token': token
    });

    // Add name search based on locale
    if (locale === 'fr_FR') {
      params.append('name.fr_FR', query);
    } else {
      params.append('name.en_US', query);
    }

    const response = await fetch(`${searchUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Blizzard API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform results to our format
    const items = (data.results || []).map(result => ({
      id: result.data.id,
      name: result.data.name || `Item ${result.data.id}`,
      quality: 'common', // Default, would need item details API call
      item_level: 1,
      required_level: 1,
      item_class: 'Miscellaneous',
      item_subclass: 'Other',
      icon: `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`,
      description: '',
      blizzard_data: result.data
    }));

    res.json({ 
      items: items.slice(0, parseInt(limit)),
      total: data.page?.resultCountTotal || items.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed', fallback: true });
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
    
    // Transform to our format
    const quality = mapBlizzardQuality(data.quality?.type || 'COMMON');
    
    const item = {
      id: data.id,
      name: data.name || `Item ${data.id}`,
      quality,
      item_level: data.level || 1,
      required_level: data.required_level || 1,
      item_class: data.item_class?.name || 'Miscellaneous',
      item_subclass: data.item_subclass?.name || 'Other',
      icon: `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`,
      description: data.preview_item?.binding?.name || '',
      stats: extractItemStats(data),
      blizzard_data: data
    };

    res.json({ item });
  } catch (error) {
    console.error('Item details error:', error);
    res.status(500).json({ error: 'Failed to get item details' });
  }
});

// Helper functions
function mapBlizzardQuality(blizzardQuality) {
  const qualityMap = {
    'POOR': 'poor',
    'COMMON': 'common',
    'UNCOMMON': 'uncommon',
    'RARE': 'rare',
    'EPIC': 'epic',
    'LEGENDARY': 'legendary'
  };
  
  return qualityMap[blizzardQuality] || 'common';
}

function extractItemStats(blizzardItem) {
  const stats = [];
  
  if (blizzardItem.preview_item?.stats) {
    blizzardItem.preview_item.stats.forEach(stat => {
      if (stat.type?.name && stat.value) {
        stats.push({
          name: stat.type.name,
          value: stat.value
        });
      }
    });
  }
  
  return stats;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Development API server running on port ${PORT}`);
  console.log(`📡 Blizzard API integration enabled with Client ID: ${BLIZZARD_CONFIG.CLIENT_ID}`);
  console.log(`🌍 Region: ${BLIZZARD_CONFIG.REGION}`);
});