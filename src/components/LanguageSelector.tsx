'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "node_modules/flag-icons/css/flag-icons.min.css";

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' }
];

export function LanguageSelector() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('en');

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    // Store language preference
    localStorage.setItem('preferredLanguage', langCode);
    // Refresh the page to load new language
    router.refresh();
  };

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[120px] bg-background/10 backdrop-blur-sm border-white/20 text-white">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="cursor-pointer"
            >
              <span className={`fi fi-${lang.code}`}></span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
} 