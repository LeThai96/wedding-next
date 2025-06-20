'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "flag-icons/css/flag-icons.min.css";
import { useWeddingStore } from '@/store/useWeddingStore';
import { languages } from '@/config/languages';

export function LanguageSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, loadConfig } = useWeddingStore();

  useEffect(() => {
    // 1. Check for lang in search params
    const urlLang = searchParams.get('lang');
    if (urlLang) {
      localStorage.setItem('preferredLanguage', urlLang);
      loadConfig(urlLang);
    } else {
      // 2. Fallback to localStorage
      const savedLang = localStorage.getItem('preferredLanguage') || 'vn';
      loadConfig(savedLang);
    }
  }, [loadConfig, searchParams]);

  const handleLanguageChange = async (langCode: string) => {
    localStorage.setItem('preferredLanguage', langCode);
    await loadConfig(langCode);

    // Update the URL with the new lang param
    const params = new URLSearchParams(window.location.search);
    params.set('lang', langCode);
    router.push(`?${params.toString()}`);
    router.refresh();
  };

  const getCurrentFlag = () => {
    return languages.find(lang => lang.code === language)?.flag;
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[80px] bg-white border-white/20 text-white">
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