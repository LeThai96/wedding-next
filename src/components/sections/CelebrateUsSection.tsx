'use client';

import Image from 'next/image';
import { useWeddingStore } from '@/store/useWeddingStore';
import imageConfig from '@/config/image-config.json';

export function CelebrateUsSection() {
  const { config } = useWeddingStore();
  const { translations } = config;

  return (
    <div className="space-y-8 p-4">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-muted-foreground mb-2">
          Your presence at our wedding is the greatest gift we could ask for.
        </p>
        <p className="text-base text-muted-foreground/80">
          For those who wish to express their blessings, we've provided our remittance information below.
          This is entirely optional and we are truly grateful for your love and support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center group">
          <h3 className="text-xl font-medium mb-4 text-primary/90">Bride's Remittance</h3>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group-hover:border-primary/20 border-2 border-transparent">
            <div className="relative aspect-square w-40 h-40 mb-4 mx-auto">
              <Image
                src={imageConfig.brideQr}
                alt="Bride's QR Code"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 160px, 160px"
              />
            </div>
            <p className="text-sm text-muted-foreground">Scan to send gift to the bride</p>
          </div>
        </div>

        <div className="text-center group">
          <h3 className="text-xl font-medium mb-4 text-primary/90">Groom's Remittance</h3>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group-hover:border-primary/20 border-2 border-transparent">
            <div className="relative aspect-square w-40 h-40 mb-4 mx-auto">
              <Image
                src={imageConfig.groomQr}
                alt="Groom's QR Code"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 160px, 160px"
              />
            </div>
            <p className="text-sm text-muted-foreground">Scan to send gift to the groom</p>
          </div>
        </div>
      </div>
    </div>
  );
} 