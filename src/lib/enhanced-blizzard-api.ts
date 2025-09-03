import { WoWItem, mockItems } from './data';
import { Locale, DEFAULT_LOCALE, translateItemClass, translateQuality } from './localization';

// Enhanced Blizzard API that tries real Blizzard API first, then falls back to enhanced simulation
class EnhancedBlizzardAPI {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private fallbackMode = false;
  private blizzardApiEnabled = false;

  constructor() {
    // Check if Blizzard API is available
    this.checkBlizzardApiAvailability();
  }

  private async checkBlizzardApiAvailability() {
    try {
      // Try to reach the development server
      const response = await fetch('/api/blizzard/token', { 
        method: 'GET',
        signal: AbortSignal.timeout(3000) // 3 second timeout
      });
      
      if (response.ok) {
        this.blizzardApiEnabled = true;
        this.fallbackMode = false;
        console.log('✅ Blizzard API server is available');
      } else {
        throw new Error('Server not available');
      }
    } catch (error) {
      console.warn('⚠️ Blizzard API server not available, using enhanced simulation mode');
      this.blizzardApiEnabled = false;
      this.fallbackMode = true;
    }
  }

  isInFallbackMode(): boolean {
    return this.fallbackMode;
  }

  /**
   * Get access token (from real API if available, otherwise simulate)
   */
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    if (this.blizzardApiEnabled) {
      try {
        console.log('🔑 Trying to get token from server /api/blizzard/token');
        const response = await fetch('/api/blizzard/token');
        console.log('🔑 Token response:', response.status, response.ok);
        if (response.ok) {
          const data = await response.json();
          console.log('🔑 Token data:', data);
          this.accessToken = data.access_token;
          this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
          // Keep using server API even if it's returning mock data
          // The server handles the Blizzard API fallback, we just use the server
          console.log('🔑 Server token acquired, using server API');
          return this.accessToken;
        }
      } catch (error) {
        console.warn('🔑 Failed to get token from server, falling back to simulation:', error);
        this.blizzardApiEnabled = false;
        this.fallbackMode = true;
      }
    }

    // Simulate token generation only if server is not available
    await new Promise(resolve => setTimeout(resolve, 200));
    this.accessToken = 'simulated_token_' + Date.now();
    this.tokenExpiry = Date.now() + 3600000;
    this.fallbackMode = true;
    console.log('🔑 Using simulated token:', this.accessToken);
    return this.accessToken;
  }

  /**
   * Search for items with multi-language support
   */
  async searchItems(query: string, limit: number = 100, locale: Locale = DEFAULT_LOCALE): Promise<WoWItem[]> {
    console.log('🔍 Search called:', { query, limit, locale, blizzardApiEnabled: this.blizzardApiEnabled, fallbackMode: this.fallbackMode });
    
    await this.getAccessToken(); // Ensure we have a token
    
    console.log('🔑 After getAccessToken:', { blizzardApiEnabled: this.blizzardApiEnabled, fallbackMode: this.fallbackMode });

    if (this.blizzardApiEnabled) {
      try {
        // Use server API (which handles Blizzard API fallback internally)
        const url = `/api/items/search?q=${encodeURIComponent(query)}&limit=${limit}&locale=${locale}`;
        console.log('🌐 Using server API:', url);
        const response = await fetch(url);
        console.log('📡 Server response:', response.status, response.ok);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Server API success:', data.items?.length || 0, 'items found');
          return data.items || [];
        } else {
          throw new Error(`Server responded with ${response.status}`);
        }
      } catch (error) {
        console.warn('❌ Server API failed, falling back to local simulation:', error);
        this.blizzardApiEnabled = false;
        this.fallbackMode = true;
      }
    }

    // Enhanced simulation with multi-language support (only when server is unavailable)
    console.log('🔄 Using local simulated search');
    return this.searchItemsSimulated(query, limit, locale);
  }

  /**
   * Enhanced simulated search with better multi-language support
   */
  private searchItemsSimulated(query: string, limit: number, locale: Locale): Promise<WoWItem[]> {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
          resolve(mockItems.slice(0, limit));
          return;
        }

        const results = mockItems.filter(item => {
          // Search in item name
          if (item.name.toLowerCase().includes(searchTerm)) return true;
          
          // Search in translated item class
          const translatedClass = translateItemClass(item.item_class, locale);
          if (translatedClass.toLowerCase().includes(searchTerm)) return true;
          
          // Search in original item class
          if (item.item_class.toLowerCase().includes(searchTerm)) return true;
          
          // Search in item subclass
          if (item.item_subclass.toLowerCase().includes(searchTerm)) return true;
          
          // Search in description
          if (item.description && item.description.toLowerCase().includes(searchTerm)) return true;

          // Enhanced search for French terms
          if (locale === 'fr_FR') {
            // Map common French search terms to English equivalents
            const frenchTerms: Record<string, string[]> = {
              'épée': ['sword', 'épée'],
              'arme': ['weapon', 'arme'],
              'armure': ['armor', 'armure'],
              'bouclier': ['shield', 'bouclier'],
              'bâton': ['staff', 'bâton'],
              'dague': ['dagger', 'dague'],
              'arc': ['bow', 'arc'],
              'masse': ['mace', 'masse'],
              'hache': ['axe', 'hache'],
              'casque': ['helmet', 'casque'],
              'gants': ['gloves', 'gants'],
              'bottes': ['boots', 'bottes'],
              'ceinture': ['belt', 'ceinture'],
              'anneau': ['ring', 'anneau'],
              'collier': ['necklace', 'collier'],
              'cape': ['cloak', 'cape'],
              'potion': ['potion'],
              'élixir': ['elixir'],
              'parchemin': ['scroll', 'parchemin'],
              'gemme': ['gem', 'gemme'],
              'fluide': ['fluid', 'fluide'],
              'fluorescent': ['fluorescent']
            };

            for (const [french, englishTerms] of Object.entries(frenchTerms)) {
              if (searchTerm.includes(french)) {
                for (const englishTerm of englishTerms) {
                  if (item.name.toLowerCase().includes(englishTerm) ||
                      item.item_class.toLowerCase().includes(englishTerm) ||
                      item.item_subclass.toLowerCase().includes(englishTerm)) {
                    return true;
                  }
                }
              }
            }
          }

          return false;
        });

        // Sort by relevance (exact matches first, then partial matches)
        results.sort((a, b) => {
          const aExactName = a.name.toLowerCase() === searchTerm;
          const bExactName = b.name.toLowerCase() === searchTerm;
          
          if (aExactName && !bExactName) return -1;
          if (!aExactName && bExactName) return 1;
          
          const aStartsWithName = a.name.toLowerCase().startsWith(searchTerm);
          const bStartsWithName = b.name.toLowerCase().startsWith(searchTerm);
          
          if (aStartsWithName && !bStartsWithName) return -1;
          if (!aStartsWithName && bStartsWithName) return 1;
          
          // Sort by quality (legendary first)
          const qualityOrder = { legendary: 6, epic: 5, rare: 4, uncommon: 3, common: 2, poor: 1 };
          return (qualityOrder[b.quality] || 0) - (qualityOrder[a.quality] || 0);
        });

        resolve(results.slice(0, limit));
      }, Math.random() * 300 + 100); // 100-400ms delay to simulate network
    });
  }

  /**
   * Get detailed item information
   */
  async getItemDetails(itemId: number, locale: Locale = DEFAULT_LOCALE): Promise<WoWItem | null> {
    await this.getAccessToken();

    if (this.blizzardApiEnabled) {
      try {
        const response = await fetch(`/api/items/${itemId}?locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          return data.item;
        } else {
          throw new Error(`Server responded with ${response.status}`);
        }
      } catch (error) {
        console.warn('Server API failed for item details, falling back to simulation');
        this.blizzardApiEnabled = false;
        this.fallbackMode = true;
      }
    }

    // Simulated item details
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = mockItems.find(item => item.id === itemId);
        resolve(item || null);
      }, 100);
    });
  }

  /**
   * Get item drop sources (enhanced simulation)
   */
  async getItemDropSources(itemId: number): Promise<any[]> {
    await this.getAccessToken();

    return new Promise((resolve) => {
      setTimeout(() => {
        // Enhanced simulation with more realistic data
        const item = mockItems.find(item => item.id === itemId);
        if (!item) {
          resolve([]);
          return;
        }

        const simulatedSources = [];
        
        // Generate sources based on item quality and level
        if (item.quality === 'legendary') {
          simulatedSources.push({
            type: 'raid',
            name: 'Icecrown Citadel',
            boss: 'The Lich King',
            difficulty: 'Heroic',
            dropChance: '100%'
          });
        } else if (item.quality === 'epic') {
          simulatedSources.push({
            type: 'dungeon',
            name: 'Ulduar',
            boss: 'Yogg-Saron',
            difficulty: 'Normal',
            dropChance: '15%'
          });
        } else if (item.quality === 'rare') {
          simulatedSources.push({
            type: 'quest',
            name: 'The Fallen Hero of the Horde',
            zone: 'The Blasted Lands',
            level: item.required_level
          });
        } else {
          simulatedSources.push({
            type: 'vendor',
            name: 'Quartermaster Miranda Breechlock',
            zone: 'Stormwind City',
            cost: '15 Gold'
          });
        }

        resolve(simulatedSources);
      }, 150);
    });
  }

  /**
   * Get item crafting sources (enhanced simulation)
   */
  async getItemCraftSources(itemId: number): Promise<any[]> {
    await this.getAccessToken();

    return new Promise((resolve) => {
      setTimeout(() => {
        const item = mockItems.find(item => item.id === itemId);
        if (!item || !item.item_class.includes('Arme') && !item.item_class.includes('Armure')) {
          resolve([]);
          return;
        }

        // Simulate crafting recipes for weapons and armor
        const simulatedRecipes = [{
          profession: item.item_class.includes('Arme') ? 'Forgeron' : 'Travail du cuir',
          recipe: `Plans : ${item.name}`,
          skillRequired: Math.max(item.required_level * 5, 100),
          materials: [
            { name: 'Minerai de thorium', quantity: 20 },
            { name: 'Essence de feu', quantity: 4 },
            { name: 'Cuir épais', quantity: 12 }
          ]
        }];

        resolve(simulatedRecipes);
      }, 120);
    });
  }

  /**
   * Get API connection status with detailed info
   */
  getConnectionStatus() {
    return {
      isConnected: this.blizzardApiEnabled && !this.fallbackMode,
      mode: this.blizzardApiEnabled ? 'Server API (with Blizzard fallback)' : 'Local Simulation',
      itemCount: mockItems.length,
      lastUpdate: new Date().toISOString(),
      features: {
        multiLanguage: true,
        advancedSearch: true,
        itemDetails: true,
        dropSources: true,
        craftingSources: true
      }
    };
  }
}

// Export singleton instance
export const enhancedBlizzardAPI = new EnhancedBlizzardAPI();