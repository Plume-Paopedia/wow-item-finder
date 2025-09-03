// Development API server for Blizzard Battle.net API integration
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Blizzard API Configuration - Using environment variables
const BLIZZARD_CONFIG = {
    CLIENT_ID: process.env.VITE_BLIZZARD_CLIENT_ID,
    CLIENT_SECRET: process.env.VITE_BLIZZARD_CLIENT_SECRET,
    REGION: process.env.VITE_BLIZZARD_REGION || 'eu',
    AUTH_URL: 'https://eu.battle.net/oauth/token',
    API_BASE: 'https://eu.api.blizzard.com'
};

// Verify configuration at startup
console.log('🔍 Configuration check:');
console.log('  CLIENT_ID:', BLIZZARD_CONFIG.CLIENT_ID ? '✅ Loaded' : '❌ Missing');
console.log('  CLIENT_SECRET:', BLIZZARD_CONFIG.CLIENT_SECRET ? '✅ Loaded' : '❌ Missing');
console.log('  REGION:', BLIZZARD_CONFIG.REGION);

if (!BLIZZARD_CONFIG.CLIENT_ID || !BLIZZARD_CONFIG.CLIENT_SECRET) {
    console.error('⚠️  Warning: Blizzard API credentials not found in environment variables!');
    console.error('   Make sure your .env file contains VITE_BLIZZARD_CLIENT_ID and VITE_BLIZZARD_CLIENT_SECRET');
}

let accessToken = null;
let tokenExpiry = 0;

// Get Blizzard access token
async function getBlizzardToken() {
    if (accessToken && Date.now() < tokenExpiry) {
        return accessToken;
    }

    if (!BLIZZARD_CONFIG.CLIENT_ID || !BLIZZARD_CONFIG.CLIENT_SECRET) {
        throw new Error('Missing Blizzard API credentials');
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
        const errorData = await response.text();
        console.error('OAuth error details:', errorData);
        throw new Error(`OAuth error: ${response.status}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

    console.log('✅ New Blizzard access token obtained');
    return accessToken;
}

// Token endpoint
app.get('/api/blizzard/token', async(req, res) => {
    try {
        const token = await getBlizzardToken();
        res.json({ access_token: token, expires_in: 3600 });
    } catch (error) {
        console.error('Token error:', error);
        res.status(500).json({ error: 'Failed to get access token' });
    }
});

// Item search endpoint
app.get('/api/items/search', async(req, res) => {
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
            const errorData = await response.text();
            console.error('Blizzard API search error:', response.status, errorData);
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

        console.log(`📦 Search for "${query}" returned ${items.length} items`);

        res.json({
            items: items.slice(0, parseInt(limit)),
            total: (data.page && data.page.resultCountTotal) || items.length
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Search failed', fallback: true });
    }
});

// Item details endpoint
app.get('/api/items/:id', async(req, res) => {
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
            const errorData = await response.text();
            console.error('Blizzard API item error:', response.status, errorData);
            throw new Error(`Item API error: ${response.status}`);
        }

        const data = await response.json();

        // Transform to our format
        const quality = mapBlizzardQuality(data.quality && data.quality.type || 'COMMON');

        const item = {
            id: data.id,
            name: data.name || `Item ${data.id}`,
            quality,
            item_level: data.level || 1,
            required_level: data.required_level || 1,
            item_class: (data.item_class && data.item_class.name) || 'Miscellaneous',
            item_subclass: (data.item_subclass && data.item_subclass.name) || 'Other',
            icon: `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`,
            description: (data.preview_item && data.preview_item.binding && data.preview_item.binding.name) || '',
            stats: extractItemStats(data),
            blizzard_data: data
        };

        console.log(`📦 Retrieved details for item ${id}: ${item.name}`);

        res.json({ item });
    } catch (error) {
        console.error('Item details error:', error);
        res.status(500).json({ error: 'Failed to get item details' });
    }
});

// Health check endpoint
app.get('/api/health', async(req, res) => {
    try {
        const token = await getBlizzardToken();
        res.json({
            status: 'healthy',
            blizzard_api: token ? 'connected' : 'disconnected',
            region: BLIZZARD_CONFIG.REGION
        });
    } catch (error) {
        res.json({
            status: 'degraded',
            blizzard_api: 'error',
            error: error.message
        });
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
        'LEGENDARY': 'legendary',
        'ARTIFACT': 'legendary',
        'HEIRLOOM': 'epic'
    };

    return qualityMap[blizzardQuality] || 'common';
}

function extractItemStats(blizzardItem) {
    const stats = [];

    if (blizzardItem.preview_item && blizzardItem.preview_item.stats) {
        blizzardItem.preview_item.stats.forEach(stat => {
            if (stat.type && stat.type.name && stat.value) {
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
    console.log(`📡 Blizzard API integration enabled`);
    console.log(`🌍 Region: ${BLIZZARD_CONFIG.REGION}`);
    console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
});