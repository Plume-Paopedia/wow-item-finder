import React, { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { mockItems, WoWItem } from '@/lib/data';
import { SearchBar } from '@/components/SearchBar';
import { ItemCard } from '@/components/ItemCard';
import { ItemDetail } from '@/components/ItemDetail';
import { SearchHistory } from '@/components/SearchHistory';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<WoWItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useKV<WoWItem[]>('wow-search-history', []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return mockItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item_class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item_subclass.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleItemSelect = (item: WoWItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
    
    // Add to history (max 10 items, no duplicates)
    setSearchHistory(currentHistory => {
      const filteredHistory = currentHistory.filter(historyItem => historyItem.id !== item.id);
      return [item, ...filteredHistory].slice(0, 10);
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const showResults = searchQuery.trim().length > 0;
  const showHistory = !showResults && searchHistory.length > 0;

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
                    Essayez de modifier votre recherche ou utilisez des termes plus généraux.
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