import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
  quality: string[];
  itemClass: string[];
  minLevel: number;
  maxLevel: number;
  minItemLevel: number;
  maxItemLevel: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const qualityOptions = [
  { value: 'poor', label: 'Pauvre', color: 'bg-gray-400' },
  { value: 'common', label: 'Commun', color: 'bg-white text-black' },
  { value: 'uncommon', label: 'Peu commun', color: 'bg-green-400' },
  { value: 'rare', label: 'Rare', color: 'bg-blue-400' },
  { value: 'epic', label: 'Épique', color: 'bg-purple-400' },
  { value: 'legendary', label: 'Légendaire', color: 'bg-orange-400' }
];

const itemClassOptions = [
  'Arme',
  'Armure',
  'Consommable',
  'Divers'
];

export function FilterPanel({ filters, onFiltersChange, isOpen, onToggle }: FilterPanelProps) {
  const handleQualityToggle = (quality: string) => {
    const newQualities = filters.quality.includes(quality)
      ? filters.quality.filter(q => q !== quality)
      : [...filters.quality, quality];
    
    onFiltersChange({ ...filters, quality: newQualities });
  };

  const handleItemClassToggle = (itemClass: string) => {
    const newClasses = filters.itemClass.includes(itemClass)
      ? filters.itemClass.filter(c => c !== itemClass)
      : [...filters.itemClass, itemClass];
    
    onFiltersChange({ ...filters, itemClass: newClasses });
  };

  const resetFilters = () => {
    onFiltersChange({
      quality: [],
      itemClass: [],
      minLevel: 1,
      maxLevel: 85,
      minItemLevel: 1,
      maxItemLevel: 350
    });
  };

  const hasActiveFilters = 
    filters.quality.length > 0 ||
    filters.itemClass.length > 0 ||
    filters.minLevel > 1 ||
    filters.maxLevel < 85 ||
    filters.minItemLevel > 1 ||
    filters.maxItemLevel < 350;

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Button
          variant="outline"
          onClick={onToggle}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          Filtres
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {filters.quality.length + filters.itemClass.length + 
               (filters.minLevel > 1 ? 1 : 0) + (filters.maxLevel < 85 ? 1 : 0) +
               (filters.minItemLevel > 1 ? 1 : 0) + (filters.maxItemLevel < 350 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Filtres</CardTitle>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-muted-foreground"
                    >
                      Réinitialiser
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quality Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Qualité
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {qualityOptions.map((option) => (
                      <Badge
                        key={option.value}
                        variant={filters.quality.includes(option.value) ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          filters.quality.includes(option.value) 
                            ? `${option.color} hover:opacity-80` 
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => handleQualityToggle(option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Item Class Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Type d'objet
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {itemClassOptions.map((itemClass) => (
                      <Badge
                        key={itemClass}
                        variant={filters.itemClass.includes(itemClass) ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:bg-secondary"
                        onClick={() => handleItemClassToggle(itemClass)}
                      >
                        {itemClass}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Level Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Niveau requis: {filters.minLevel} - {filters.maxLevel}
                    </label>
                    <div className="px-3">
                      <Slider
                        value={[filters.minLevel, filters.maxLevel]}
                        onValueChange={([min, max]) => 
                          onFiltersChange({ ...filters, minLevel: min, maxLevel: max })
                        }
                        min={1}
                        max={85}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Niveau d'objet: {filters.minItemLevel} - {filters.maxItemLevel}
                    </label>
                    <div className="px-3">
                      <Slider
                        value={[filters.minItemLevel, filters.maxItemLevel]}
                        onValueChange={([min, max]) => 
                          onFiltersChange({ ...filters, minItemLevel: min, maxItemLevel: max })
                        }
                        min={1}
                        max={350}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}