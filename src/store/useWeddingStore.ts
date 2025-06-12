import { create } from 'zustand';
import type { WeddingConfig } from '@/types/wedding-config';
import defaultConfig from '@/config/wedding-details.json';

interface WeddingStore {
  config: WeddingConfig;
  language: string;
  setConfig: (config: WeddingConfig) => void;
  setLanguage: (lang: string) => void;
  loadConfig: (lang: string) => Promise<void>;
}

export const useWeddingStore = create<WeddingStore>((set) => ({
  config: defaultConfig,
  language: 'en',
  setConfig: (config) => set({ config }),
  setLanguage: (lang) => set({ language: lang }),
  loadConfig: async (lang) => {
    try {
      if (lang === 'en') {
        set({ config: defaultConfig, language: lang });
        return;
      }

      const newConfig = await import(`@/config/wedding-details.${lang}.json`);
      set({ config: newConfig.default, language: lang });
    } catch {
      console.warn(`Language ${lang} not found, falling back to English`);
      set({ config: defaultConfig, language: 'en' });
    }
  },
})); 