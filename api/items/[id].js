// Vercel serverless function for item details via Blizzard API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
    const { id } = req.query;
    const { locale = 'fr_FR' } = req.query;

    if (!id) {
      res.status(400).json({ error: 'Item ID is required' });
      return;
    }

    // Get access token first
    const tokenResponse = await fetch(`${req.headers.host?.includes('localhost') ? 'http' : 'https'}://${req.headers.host}/api/blizzard/token`);
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const { access_token } = await tokenResponse.json();

    // Blizzard API configuration
    const API_BASE = 'https://eu.api.blizzard.com';
    const itemUrl = `${API_BASE}/data/wow/item/${id}`;
    
    // Build request parameters
    const params = new URLSearchParams({
      'namespace': 'static-eu',
      'locale': locale,
      'access_token': access_token
    });

    // Make request to Blizzard API
    const response = await fetch(`${itemUrl}?${params}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Blizzard API item error:', response.status, errorText);
      
      res.status(response.status).json({ 
        error: `Blizzard API error: ${response.status}`,
        details: errorText
      });
      return;
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
      icon: getItemIcon(data.media?.key?.href, data.id),
      description: data.preview_item?.binding?.name || '',
      stats: extractItemStats(data),
      blizzard_data: data // Keep original data
    };

    res.status(200).json({ item });

  } catch (error) {
    console.error('Item details endpoint error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

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

function getItemIcon(mediaHref, itemId) {
  if (mediaHref) {
    // This would require another API call to get the actual icon
    // For now, return a placeholder
    return `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`;
  }
  
  // Fallback icon
  return `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`;
}

function extractItemStats(blizzardItem) {
  const stats = [];
  
  // Extract preview item stats if available
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