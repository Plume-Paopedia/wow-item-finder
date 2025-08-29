import React, { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { mockItems, WoWItem } from '@/lib/data';
import { SearchBar } from '@/components/SearchBar';
import { ItemCard } from '@/components/ItemCard';
import { ItemDetail } from '@/components/ItemDetail';
import { SearchHistory } from '@/components/SearchHistory';
import { FilterPanel, FilterState } from '@/components/FilterPanel';
import { FavoritesList } from '@/components/FavoritesList';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<WoWItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');
  const [searchHistory, setSearchHistory] = useKV<WoWItem[]>('wow-search-history', []);
  const [favorites, setFavorites] = useKV<WoWItem[]>('wow-favorites', []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    quality: [],
    itemClass: [],
    minLevel: 1,
    maxLevel: 85,
    minItemLevel: 1,
    maxItemLevel: 350
  });

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim() && activeTab === 'search') return [];
    
    let items = mockItems;

    // Apply search filter
    if (searchQuery.trim()) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_subclass.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

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
  }, [searchQuery, filters, activeTab]);

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
        toast.success(`${item.name} retiré des favoris`);
        return currentFavorites.filter(fav => fav.id !== item.id);
      } else {
        toast.success(`${item.name} ajouté aux favoris`);
        return [item, ...currentFavorites];
      }
    });
  };

  const handleRemoveFavorite = (itemId: number) => {
    setFavorites(currentFavorites => {
      const item = currentFavorites.find(fav => fav.id === itemId);
      if (item) {
        toast.success(`${item.name} retiré des favoris`);
      }
      return currentFavorites.filter(fav => fav.id !== itemId);
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    toast.success('Historique effacé');
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    toast.success('Favoris effacés');
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
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
              WoW Item Finder
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez tous les objets de World of Warcraft avec leurs sources et statistiques détaillées.
            </p>
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
                Recherche ({mockItems.length.toLocaleString()} objets)
              </TabsTrigger>
              <TabsTrigger value="favorites">
                Favoris ({favorites.length})
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
                {showResults && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        {filteredItems.length} résultat{filteredItems.length !== 1 ? 's' : ''} trouvé{filteredItems.length !== 1 ? 's' : ''}
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
                    
                    {filteredItems.length === 0 && (
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
                          Essayez de modifier votre recherche ou d'ajuster les filtres.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {showHistory && (
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

                {!showResults && !showHistory && (
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

export default App