import defaultConfig from '@/config/wedding-details.json';
import type { WeddingConfig } from '@/types/wedding-config';

export async function getWeddingConfig(lang: string = 'en'): Promise<WeddingConfig> {
  if (lang === 'en') {
    return defaultConfig;
  }

  try {
    const config = await import(`@/config/wedding-details.${lang}.json`);
    return config.default;
  } catch (error) {
    console.warn(`Language ${lang} not found, falling back to English`);
    return defaultConfig;
  }
} 