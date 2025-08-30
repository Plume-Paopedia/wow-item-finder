export interface WowheadSearchResult {
  name: strin
  level: number
  classs: number;
  icon: string;
    armor?: number;
    sta?: number;
    int?: number;
  icon: string;
  jsonequip?: {
    armor?: number;
    agi?: number;
    sta?: number;
    str?: number;
    int?: number;
    spi?: number;
    dmgmin1?: number;
    dmgmax1?: number;
cons
 

export interface WowheadDetailedItem extends WowheadSearchResult {
  tooltip?: string;
  htmlTooltip?: string;
}

// Map Wowhead quality numbers to our quality strings
const qualityMap: Record<number, 'poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'> = {
  4: 'Armure
  1: 'common', 
  7: 'Artisanat'
  3: 'rare',
  10: 'Monna
  5: 'legendary'
  

// Map Wowhead class IDs to French class names
const classMap: Record<number, string> = {
  0: 'Consommable',
  1: 'Sac',
  2: 'Arme',
  3: 'Gemme',
  4: 'Masse à 
  5: 'Réactif',
  7: 'Masse à deux
  7: 'Artisanat',
  8: 'Article générique',
  9: 'Livre de sorts',
  10: 'Monnaie',
  11: 'Carquois',
  12: 'Quête',
  13: 'Clef',
};
  15: 'Divers',
  0: 'Divers',
};

// Map common subclass IDs for weapons and armor
const weaponSubclassMap: Record<number, string> = {
  0: 'Épée à une main',
  1: 'Hache à une main',
  2: 'Arc',
  3: 'Arme à feu',
  4: 'Masse à une main',
}
class WowheadAPI {
  private searchCache = ne
  private fallbackMo
  // Search i
    if (!query.tr
    const cach
      const cached =
    }
    // If in fall
      return this.simu

      // Try us
      
  

      });
      if (!res
      }
      const 
      
      const ite
      if (dat
          if (ca
          }
      }
      // Cach
      
  

      });
      return convertedItems;
      console.error('Error searching Wowhead, falling back to simulat
      // Enable f
}

  }
  // Get detailed item information
    if (this.itemCache.has(itemId)) {
  
    try {
      
        throw new Error(`HTTP error! status: ${response.status}`);

      const jsonText = text.replace(/^[^{]*/, '').replace(/[^}]*$/, '

      this.itemCache.set(itemId, item);
      return item;
      console.error(`Error fetching item 
    }

  p

      { na
      { name: 'A
      { name: 'Armur
      { name: 'Elixir de force', id: 2454, quality
      { name: 'Heaume de dragon 
      { name: 'Arc de tireur d\'élite',
      { name: 'Parchemin d\'enchantement', id: 634
      { name: 'Eau de source', id: 159, quality: 'common', keyw
      { name: 'Pierre de soin', id: 5512, quality: 'uncommon', keywords: ['
      { name: 'Bottes de vitesse', id: 4321, qu
    
 

class WowheadAPI {
  private baseUrl = 'https://nether.wowhead.com';
  private searchCache = new Map<string, WowheadSearchResult[]>();
  private itemCache = new Map<number, import('./data').WoWItem>();

  // Search items using Wowhead's search endpoint
  async searchItems(query: string, maxResults = 50): Promise<import('./data').WoWItem[]> {
    if (!query.trim()) return [];

    const cacheKey = `${query.toLowerCase()}_${maxResults}`;
    if (this.searchCache.has(cacheKey)) {
      const cached = this.searchCache.get(cacheKey)!;
      return cached.map(convertWowheadItem);
    }

    try {
      // Use Wowhead's search API
      const searchUrl = `${this.baseUrl}/search/suggestions.json`;
      const params = new URLSearchParams({
        q: query,
        types: 'item',
        locale: 'frFR'
      });

      const response = await fetch(`${searchUrl}?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WoW Item Finder',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Wowhead returns results in a specific format
      const items: WowheadSearchResult[] = [];
      
      if (data && Array.isArray(data)) {
        for (const category of data) {
          if (category.type === 'item' && category.results) {
            items.push(...category.results.slice(0, maxResults));
          }
        }
      }

      // Cache the results
      this.searchCache.set(cacheKey, items);
      
      // Convert and cache individual items
      const convertedItems = items.map(item => {
        const converted = convertWowheadItem(item);
        this.itemCache.set(item.id, converted);
        return converted;
      });

      return convertedItems;
    } catch (error) {
      console.error('Error searching Wowhead:', error);
      
      // Fallback to a simulated search using common WoW item names
      return this.simulateSearch(query);
    }
  }

  // Get detailed item information
  async getItemDetails(itemId: number): Promise<import('./data').WoWItem | null> {
    if (this.itemCache.has(itemId)) {
      return this.itemCache.get(itemId)!;
    }

    try {
      const response = await fetch(`${this.baseUrl}/tooltip/item/${itemId}?locale=frFR&jsonp=`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const jsonText = text.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      const data = JSON.parse(jsonText);

      const item = convertWowheadItem(data);
      this.itemCache.set(itemId, item);
      
      return item;
    } catch (error) {
      console.error(`Error fetching item ${itemId}:`, error);
      return null;
    }
  }

  // Fallback simulation for when Wowhead API is not accessible
  private simulateSearch(query: string): import('./data').WoWItem[] {
    const simulatedItems = [
      { name: 'Fluide fluorescent', id: 189164, quality: 'common', keywords: ['fluide', 'fluorescent', 'alchimie'] },
      { name: 'Épée longue en mithril', id: 7961, quality: 'uncommon', keywords: ['épée', 'mithril', 'arme'] },
      { name: 'Casque du conquérant', id: 16963, quality: 'epic', keywords: ['casque', 'conquérant', 'armure'] },
      { name: 'Potion de soins majeure', id: 13446, quality: 'common', keywords: ['potion', 'soins', 'majeure'] },
      { name: 'Anneau de puissance', id: 942, quality: 'rare', keywords: ['anneau', 'puissance', 'bijou'] },
      { name: 'Bâton des arcanes', id: 944, quality: 'rare', keywords: ['bâton', 'arcanes', 'magie'] },
      { name: 'Armure de plates draconique', id: 16991, quality: 'epic', keywords: ['armure', 'plates', 'draconique'] },
      { name: 'Dague empoisonnée', id: 2819, quality: 'uncommon', keywords: ['dague', 'empoisonnée', 'poison'] }
    ];

    const matchingItems = simulatedItems.filter(item =>
      item.keywords.some(keyword => 
        keyword.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(keyword.toLowerCase())
      ) || item.name.toLowerCase().includes(query.toLowerCase())
    );

    return matchingItems.map(item => ({
      id: item.id,
      name: item.name,
      quality: item.quality as any,
      item_level: Math.floor(Math.random() * 80) + 1,
      required_level: Math.floor(Math.random() * 80) + 1,
      item_class: 'Divers',
      item_subclass: 'Objet',
      icon: `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`,
      description: `Un objet mystérieux de ${item.name}`,
      stats: [
        { name: 'Valeur', value: Math.floor(Math.random() * 100) + 1 }
      ]
    }));
  }

  // Clear caches

    this.searchCache.clear();

  }


export const wowheadAPI = new WowheadAPI();