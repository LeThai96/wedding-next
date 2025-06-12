'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CelebrateUsDialogContent } from './sections/CelebrateUsDialogContent';
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
      <CelebrateUsDialogContent />
    </Dialog>
  );
}