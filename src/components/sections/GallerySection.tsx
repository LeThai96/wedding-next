'use client';

import { useWeddingStore } from '@/store/useWeddingStore';
import { useImageStore } from '@/store/useImageStore';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import imageConfig from '@/config/image-config.json';

interface GalleryTranslations {
  title: string;
}

export function GallerySection() {
  const { config } = useWeddingStore();
  const { translations } = config;
  const { galleryImages, loadGalleryImages, isLoading, error } = useImageStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Load gallery images on mount
  useEffect(() => {
    loadGalleryImages(imageConfig.gallery);
  }, [loadGalleryImages]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    setIsPlaying(false);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    setIsPlaying(false);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isPlaying]);

  // Handle user interaction
  useEffect(() => {
    if (!emblaApi) return;

    const onPointerDown = () => setIsPlaying(false);
    const onPointerUp = () => setIsPlaying(true);

    emblaApi.rootNode().addEventListener('pointerdown', onPointerDown);
    emblaApi.rootNode().addEventListener('pointerup', onPointerUp);

    return () => {
      emblaApi.rootNode().removeEventListener('pointerdown', onPointerDown);
      emblaApi.rootNode().removeEventListener('pointerup', onPointerUp);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return (
      <section id="gallery" className="section-padding bg-background">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="section-padding bg-background">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-destructive">Error loading gallery: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16 text-foreground">
          {(translations.gallery as GalleryTranslations)?.title || 'Our Gallery'}
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden max-h-[90vh]" ref={emblaRef}>
            <div className="flex">
              {galleryImages.map((image, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative aspect-[4/3] max-h-[90vh]">
                  <Image
                    src={image.path}
                    alt={`Wedding photo ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-height: 90vh) 90vh, 80vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
} 