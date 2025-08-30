import { WoWItem, mockItems } from './data';
import { blizzardAPI } from './blizzard-api';
import { Locale } from './localization';

// Simulated API responses for Blizzard integration
export class SimulatedBlizzardAPI {
  private static instance: SimulatedBlizzardAPI;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private fallbackMode = false;

  private constructor() {}

  static getInstance(): SimulatedBlizzardAPI {
    if (!SimulatedBlizzardAPI.instance) {
      SimulatedBlizzardAPI.instance = new SimulatedBlizzardAPI();
    }
    return SimulatedBlizzardAPI.instance;
  }

  isInFallbackMode(): boolean {
    return this.fallbackMode || blizzardAPI.isInFallbackMode();
  }

  // Simulate getting an access token
  async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      // Try to use the real Blizzard API first
      const token = await (blizzardAPI as any).getAccessToken();
      this.accessToken = token;
      this.tokenExpiry = Date.now() + 3600000; // 1 hour
      this.fallbackMode = false;
      return token;
    } catch (error) {
      // Fall back to simulation
      console.warn('Failed to get real access token, using simulated mode');
      await new Promise(resolve => setTimeout(resolve, 200));
      
      this.accessToken = 'simulated_access_token_' + Date.now();
      this.tokenExpiry = Date.now() + 3600000; // 1 hour
      this.fallbackMode = true;
      
      return this.accessToken;
    }
  }

  // Enhanced search that combines multiple data sources
  async searchItems(query: string, limit: number = 100, locale: Locale = 'fr_FR'): Promise<WoWItem[]> {
    try {
      // First try the enhanced Blizzard API (which has fallback built-in)
      const results = await blizzardAPI.searchItems(query, limit, locale);
      
      // Also search the mock database for additional coverage
      const mockResults = this.searchMockItems(query, limit);
      
      // Combine results and remove duplicates
      const combinedResults = [...results];
      const existingIds = new Set(results.map(item => item.id));
      
      for (const mockItem of mockResults) {
        if (!existingIds.has(mockItem.id) && combinedResults.length < limit) {
          combinedResults.push(mockItem);
        }
      }
      
      this.fallbackMode = blizzardAPI.isInFallbackMode() && combinedResults.length === mockResults.length;
      
      return combinedResults.slice(0, limit);
    } catch (error) {
      console.warn('Error in comprehensive search, using mock data only:', error);
      this.fallbackMode = true;
      return this.searchMockItems(query, limit);
    }
  }

  // Search within the mock database
  private searchMockItems(query: string, limit: number): WoWItem[] {
    if (!query.trim()) {
      return mockItems.slice(0, limit);
    }

    const searchLower = query.toLowerCase();
    return mockItems
      .filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.item_class.toLowerCase().includes(searchLower) ||
        item.item_subclass.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      )
      .slice(0, limit);
  }

  // Simulate getting item details
  async getItemDetails(itemId: number): Promise<WoWItem | null> {
    try {
      await this.getAccessToken();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Find item in mock data
      const item = mockItems.find(item => item.id === itemId);
      return item || null;
    } catch (error) {
      console.warn('Error getting item details:', error);
      return null;
    }
  }

  // Simulate getting drop sources
  async getItemDropSources(itemId: number): Promise<any[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Simulate some drop sources
      const sources = [
        {
          encounterName: 'Ragnaros',
          instanceName: 'Cœur du Magma',
          difficultyHints: '40 joueurs'
        },
        {
          encounterName: 'Onyxia',
          instanceName: 'Repaire d\'Onyxia',
          difficultyHints: '40 joueurs'
        }
      ];
      
      return sources;
    } catch (error) {
      console.warn('Error getting drop sources:', error);
      return [];
    }
  }

  // Simulate getting craft sources
  async getItemCraftSources(itemId: number): Promise<any[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // MVP: return empty array as specified
      return [];
    } catch (error) {
      console.warn('Error getting craft sources:', error);
      return [];
    }
  }

  // Perform actual search with enhanced logic
  private performActualSearch(query: string, limit: number): WoWItem[] {
    const searchLower = query.toLowerCase().trim();
    
    if (!searchLower) {
      return [];
    }

    // Enhanced search algorithm
    const results = mockItems.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchLower);
      const classMatch = item.item_class.toLowerCase().includes(searchLower);
      const subclassMatch = item.item_subclass.toLowerCase().includes(searchLower);
      const qualityMatch = item.quality.toLowerCase().includes(searchLower);
      const descriptionMatch = item.description?.toLowerCase().includes(searchLower) || false;
      
      // Priority scoring
      let score = 0;
      if (item.name.toLowerCase() === searchLower) score += 100; // Exact match
      else if (item.name.toLowerCase().startsWith(searchLower)) score += 50; // Starts with
      else if (nameMatch) score += 25; // Contains
      
      if (classMatch) score += 10;
      if (subclassMatch) score += 10;
      if (qualityMatch) score += 5;
      if (descriptionMatch) score += 5;
      
      return score > 0;
    });

    // Sort by relevance and limit
    return results
      .sort((a, b) => {
        // Sort by item level (descending) then by name
        if (a.item_level !== b.item_level) {
          return b.item_level - a.item_level;
        }
        return a.name.localeCompare(b.name);
      })
      .slice(0, limit);
  }

  // Fallback search when API is unavailable
  private performFallbackSearch(query: string, limit: number): WoWItem[] {
    const searchLower = query.toLowerCase().trim();
    
    if (!searchLower) {
      return mockItems.slice(0, limit); // Return first items when no query
    }

    // Simple fallback search
    const results = mockItems.filter(item => 
      item.name.toLowerCase().includes(searchLower) ||
      item.item_class.toLowerCase().includes(searchLower) ||
      item.item_subclass.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower))
    );

    return results.slice(0, limit);
  }
}

// Export singleton instance
export const simulatedBlizzardAPI = SimulatedBlizzardAPI.getInstance();