export interface WowheadSearchResult {
  id: number;
  name: string;
  quality: number;
  level: number;
  reqLevel: number;
  classs: number;
  subclass: number;
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
  };
}

export interface WowheadDetailedItem extends WowheadSearchResult {
  tooltip?: string;
  htmlTooltip?: string;
}

// Map Wowhead quality numbers to our quality strings
const qualityMap: Record<number, 'poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'> = {
  0: 'poor',
  1: 'common', 
  2: 'uncommon',
  3: 'rare',
  4: 'epic',
  5: 'legendary'
};

// Map Wowhead class IDs to French class names
const classMap: Record<number, string> = {
  0: 'Consommable',
  1: 'Sac',
  2: 'Arme',
  3: 'Gemme',
  4: 'Armure',
  5: 'Réactif',
  6: 'Projectile',
  7: 'Artisanat',
  8: 'Article générique',
  9: 'Livre de sorts',
  10: 'Monnaie',
  11: 'Carquois',
  12: 'Quête',
  13: 'Clef',
  14: 'Permanent',
  15: 'Divers',
  16: 'Glyphe'
};

// Map common subclass IDs for weapons and armor
const weaponSubclassMap: Record<number, string> = {
  0: 'Épée à une main',
  1: 'Hache à une main',
  2: 'Arc',
  3: 'Arme à feu',
  4: 'Masse à une main',
  5: 'Épée à deux mains',
  6: 'Hache à deux mains',
  7: 'Masse à deux mains',
  8: 'Arme d\'hast',
  9: 'Bâton',
  10: 'Exotique',
  13: 'Dague',
  14: 'Arme de jet',
  15: 'Arbalète',
  16: 'Baguette',
  17: 'Canne à pêche',
  18: 'Poings',
  19: 'Divers',
  20: 'Objet en main gauche'
};

const armorSubclassMap: Record<number, string> = {
  0: 'Divers',
  1: 'Tissu',
  2: 'Cuir',
  3: 'Mailles',
  4: 'Plaques',
  5: 'Objet',
  6: 'Bouclier',
  7: 'Libram',
  8: 'Idole',
  9: 'Totem',
  10: 'Relique'
};

function getSubclassName(classId: number, subclassId: number): string {
  if (classId === 2) return weaponSubclassMap[subclassId] || 'Arme';
  if (classId === 4) return armorSubclassMap[subclassId] || 'Armure';
  return 'Objet';
}

// Convert Wowhead item to our format
export function convertWowheadItem(item: WowheadSearchResult): import('./data').WoWItem {
  const stats: Array<{ name: string; value: number }> = [];
  
  if (item.jsonequip) {
    const equip = item.jsonequip;
    if (equip.armor) stats.push({ name: 'Armure', value: equip.armor });
    if (equip.str) stats.push({ name: 'Force', value: equip.str });
    if (equip.agi) stats.push({ name: 'Agilité', value: equip.agi });
    if (equip.sta) stats.push({ name: 'Endurance', value: equip.sta });
    if (equip.int) stats.push({ name: 'Intelligence', value: equip.int });
    if (equip.spi) stats.push({ name: 'Esprit', value: equip.spi });
    if (equip.dmgmin1 && equip.dmgmax1) {
      stats.push({ name: 'Dégâts d\'attaque', value: Math.round((equip.dmgmin1 + equip.dmgmax1) / 2) });
    }
  }

  return {
    id: item.id,
    name: item.name,
    quality: qualityMap[item.quality] || 'common',
    item_level: item.level || 1,
    required_level: item.reqLevel || 1,
    item_class: classMap[item.classs] || 'Divers',
    item_subclass: getSubclassName(item.classs, item.subclass),
    icon: `https://wow.zamimg.com/images/wow/icons/large/${item.icon}.jpg`,
    stats: stats.length > 0 ? stats : undefined
  };
}

class WowheadAPI {
  private baseUrl = 'https://nether.wowhead.com';
  private searchCache = new Map<string, WowheadSearchResult[]>();
  private itemCache = new Map<number, import('./data').WoWItem>();
  private fallbackMode = false;

  // Search items using Wowhead's search endpoint
  async searchItems(query: string, maxResults = 50): Promise<import('./data').WoWItem[]> {
    if (!query.trim()) return [];

    const cacheKey = `${query.toLowerCase()}_${maxResults}`;
    if (this.searchCache.has(cacheKey)) {
      const cached = this.searchCache.get(cacheKey)!;
      return cached.map(convertWowheadItem);
    }

    // If in fallback mode, use simulation immediately
    if (this.fallbackMode) {
      return this.simulateSearch(query);
    }

    try {
      // Try using a CORS proxy or direct API call
      const searchUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`${this.baseUrl}/search/suggestions.json?q=${encodeURIComponent(query)}&types=item&locale=frFR`)}`;
      
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents);
      
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
      console.error('Error searching Wowhead, falling back to simulation:', error);
      
      // Enable fallback mode for future requests
      this.fallbackMode = true;
      
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
      { name: 'Fluide fluorescent', id: 189164, quality: 'common', keywords: ['fluide', 'fluorescent', 'alchimie', 'composant'], class: 7, subclass: 5 },
      { name: 'Épée longue en mithril', id: 7961, quality: 'uncommon', keywords: ['épée', 'mithril', 'arme', 'lame'], class: 2, subclass: 7 },
      { name: 'Casque du conquérant', id: 16963, quality: 'epic', keywords: ['casque', 'conquérant', 'armure', 'tête'], class: 4, subclass: 4 },
      { name: 'Potion de soins majeure', id: 13446, quality: 'common', keywords: ['potion', 'soins', 'majeure', 'santé'], class: 0, subclass: 1 },
      { name: 'Anneau de puissance', id: 942, quality: 'rare', keywords: ['anneau', 'puissance', 'bijou', 'doigt'], class: 4, subclass: 0 },
      { name: 'Bâton des arcanes', id: 944, quality: 'rare', keywords: ['bâton', 'arcanes', 'magie', 'mage'], class: 2, subclass: 9 },
      { name: 'Armure de plates draconique', id: 16991, quality: 'epic', keywords: ['armure', 'plates', 'draconique', 'dragon'], class: 4, subclass: 4 },
      { name: 'Dague empoisonnée', id: 2819, quality: 'uncommon', keywords: ['dague', 'empoisonnée', 'poison', 'voleur'], class: 2, subclass: 13 },
      { name: 'Elixir de force', id: 2454, quality: 'common', keywords: ['elixir', 'force', 'buff', 'temporaire'], class: 0, subclass: 1 },
      { name: 'Grimoire des flammes', id: 16309, quality: 'rare', keywords: ['grimoire', 'flammes', 'sort', 'démoniste'], class: 9, subclass: 0 },
      { name: 'Heaume de dragon noir', id: 16914, quality: 'epic', keywords: ['heaume', 'dragon', 'noir', 'raid'], class: 4, subclass: 4 },
      { name: 'Cristal de mana', id: 8007, quality: 'uncommon', keywords: ['cristal', 'mana', 'magie', 'énergie'], class: 0, subclass: 0 },
      { name: 'Arc de tireur d\'élite', id: 19361, quality: 'rare', keywords: ['arc', 'tireur', 'élite', 'chasseur'], class: 2, subclass: 2 },
      { name: 'Robe de mage de bataille', id: 14152, quality: 'uncommon', keywords: ['robe', 'mage', 'bataille', 'tissu'], class: 4, subclass: 1 },
      { name: 'Parchemin d\'enchantement', id: 6342, quality: 'common', keywords: ['parchemin', 'enchantement', 'amélioration', 'buff'], class: 0, subclass: 0 },
      { name: 'Minerai de thorium', id: 10620, quality: 'common', keywords: ['minerai', 'thorium', 'forgeron', 'métal'], class: 7, subclass: 4 },
      { name: 'Eau de source', id: 159, quality: 'common', keywords: ['eau', 'source', 'boisson', 'restauration'], class: 0, subclass: 5 },
      { name: 'Cuir épais', id: 4304, quality: 'common', keywords: ['cuir', 'épais', 'travail', 'artisanat'], class: 7, subclass: 6 },
      { name: 'Pierre de soin', id: 5512, quality: 'uncommon', keywords: ['pierre', 'soin', 'guérison', 'réutilisable'], class: 0, subclass: 0 },
      { name: 'Marteau de guerre orc', id: 12740, quality: 'rare', keywords: ['marteau', 'guerre', 'orc', 'masse'], class: 2, subclass: 4 },
      { name: 'Bottes de vitesse', id: 4321, quality: 'uncommon', keywords: ['bottes', 'vitesse', 'mouvement', 'pieds'], class: 4, subclass: 2 },
      { name: 'Flèche en acier', id: 2515, quality: 'common', keywords: ['flèche', 'acier', 'munition', 'projectile'], class: 6, subclass: 2 },
      { name: 'Bandage en soie', id: 2581, quality: 'common', keywords: ['bandage', 'soie', 'premiers', 'secours'], class: 7, subclass: 0 },
      { name: 'Clé de la crypte', id: 7146, quality: 'rare', keywords: ['clé', 'crypte', 'donjon', 'accès'], class: 13, subclass: 0 },
      { name: 'Sac en cuir', id: 4496, quality: 'common', keywords: ['sac', 'cuir', 'inventaire', 'stockage'], class: 1, subclass: 0 }
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
      item_class: classMap[item.class] || 'Divers',
      item_subclass: getSubclassName(item.class, item.subclass),
      icon: `https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg`,
      description: `Un objet mystérieux de ${item.name}`,
      stats: [
        { name: 'Valeur', value: Math.floor(Math.random() * 100) + 1 }
      ]
    }));
  }

  // Clear caches and reset fallback mode
  clearCache(): void {
    this.searchCache.clear();
    this.itemCache.clear();
    this.fallbackMode = false;
  }

  // Check if API is in fallback mode
  isInFallbackMode(): boolean {
    return this.fallbackMode;
  }
}

export const wowheadAPI = new WowheadAPI();