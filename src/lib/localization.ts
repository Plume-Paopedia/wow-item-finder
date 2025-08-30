export type Locale = 'fr_FR' | 'en_US';

export interface LocalizedText {
  fr_FR: string;
  en_US: string;
}

export const DEFAULT_LOCALE: Locale = 'fr_FR';

// Blizzard API locale mappings
export const BLIZZARD_LOCALE_MAP: Record<Locale, string> = {
  fr_FR: 'fr_FR',
  en_US: 'en_US'
};

// Item quality translations
export const QUALITY_TRANSLATIONS: Record<string, LocalizedText> = {
  poor: { fr_FR: 'Pauvre', en_US: 'Poor' },
  common: { fr_FR: 'Commun', en_US: 'Common' },
  uncommon: { fr_FR: 'Peu commun', en_US: 'Uncommon' },
  rare: { fr_FR: 'Rare', en_US: 'Rare' },
  epic: { fr_FR: 'Épique', en_US: 'Epic' },
  legendary: { fr_FR: 'Légendaire', en_US: 'Legendary' }
};

// Item class translations
export const ITEM_CLASS_TRANSLATIONS: Record<string, LocalizedText> = {
  'Arme': { fr_FR: 'Arme', en_US: 'Weapon' },
  'Armure': { fr_FR: 'Armure', en_US: 'Armor' },
  'Consommable': { fr_FR: 'Consommable', en_US: 'Consumable' },
  'Trade Goods': { fr_FR: 'Biens d\'échange', en_US: 'Trade Goods' },
  'Divers': { fr_FR: 'Divers', en_US: 'Miscellaneous' },
  'Recette': { fr_FR: 'Recette', en_US: 'Recipe' },
  'Carquois': { fr_FR: 'Carquois', en_US: 'Quiver' },
  'Réactif': { fr_FR: 'Réactif', en_US: 'Reagent' },
  'Monture': { fr_FR: 'Monture', en_US: 'Mount' },
  'Familier': { fr_FR: 'Familier', en_US: 'Companion' },
  'Gemme': { fr_FR: 'Gemme', en_US: 'Gem' },
  'Clé': { fr_FR: 'Clé', en_US: 'Key' },
  'Weapon': { fr_FR: 'Arme', en_US: 'Weapon' },
  'Armor': { fr_FR: 'Armure', en_US: 'Armor' },
  'Consumable': { fr_FR: 'Consommable', en_US: 'Consumable' },
  'Miscellaneous': { fr_FR: 'Divers', en_US: 'Miscellaneous' }
};

// UI translations
export const UI_TRANSLATIONS = {
  searchPlaceholder: {
    fr_FR: 'Rechercher un objet...',
    en_US: 'Search for an item...'
  },
  itemsFound: {
    fr_FR: (count: number) => `${count} objet${count !== 1 ? 's' : ''} trouvé${count !== 1 ? 's' : ''}`,
    en_US: (count: number) => `${count} item${count !== 1 ? 's' : ''} found`
  },
  noResults: {
    fr_FR: 'Aucun objet trouvé',
    en_US: 'No items found'
  },
  loading: {
    fr_FR: 'Recherche en cours...',
    en_US: 'Searching...'
  },
  favorites: {
    fr_FR: 'Favoris',
    en_US: 'Favorites'
  },
  search: {
    fr_FR: 'Recherche',
    en_US: 'Search'
  },
  addedToFavorites: {
    fr_FR: (name: string) => `${name} ajouté aux favoris`,
    en_US: (name: string) => `${name} added to favorites`
  },
  removedFromFavorites: {
    fr_FR: (name: string) => `${name} retiré des favoris`,
    en_US: (name: string) => `${name} removed from favorites`
  },
  historyCleared: {
    fr_FR: 'Historique effacé',
    en_US: 'History cleared'
  },
  favoritesCleared: {
    fr_FR: 'Favoris effacés',
    en_US: 'Favorites cleared'
  },
  apiConnected: {
    fr_FR: 'API Blizzard connectée',
    en_US: 'Blizzard API connected'
  },
  apiDisconnected: {
    fr_FR: 'Mode hors ligne',
    en_US: 'Offline mode'
  },
  itemLevel: {
    fr_FR: 'Niveau d\'objet',
    en_US: 'Item Level'
  },
  requiredLevel: {
    fr_FR: 'Niveau requis',
    en_US: 'Required Level'
  },
  statistics: {
    fr_FR: 'Statistiques',
    en_US: 'Statistics'
  },
  description: {
    fr_FR: 'Description',
    en_US: 'Description'
  },
  filters: {
    fr_FR: 'Filtres',
    en_US: 'Filters'
  },
  quality: {
    fr_FR: 'Qualité',
    en_US: 'Quality'
  },
  itemClass: {
    fr_FR: 'Type d\'objet',
    en_US: 'Item Type'
  },
  level: {
    fr_FR: 'Niveau',
    en_US: 'Level'
  }
};

// Utility function to get translated text
export function getTranslation(
  key: keyof typeof UI_TRANSLATIONS,
  locale: Locale = DEFAULT_LOCALE,
  ...args: any[]
): string {
  const translation = UI_TRANSLATIONS[key][locale];
  if (typeof translation === 'function') {
    return translation(...args);
  }
  return translation;
}

// Utility function to translate item quality
export function translateQuality(quality: string, locale: Locale = DEFAULT_LOCALE): string {
  return QUALITY_TRANSLATIONS[quality]?.[locale] || quality;
}

// Utility function to translate item class
export function translateItemClass(itemClass: string, locale: Locale = DEFAULT_LOCALE): string {
  return ITEM_CLASS_TRANSLATIONS[itemClass]?.[locale] || itemClass;
}