import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Rechercher un objet..." }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="relative">
        <MagnifyingGlass 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-4 py-3 text-lg bg-card/80 backdrop-blur-sm border-border/50 focus:wow-glow-blue focus:border-primary/50 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
}