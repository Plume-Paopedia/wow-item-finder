import React from 'react';
import { WoWItem, mockSources } from '@/lib/data';
import { ItemSource } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getQualityColor, getSourceTypeIcon, getSourceTypeBadgeColor } from '@/lib/wow-utils';
import { X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ItemDetailProps {
  item: WoWItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetail({ item, isOpen, onClose }: ItemDetailProps) {
  if (!item) return null;

  const sources = mockSources[item.id] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-lg border-border/50">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className={`text-2xl font-bold ${getQualityColor(item.quality)}`}>
            {item.name}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            <TabsTrigger value="stats">Fiche</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="links">Liens Wowhead</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="stats" className="mt-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <img 
                      src={item.icon} 
                      alt={item.name}
                      className="w-24 h-24 rounded-xl border-2 border-border/30 wow-glow"
                      onError={(e) => {
                        e.currentTarget.src = 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';
                      }}
                    />
                    <Badge 
                      variant="secondary" 
                      className="absolute -bottom-2 -right-2 font-bold"
                    >
                      {item.item_level}
                    </Badge>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 bg-muted/20">
                        <h4 className="font-semibold text-sm text-muted-foreground">Type</h4>
                        <p className="font-medium">{item.item_class}</p>
                        <p className="text-sm text-muted-foreground">{item.item_subclass}</p>
                      </Card>
                      
                      <Card className="p-4 bg-muted/20">
                        <h4 className="font-semibold text-sm text-muted-foreground">Niveau</h4>
                        <p className="font-medium">Objet: {item.item_level}</p>
                        <p className="text-sm text-muted-foreground">Requis: {item.required_level}</p>
                      </Card>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`capitalize text-lg px-4 py-2 ${getQualityColor(item.quality)} border-current/30`}
                    >
                      {item.quality}
                    </Badge>
                  </div>
                </div>

                {item.description && (
                  <Card className="p-4 bg-muted/20">
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground italic">{item.description}</p>
                  </Card>
                )}

                {item.stats && item.stats.length > 0 && (
                  <Card className="p-4 bg-muted/20">
                    <h4 className="font-semibold mb-3">Statistiques</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.stats.map((stat, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="text-muted-foreground">{stat.name}</span>
                          <span className="font-semibold text-accent">{stat.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="sources" className="mt-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {sources.length > 0 ? (
                  sources.map((source, index) => (
                    <Card key={index} className="p-4 bg-muted/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getSourceTypeIcon(source.type)}</span>
                          <div>
                            <h4 className="font-semibold">{source.name}</h4>
                            {source.location && (
                              <p className="text-sm text-muted-foreground">{source.location}</p>
                            )}
                            {source.difficulty && (
                              <p className="text-xs text-accent">{source.difficulty}</p>
                            )}
                          </div>
                        </div>
                        <Badge className={getSourceTypeBadgeColor(source.type)}>
                          {source.type}
                        </Badge>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-muted/20">
                    <p className="text-muted-foreground">Aucune source connue pour cet objet.</p>
                  </Card>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="links" className="mt-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Card className="p-6 text-center bg-muted/20">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img 
                        src="https://static.wowhead.com/images/logos/wowhead-icon.png" 
                        alt="Wowhead" 
                        className="w-12 h-12"
                      />
                    </div>
                    <h4 className="font-semibold text-lg">Liens Wowhead</h4>
                    <p className="text-muted-foreground">
                      Consultez Wowhead pour plus d'informations sur les vendeurs, quêtes et autres sources.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button asChild variant="outline">
                        <a 
                          href={`https://fr.wowhead.com/item=${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Page de l'objet
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a 
                          href={`https://fr.wowhead.com/item=${item.id}#sold-by`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Vendu par
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a 
                          href={`https://fr.wowhead.com/item=${item.id}#reward-from-q`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Récompense de quête
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}