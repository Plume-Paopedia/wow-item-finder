import { WoWItem } from './data';
import { Locale, BLIZZARD_LOCALE_MAP } from './localization';
import { mockItems } from './data'; // Import the comprehensive item database

// Blizzard Battle.net API configuration
const BLIZZARD_CONFIG = {
  CLIENT_ID: '88495238ffe246c5a3f73cc731065b91',
  CLIENT_SECRET: 'qo7FIA1BwKs46tLk1teAI1UE91eIVLq8', // In production, this should be on server-side only
  REGION: 'eu',
  NAMESPACE: 'static-eu',
  API_BASE: 'https://eu.api.blizzard.com',
  AUTH_BASE: 'https://eu.battle.net'
};

// Blizzard Battle.net API integration
class BlizzardAPI {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private region: string;
  private clientId: string;
  private clientSecret: string;
  private apiBase: string;
  private authBase: string;
  private fallbackMode: boolean = false;

  constructor() {
    this.region = BLIZZARD_CONFIG.REGION;
    this.clientId = BLIZZARD_CONFIG.CLIENT_ID;
    this.clientSecret = BLIZZARD_CONFIG.CLIENT_SECRET;
    this.apiBase = BLIZZARD_CONFIG.API_BASE;
    this.authBase = BLIZZARD_CONFIG.AUTH_BASE;
  }

  /**
   * Get an access token from Battle.net OAuth
   * In production, this should be done server-side to protect the client secret
   */
  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      // Try to get token from server-side endpoint first
      const response = await fetch('/api/blizzard/token');
      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // Refresh 1 minute early
        this.fallbackMode = false;
        return this.accessToken;
      }
      
      // If server endpoint doesn't exist, try direct OAuth (for development only)
      console.warn('Server endpoint not available, attempting direct OAuth (development only)');
      return await this.getAccessTokenDirect();
      
    } catch (error) {
      console.error('Error getting access token:', error);
      console.warn('Falling back to simulated mode');
      this.fallbackMode = true;
      throw error;
    }
  }

  /**
   * Direct OAuth token request (development only - exposes client secret)
   * In production, this should NEVER be used
   */
  private async getAccessTokenDirect(): Promise<string> {
    const tokenUrl = `${this.authBase}/oauth/token`;
    const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`OAuth error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    this.fallbackMode = false;
    
    return this.accessToken;
  }

  /**
   * Check if API is in fallback mode
   */
  isInFallbackMode(): boolean {
    return this.fallbackMode;
  }

  /**
   * Search for items using the Battle.net API
   */
  async searchItems(query: string, limit: number = 100, locale: Locale = 'fr_FR'): Promise<WoWItem[]> {
    try {
      // Try the real API first
      const results = await this.searchItemsReal(query, limit, locale);
      return results;
    } catch (error) {
      console.error('Error searching items via API:', error);
      console.warn('Falling back to local data');
      // Fallback to local data if API fails
      return this.getFallbackItems(query, limit);
    }
  }

  /**
   * Search items using real Blizzard API
   */
  private async searchItemsReal(query: string, limit: number, locale: Locale): Promise<WoWItem[]> {
    try {
      const token = await this.getAccessToken();
      const blizzardLocale = BLIZZARD_LOCALE_MAP[locale];
      
      // Use Blizzard's item search endpoint
      const searchUrl = `${this.apiBase}/data/wow/search/item`;
      const params = new URLSearchParams({
        'namespace': BLIZZARD_CONFIG.NAMESPACE,
        'locale': blizzardLocale,
        'name.fr_FR': locale === 'fr_FR' ? query : '',
        'name.en_US': locale === 'en_US' ? query : '',
        '_pageSize': limit.toString(),
        'access_token': token
      });

      // Remove empty parameters
      for (const [key, value] of params.entries()) {
        if (!value) {
          params.delete(key);
        }
      }

      const response = await fetch(`${searchUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Blizzard API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Convert Blizzard API response to our format
      const items: WoWItem[] = await Promise.all(
        (data.results || []).slice(0, limit).map(async (result: any) => {
          try {
            return await this.getItemDetailsReal(result.data.id, locale);
          } catch (error) {
            console.warn(`Failed to get details for item ${result.data.id}:`, error);
            return null;
          }
        })
      );

      return items.filter(item => item !== null) as WoWItem[];
      
    } catch (error) {
      console.error('Real API search failed:', error);
      throw error;
    }
  }

  /**
   * Get detailed item information
   */
  async getItemDetails(itemId: number, locale: Locale = 'fr_FR'): Promise<WoWItem | null> {
    try {
      return await this.getItemDetailsReal(itemId, locale);
    } catch (error) {
      console.error('Error getting item details:', error);
      // Try fallback data
      const fallbackItems = this.getFallbackItems('', 1000);
      return fallbackItems.find(item => item.id === itemId) || null;
    }
  }

  /**
   * Get item details from real Blizzard API
   */
  private async getItemDetailsReal(itemId: number, locale: Locale): Promise<WoWItem | null> {
    try {
      const token = await this.getAccessToken();
      const blizzardLocale = BLIZZARD_LOCALE_MAP[locale];
      
      const itemUrl = `${this.apiBase}/data/wow/item/${itemId}`;
      const params = new URLSearchParams({
        'namespace': BLIZZARD_CONFIG.NAMESPACE,
        'locale': blizzardLocale,
        'access_token': token
      });

      const response = await fetch(`${itemUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Item API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Convert Blizzard API response to our format
      return this.convertBlizzardItem(data, locale);
      
    } catch (error) {
      console.error('Real API item details failed:', error);
      throw error;
    }
  }

  /**
   * Convert Blizzard API item to our format
   */
  private convertBlizzardItem(blizzardItem: any, locale: Locale): WoWItem {
    const quality = this.mapBlizzardQuality(blizzardItem.quality?.type || 'COMMON');
    
    return {
      id: blizzardItem.id,
      name: blizzardItem.name || `Item ${blizzardItem.id}`,
      quality,
      item_level: blizzardItem.level || 1,
      required_level: blizzardItem.required_level || 1,
      item_class: blizzardItem.item_class?.name || 'Miscellaneous',
      item_subclass: blizzardItem.item_subclass?.name || 'Other',
      icon: this.getItemIcon(blizzardItem.media?.key?.href, blizzardItem.id),
      description: blizzardItem.preview_item?.binding?.name || '',
      stats: this.extractItemStats(blizzardItem)
    };
  }

  /**
   * Map Blizzard quality types to our format
   */
  private mapBlizzardQuality(blizzardQuality: string): WoWItem['quality'] {
    const qualityMap: Record<string, WoWItem['quality']> = {
      'POOR': 'poor',
      'COMMON': 'common',
      'UNCOMMON': 'uncommon',
      'RARE': 'rare',
      'EPIC': 'epic',
      'LEGENDARY': 'legendary'
    };
    
    return qualityMap[blizzardQuality] || 'common';
  }

  /**
   * Get item icon URL
   */
  private getItemIcon(mediaHref?: string, itemId?: number): string {
    if (mediaHref) {
      // This would require another API call to get the actual icon
      // For now, return a placeholder
      return `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`;
    }
    
    // Fallback icon
    return `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`;
  }

  /**
   * Extract item statistics from Blizzard API response
   */
  private extractItemStats(blizzardItem: any): Array<{ name: string; value: number }> {
    const stats: Array<{ name: string; value: number }> = [];
    
    // Extract preview item stats if available
    if (blizzardItem.preview_item?.stats) {
      blizzardItem.preview_item.stats.forEach((stat: any) => {
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
   * Enhanced fallback data when API is unavailable
   * This provides a comprehensive set of iconic WoW items for demonstration
   */
  private getFallbackItems(query: string, limit: number): WoWItem[] {
    // Use the comprehensive item database from data.ts
    if (!query.trim()) {
      return mockItems.slice(0, limit);
    }

    const searchLower = query.toLowerCase();
    const filtered = mockItems.filter(item => 
      item.name.toLowerCase().includes(searchLower) ||
      item.item_class.toLowerCase().includes(searchLower) ||
      item.item_subclass.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    );

    return filtered.slice(0, limit);
  }
}

// Export a singleton instance
export const blizzardAPI = new BlizzardAPI();