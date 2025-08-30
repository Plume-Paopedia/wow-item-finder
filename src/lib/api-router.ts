import { simulatedBlizzardAPI } from './simulated-api';

// Simple API router to simulate server endpoints
export class APIRouter {
  static async handleRequest(path: string, params?: URLSearchParams): Promise<any> {
    const pathParts = path.split('/').filter(Boolean);
    
    try {
      switch (pathParts[0]) {
        case 'api':
          return await this.handleAPIRoute(pathParts.slice(1), params);
        default:
          throw new Error('Route not found');
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  private static async handleAPIRoute(pathParts: string[], params?: URLSearchParams): Promise<any> {
    switch (pathParts[0]) {
      case 'blizzard':
        return await this.handleBlizzardRoute(pathParts.slice(1), params);
      case 'items':
        return await this.handleItemsRoute(pathParts.slice(1), params);
      case 'sources':
        return await this.handleSourcesRoute(pathParts.slice(1), params);
      default:
        throw new Error('API route not found');
    }
  }

  private static async handleBlizzardRoute(pathParts: string[], params?: URLSearchParams): Promise<any> {
    switch (pathParts[0]) {
      case 'token':
        // Simulate token endpoint
        try {
          const token = await simulatedBlizzardAPI.getAccessToken();
          return { access_token: token, expires_in: 3600 };
        } catch (error) {
          throw new Error('Failed to get access token');
        }
      default:
        throw new Error('Blizzard route not found');
    }
  }

  private static async handleItemsRoute(pathParts: string[], params?: URLSearchParams): Promise<any> {
    switch (pathParts[0]) {
      case 'search':
        // Handle /api/items/search?q=query&limit=100
        const query = params?.get('q') || '';
        const limit = parseInt(params?.get('limit') || '100');
        
        if (!query) {
          throw new Error('Query parameter is required');
        }

        const items = await simulatedBlizzardAPI.searchItems(query, limit);
        return { items };

      default:
        // Handle /api/items/:id
        const itemId = parseInt(pathParts[0]);
        if (isNaN(itemId)) {
          throw new Error('Invalid item ID');
        }

        const item = await simulatedBlizzardAPI.getItemDetails(itemId);
        if (!item) {
          throw new Error('Item not found');
        }

        return { item };
    }
  }

  private static async handleSourcesRoute(pathParts: string[], params?: URLSearchParams): Promise<any> {
    const itemId = parseInt(params?.get('itemId') || '0');
    if (isNaN(itemId) || itemId === 0) {
      throw new Error('Invalid itemId parameter');
    }

    switch (pathParts[0]) {
      case 'drops':
        // Handle /api/sources/drops?itemId=123
        const drops = await simulatedBlizzardAPI.getItemDropSources(itemId);
        return { itemId, drops };

      case 'craft':
        // Handle /api/sources/craft?itemId=123
        const recipes = await simulatedBlizzardAPI.getItemCraftSources(itemId);
        return { itemId, recipes };

      default:
        throw new Error('Sources route not found');
    }
  }
}

// Simple fetch wrapper that routes to our API simulation
export async function apifetch(url: string, options?: RequestInit): Promise<Response> {
  const fullUrl = new URL(url, window.location.origin);
  const path = fullUrl.pathname;
  const params = fullUrl.searchParams;

  try {
    const data = await APIRouter.handleRequest(path, params);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: error instanceof Error && error.message.includes('not found') ? 404 : 500,
      statusText: 'Error',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Override global fetch for our API routes
const originalFetch = window.fetch;
window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  
  // If it's an API route, use our simulation
  if (url.includes('/api/')) {
    return apifetch(url, init);
  }
  
  // Otherwise, use the original fetch
  return originalFetch(input, init);
};