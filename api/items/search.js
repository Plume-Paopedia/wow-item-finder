// Vercel serverless function for item search via Blizzard API
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
    const { q: query, limit = 100, locale = 'fr_FR' } = req.query;

    if (!query || query.trim().length === 0) {
      res.status(400).json({ error: 'Query parameter "q" is required' });
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
    const searchUrl = `${API_BASE}/data/wow/search/item`;
    
    // Build search parameters
    const params = new URLSearchParams({
      'namespace': 'static-eu',
      'locale': locale,
      '_pageSize': Math.min(parseInt(limit), 1000).toString(), // Cap at 1000
      'access_token': access_token
    });

    // Add name search based on locale
    if (locale === 'fr_FR') {
      params.append('name.fr_FR', query);
    } else {
      params.append('name.en_US', query);
    }

    // Make request to Blizzard API
    const response = await fetch(`${searchUrl}?${params}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Blizzard API search error:', response.status, errorText);
      
      // Return error but don't fail completely - client can fallback
      res.status(200).json({ 
        items: [],
        error: `Blizzard API error: ${response.status}`,
        fallback: true
      });
      return;
    }

    const data = await response.json();
    
    // Transform results to our format
    const items = (data.results || []).map(result => ({
      id: result.data.id,
      name: result.data.name || `Item ${result.data.id}`,
      // We'll need another API call to get full details, for now return basic info
      quality: 'common', // Default, would need item details API call
      item_level: 1,
      required_level: 1,
      item_class: 'Miscellaneous',
      item_subclass: 'Other',
      icon: `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`,
      description: '',
      blizzard_data: result.data // Keep original data for later processing
    }));

    res.status(200).json({
      items: items.slice(0, parseInt(limit)),
      total: data.page?.resultCountTotal || items.length,
      page: data.page || { page: 1, pageSize: parseInt(limit) }
    });

  } catch (error) {
    console.error('Search endpoint error:', error);
    res.status(200).json({ 
      items: [],
      error: error.message,
      fallback: true
    });
  }
}