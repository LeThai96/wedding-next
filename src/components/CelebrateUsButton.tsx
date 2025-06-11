'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CelebrateUsSection } from './sections/CelebrateUsSection';
import { useWeddingStore } from '@/store/useWeddingStore';

export function CelebrateUsButton() {
  const { config } = useWeddingStore();
  const { translations } = config;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-8 right-8 z-40 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {translations.celebrateUs.title}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-sm border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogTitle className="text-3xl font-playfair text-center mb-8 text-primary">
          {translations.celebrateUs.title}
        </DialogTitle>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl" />
          <CelebrateUsSection />
        </div>
      </DialogContent>
    </Dialog>
  );
}