import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Trash2, ExternalLink } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { WoWItem } from '@/lib/data';

interface FavoritesListProps {
  favorites: WoWItem[];
  onItemClick: (item: WoWItem) => void;
  onRemoveFavorite: (itemId: number) => void;
  onClearAll: () => void;
}

export function FavoritesList({ 
  favorites, 
  onItemClick, 
  onRemoveFavorite, 
  onClearAll 
}: FavoritesListProps) {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'poor': return 'text-gray-400';
      case 'common': return 'text-white';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-orange-400';
      default: return 'text-foreground';
    }
  };

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case 'poor': return { label: 'Pauvre', className: 'bg-gray-400' };
      case 'common': return { label: 'Commun', className: 'bg-white text-black' };
      case 'uncommon': return { label: 'Peu commun', className: 'bg-green-400' };
      case 'rare': return { label: 'Rare', className: 'bg-blue-400' };
      case 'epic': return { label: 'Épique', className: 'bg-purple-400' };
      case 'legendary': return { label: 'Légendaire', className: 'bg-orange-400' };
      default: return { label: 'Inconnu', className: 'bg-secondary' };
    }
  };

  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Aucun favori
            </h3>
            <p className="text-muted-foreground">
              Cliquez sur le cœur d'un objet pour l'ajouter à vos favoris.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Heart size={20} className="text-red-500" />
          Mes favoris ({favorites.length})
        </CardTitle>
        {favorites.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={16} className="mr-2" />
            Tout supprimer
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence>
            {favorites.map((item, index) => {
              const qualityBadge = getQualityBadge(item.quality);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer"
                    onClick={() => onItemClick(item)}
                  >
                    {/* Item Icon */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/50 flex-shrink-0">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';
                          }}
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                        <Heart size={10} className="text-white fill-current" />
                      </div>
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium truncate ${getQualityColor(item.quality)}`}>
                          {item.name}
                        </h4>
                        <Badge className={`${qualityBadge.className} text-xs px-1.5 py-0.5`}>
                          {qualityBadge.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Niveau {item.required_level}</span>
                        <span>•</span>
                        <span>iLvl {item.item_level}</span>
                        <span>•</span>
                        <span className="truncate">{item.item_class}</span>
                      </div>
                      {item.item_subclass && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {item.item_subclass}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onItemClick(item);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <ExternalLink size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(item.id);
                        }}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}