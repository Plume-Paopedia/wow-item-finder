import React from 'react';
import { WoWItem } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getQualityColor } from '@/lib/wow-utils';
import { motion } from 'framer-motion';

interface ItemCardProps {
  item: WoWItem;
  onClick: () => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="p-4 cursor-pointer hover:wow-glow-blue transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50"
        onClick={onClick}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={item.icon} 
              alt={item.name}
              className="w-12 h-12 rounded-lg border-2 border-border/30"
              onError={(e) => {
                e.currentTarget.src = 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';
              }}
            />
            <div className="absolute -top-1 -right-1">
              <Badge variant="secondary" className="text-xs px-1 py-0">
                {item.item_level}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold truncate ${getQualityColor(item.quality)}`}>
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.item_class} • {item.item_subclass}
            </p>
            <p className="text-xs text-muted-foreground">
              Niveau requis: {item.required_level}
            </p>
          </div>
          
          <Badge 
            variant="outline" 
            className={`capitalize ${getQualityColor(item.quality)} border-current/30`}
          >
            {item.quality}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}