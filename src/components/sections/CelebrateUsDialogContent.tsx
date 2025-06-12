'use client';

import Image from 'next/image';
import { useWeddingStore } from '@/store/useWeddingStore';
import imageConfig from '@/config/image-config.json';
import { DialogContent, DialogTitle } from '../ui/dialog';

export function CelebrateUsDialogContent() {
  const { config } = useWeddingStore();
  const { translations } = config;

  return (
    <DialogContent className="max-w-2xl w-[95vw] overflow-y-auto bg-background/95 backdrop-blur-sm border-2 border-primary/20 rounded-2xl shadow-2xl p-4 sm:p-6">
      <DialogTitle className="text-2xl sm:text-3xl font-playfair text-center mb-4 sm:mb-8 text-primary">
        {translations.celebrateUs.title}
      </DialogTitle>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl" />
        <div className="space-y-6 sm:space-y-8 p-2 sm:p-4">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              {translations.celebrateUs.presenceMessage}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/80">
              {translations.celebrateUs.blessingsMessage}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
            <div className="text-center group">
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-primary/90">{translations.celebrateUs.brideTitle}</h3>
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group-hover:border-primary/20 border-2 border-transparent">
                <div className="relative aspect-square w-32 h-32 sm:w-40 sm:h-40 mb-3 sm:mb-4 mx-auto">
                  <Image
                    src={imageConfig.brideQr}
                    alt="Bride's QR Code"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{translations.celebrateUs.scanBride}</p>
              </div>
            </div>

            <div className="text-center group">
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-primary/90">{translations.celebrateUs.groomTitle}</h3>
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group-hover:border-primary/20 border-2 border-transparent">
                <div className="relative aspect-square w-32 h-32 sm:w-40 sm:h-40 mb-3 sm:mb-4 mx-auto">
                  <Image
                    src={imageConfig.groomQr}
                    alt="Groom's QR Code"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{translations.celebrateUs.scanGroom}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
} 