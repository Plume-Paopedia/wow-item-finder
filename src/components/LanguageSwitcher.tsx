import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from '@/hooks/useLocale';
import { Locale } from '@/lib/localization';

const LANGUAGE_OPTIONS = [
  { value: 'fr_FR' as Locale, label: 'Français', flag: '🇫🇷' },
  { value: 'en_US' as Locale, label: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  
  const currentLanguage = LANGUAGE_OPTIONS.find(lang => lang.value === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span>{currentLanguage?.flag}</span>
          <span className="hidden sm:inline">{currentLanguage?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGE_OPTIONS.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => setLocale(language.value)}
            className="gap-2 cursor-pointer"
          >
            <span>{language.flag}</span>
            <span>{language.label}</span>
            {locale === language.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}