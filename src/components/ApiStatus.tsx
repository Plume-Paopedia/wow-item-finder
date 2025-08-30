import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, WifiSlash } from '@phosphor-icons/react';

interface ApiStatusProps {
  isConnected: boolean;
  itemCount: number;
}

export function ApiStatus({ isConnected, itemCount }: ApiStatusProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {isConnected ? (
        <>
          <Globe className="w-4 h-4 text-green-400" />
          <Badge variant="outline" className="border-green-400/50 text-green-400">
            Wowhead API connectée
          </Badge>
        </>
      ) : (
        <>
          <WifiSlash className="w-4 h-4 text-orange-400" />
          <Badge variant="outline" className="border-orange-400/50 text-orange-400">
            Mode hors ligne
          </Badge>
        </>
      )}
      <span>•</span>
      <span>{itemCount.toLocaleString()} objets disponibles</span>
    </div>
  );
}