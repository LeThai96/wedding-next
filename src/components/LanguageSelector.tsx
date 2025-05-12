'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "flag-icons/css/flag-icons.min.css";
import { useWeddingStore } from '@/store/useWeddingStore';

const languages = [
  { 
    code: 'en',
    label: 'English',
    flag: 'gb' // Use 'gb' for British flag
  },
  { 
    code: 'vn',
    label: 'Tiếng Việt',
    flag: 'vn'
  }
];

export function LanguageSelector() {
  const router = useRouter();
  const { language, loadConfig } = useWeddingStore();

  useEffect(() => {
    // Get initial language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    loadConfig(savedLang);
  }, [loadConfig]);

  const handleLanguageChange = async (langCode: string) => {
    localStorage.setItem('preferredLanguage', langCode);
    await loadConfig(langCode);
    router.refresh();
  };

  const getCurrentFlag = () => {
    return languages.find(lang => lang.code === language)?.flag;
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[80px] bg-background/10 backdrop-blur-sm border-white/20 text-white">
        <SelectValue>
          <span className={`fi fi-${getCurrentFlag()}`} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className={`fi fi-${lang.flag}`} />
              <span className="text-sm">{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 