import React from 'react';
import { WoWItem } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getQualityColor } from '@/lib/wow-utils';
import { ClockCounterClockwise, Trash } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface SearchHistoryProps {
  history: WoWItem[];
  onItemClick: (item: WoWItem) => void;
  onClearHistory: () => void;
}

export function SearchHistory({ history, onItemClick, onClearHistory }: SearchHistoryProps) {
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <ClockCounterClockwise className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          Aucun historique
        </h3>
        <p className="text-muted-foreground">
          Vos derniers objets consultés apparaîtront ici.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ClockCounterClockwise className="w-5 h-5" />
          Historique récent
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearHistory}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash className="w-4 h-4 mr-2" />
          Effacer
        </Button>
      </div>
      
      <div className="grid gap-3">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="p-3 cursor-pointer hover:wow-glow-blue transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/30"
              onClick={() => onItemClick(item)}
            >
              <div className="flex items-center space-x-3">
                <img 
                  src={item.icon} 
                  alt={item.name}
                  className="w-8 h-8 rounded border border-border/30"
                  onError={(e) => {
                    e.currentTarget.src = 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate text-sm ${getQualityColor(item.quality)}`}>
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.item_class}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.item_level}
                </Badge>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}