import { WoWItem } from '@/lib/data';

export const getQualityClass = (quality: WoWItem['quality']) => {
  return `quality-${quality}`;
};

export const getQualityColor = (quality: WoWItem['quality']) => {
  const colors = {
    poor: 'text-gray-400',
    common: 'text-white',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-orange-400'
  };
  return colors[quality];
};

export const getSourceTypeIcon = (type: string) => {
  switch (type) {
    case 'drop':
      return '⚔️';
    case 'craft':
      return '🔨';
    case 'vendor':
      return '🛒';
    case 'quest':
      return '📜';
    default:
      return '❓';
  }
};

export const getSourceTypeBadgeColor = (type: string) => {
  switch (type) {
    case 'drop':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 'craft':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'vendor':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'quest':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};