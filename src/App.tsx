import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useKV } from '@github/spark/hooks';
import { WoWItem } from '@/lib/data';
import { enhancedBlizzardAPI } from '@/lib/enhanced-blizzard-api'; // Enhanced API with Blizzard integration
import { SearchBar } from '@/components/SearchBar';
import { ItemCard } from '@/components/ItemCard';
import { ItemDetail } from '@/components/ItemDetail';
import { SearchHistory } from '@/components/SearchHistory';
import { FilterPanel, FilterState } from '@/components/FilterPanel';
import { FavoritesList } from '@/components/FavoritesList';
import { ApiStatus } from '@/components/ApiStatus';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocaleProvider, useLocale } from '@/hooks/useLocale';
import { getTranslation } from '@/lib/localization';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<WoWItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');
  const [searchHistory, setSearchHistory] = useKV<WoWItem[]>('wow-search-history', []);
  const [favorites, setFavorites] = useKV<WoWItem[]>('wow-favorites', []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<WoWItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isApiConnected, setIsApiConnected] = useState(true);

  // Initialize total items count on component mount
  useEffect(() => {
    const initializeItemCount = async () => {
      try {
        // Try to get total count from API, fallback to local data count
        const allItems = await enhancedBlizzardAPI.searchItems('', 1000, locale);
        setTotalItemsCount(allItems.length);
        setIsApiConnected(!enhancedBlizzardAPI.isInFallbackMode());
      } catch (error) {
        console.error('Failed to initialize item count:', error);
        // If API fails, we know we have the local database with ~134 items
        setTotalItemsCount(134);
        setIsApiConnected(false);
      }
    };

    initializeItemCount();
  }, [locale]);
  
  const [filters, setFilters] = useState<FilterState>({
    quality: [],
    itemClass: [],
    minLevel: 1,
    maxLevel: 85,
    minItemLevel: 1,
    maxItemLevel: 350
  });

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await enhancedBlizzardAPI.searchItems(query, 100, locale);
      setSearchResults(results);
      setIsApiConnected(!enhancedBlizzardAPI.isInFallbackMode());
      
      if (results.length === 0) {
        toast.info(getTranslation('noResults', locale));
      } else if (enhancedBlizzardAPI.isInFallbackMode()) {
        toast.warning(`${results.length} ${getTranslation('itemsFound', locale, results.length)} (${getTranslation('apiDisconnected', locale)})`);
      } else {
        toast.success(getTranslation('itemsFound', locale, results.length));
      }
    } catch (error) {
      console.error('Search error:', error);
      setIsApiConnected(false);
      toast.error(`Erreur lors de la recherche - ${getTranslation('apiDisconnected', locale)}`);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  // Effect to perform search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 500); // 500ms delay for debouncing

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim() && activeTab === 'search') return [];
    
    let items = searchResults;

    // Apply quality filter
    if (filters.quality.length > 0) {
      items = items.filter(item => filters.quality.includes(item.quality));
    }

    // Apply item class filter
    if (filters.itemClass.length > 0) {
      items = items.filter(item => filters.itemClass.includes(item.item_class));
    }

    // Apply level filters
    items = items.filter(item => 
      item.required_level >= filters.minLevel && 
      item.required_level <= filters.maxLevel &&
      item.item_level >= filters.minItemLevel &&
      item.item_level <= filters.maxItemLevel
    );

    return items;
  }, [searchResults, filters, activeTab, searchQuery]);

  const handleItemSelect = (item: WoWItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
    
    // Add to history (max 10 items, no duplicates)
    setSearchHistory(currentHistory => {
      const filteredHistory = currentHistory.filter(historyItem => historyItem.id !== item.id);
      return [item, ...filteredHistory].slice(0, 10);
    });
  };

  const handleFavoriteToggle = (item: WoWItem) => {
    setFavorites(currentFavorites => {
      const isFavorite = currentFavorites.some(fav => fav.id === item.id);
      
      if (isFavorite) {
        toast.success(getTranslation('removedFromFavorites', locale, item.name));
        return currentFavorites.filter(fav => fav.id !== item.id);
      } else {
        toast.success(getTranslation('addedToFavorites', locale, item.name));
        return [item, ...currentFavorites];
      }
    });
  };

  const handleRemoveFavorite = (itemId: number) => {
    setFavorites(currentFavorites => {
      const item = currentFavorites.find(fav => fav.id === itemId);
      if (item) {
        toast.success(getTranslation('removedFromFavorites', locale, item.name));
      }
      return currentFavorites.filter(fav => fav.id !== itemId);
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    toast.success(getTranslation('historyCleared', locale));
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    toast.success(getTranslation('favoritesCleared', locale));
  };

  const isFavorite = (item: WoWItem) => favorites.some(fav => fav.id === item.id);

  const showResults = searchQuery.trim().length > 0 && activeTab === 'search';
  const showHistory = !showResults && searchHistory.length > 0 && activeTab === 'search';
  const showFavorites = activeTab === 'favorites';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 blur-3xl" />
        <div className="relative container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-end mb-4">
              <LanguageSwitcher />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
              WoW Item Finder
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              {locale === 'fr_FR' 
                ? 'Découvrez tous les objets de World of Warcraft avec leurs sources et statistiques détaillées.'
                : 'Discover all World of Warcraft items with their sources and detailed statistics.'
              }
            </p>
            
            <ApiStatus isConnected={isApiConnected} itemCount={totalItemsCount} />
          </motion.div>
          
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'search' | 'favorites')}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="search">
                {getTranslation('search', locale)} ({isLoading ? '...' : (searchQuery.trim() ? filteredItems.length : 0)} objets)
              </TabsTrigger>
              <TabsTrigger value="favorites">
                {getTranslation('favorites', locale)} ({favorites.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="mt-6">
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />

              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="animate-spin text-6xl mb-4">⚔️</div>
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                      {getTranslation('loading', locale)}
                    </h3>
                    <p className="text-muted-foreground">
                      {locale === 'fr_FR' 
                        ? 'Exploration de la base de données Blizzard Battle.net'
                        : 'Exploring Blizzard Battle.net database'
                      }
                    </p>
                  </motion.div>
                )}

                {!isLoading && showResults && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        {getTranslation('itemsFound', locale, filteredItems.length)}
                      </h2>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ItemCard 
                            item={item} 
                            onClick={() => handleItemSelect(item)}
                            onFavoriteToggle={handleFavoriteToggle}
                            isFavorite={isFavorite(item)}
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    {filteredItems.length === 0 && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <div className="text-6xl mb-4">🔧</div>
                        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                          Aucun objet ne correspond aux filtres
                        </h3>
                        <p className="text-muted-foreground">
                          Ajustez les filtres pour voir plus de résultats.
                        </p>
                      </motion.div>
                    )}

                    {filteredItems.length === 0 && searchResults.length === 0 && searchQuery.trim() && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                          Aucun objet trouvé
                        </h3>
                        <p className="text-muted-foreground">
                          Essayez de modifier votre recherche. Utilisez des termes plus généraux ou en français.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {!isLoading && showHistory && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-2xl mx-auto"
                  >
                    <SearchHistory
                      history={searchHistory}
                      onItemClick={handleItemSelect}
                      onClearHistory={handleClearHistory}
                    />
                  </motion.div>
                )}

                {!isLoading && !showResults && !showHistory && (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="text-8xl mb-6">⚔️</div>
                    <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                      Commencez votre recherche
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Tapez le nom d'un objet, une classe d'équipement ou un type pour découvrir 
                      toutes les informations dont vous avez besoin.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      <span className="text-xs text-muted-foreground">Exemples :</span>
                      {['fluide fluorescent', 'épée', 'armure', 'potion', 'anneau'].map((example) => (
                        <button
                          key={example}
                          onClick={() => setSearchQuery(example)}
                          className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto"
              >
                <FavoritesList
                  favorites={favorites}
                  onItemClick={handleItemSelect}
                  onRemoveFavorite={handleRemoveFavorite}
                  onClearAll={handleClearFavorites}
                />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Item Detail Modal */}
      <ItemDetail
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
      
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}

export default App