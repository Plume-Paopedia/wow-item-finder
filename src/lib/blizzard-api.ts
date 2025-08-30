import { WoWItem } from './data';

// Blizzard Battle.net API integration
class BlizzardAPI {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private region: string;
  private clientId: string;

  constructor() {
    this.region = 'eu'; // Default to EU
    this.clientId = '88495238ffe246c5a3f73cc731065b91'; // From env
  }

  /**
   * Get an access token from Battle.net OAuth
   */
  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      // In a real application, this would be done server-side to protect the client secret
      // For this demo, we'll simulate getting a token
      const response = await fetch('/api/blizzard/token');
      if (!response.ok) {
        throw new Error('Failed to get access token');
      }
      
      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // Refresh 1 minute early
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  /**
   * Search for items using the Battle.net API
   */
  async searchItems(query: string, limit: number = 100): Promise<WoWItem[]> {
    try {
      const response = await fetch(`/api/items/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to search items');
      }
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error searching items:', error);
      // Fallback to local data if API fails
      return this.getFallbackItems(query, limit);
    }
  }

  /**
   * Get detailed item information
   */
  async getItemDetails(itemId: number): Promise<WoWItem | null> {
    try {
      const response = await fetch(`/api/items/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to get item details');
      }
      
      const data = await response.json();
      return data.item || null;
    } catch (error) {
      console.error('Error getting item details:', error);
      return null;
    }
  }

  /**
   * Get drop sources for an item
   */
  async getItemDropSources(itemId: number): Promise<any[]> {
    try {
      const response = await fetch(`/api/sources/drops?itemId=${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to get drop sources');
      }
      
      const data = await response.json();
      return data.drops || [];
    } catch (error) {
      console.error('Error getting drop sources:', error);
      return [];
    }
  }

  /**
   * Get crafting sources for an item
   */
  async getItemCraftSources(itemId: number): Promise<any[]> {
    try {
      const response = await fetch(`/api/sources/craft?itemId=${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to get craft sources');
      }
      
      const data = await response.json();
      return data.recipes || [];
    } catch (error) {
      console.error('Error getting craft sources:', error);
      return [];
    }
  }

  /**
   * Fallback data when API is unavailable
   */
  private getFallbackItems(query: string, limit: number): WoWItem[] {
    const fallbackData: WoWItem[] = [
      {
        id: 19019,
        name: 'Fluide fluorescent',
        quality: 'uncommon',
        item_level: 1,
        required_level: 1,
        item_class: 'Trade Goods',
        item_subclass: 'Other',
        icon: 'inv_drink_12',
        description: 'Un liquide étrange qui brille d\'une lueur verte inquiétante.'
      },
      {
        id: 2589,
        name: 'Tissu de lin',
        quality: 'common',
        item_level: 5,
        required_level: 1,
        item_class: 'Trade Goods',
        item_subclass: 'Cloth',
        icon: 'inv_fabric_linen_01',
        description: 'Un tissu basique utilisé en couture.'
      },
      {
        id: 765,
        name: 'Pépite d\'argent',
        quality: 'common',
        item_level: 10,
        required_level: 1,
        item_class: 'Trade Goods',
        item_subclass: 'Metal & Stone',
        icon: 'inv_ore_silver_01',
        description: 'Une petite pépite d\'argent brut.'
      },
      {
        id: 1645,
        name: 'Grimoire de coups d\'épée',
        quality: 'uncommon',
        item_level: 15,
        required_level: 10,
        item_class: 'Consumable',
        item_subclass: 'Other',
        icon: 'inv_misc_book_02',
        description: 'Enseigne Coups d\'épée (+5).'
      },
      {
        id: 6948,
        name: 'Pierre de foyer',
        quality: 'common',
        item_level: 1,
        required_level: 1,
        item_class: 'Miscellaneous',
        item_subclass: 'Other',
        icon: 'inv_misc_rune_01',
        description: 'Vous ramène à votre auberge liée.'
      }
    ];

    const searchLower = query.toLowerCase();
    return fallbackData
      .filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.item_class.toLowerCase().includes(searchLower) ||
        item.item_subclass.toLowerCase().includes(searchLower)
      )
      .slice(0, limit);
  }
}

// Export a singleton instance
export const blizzardAPI = new BlizzardAPI();