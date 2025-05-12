'use client';

import Image from "next/image";
import { useWeddingStore } from '@/store/useWeddingStore';

export function StorySection() {
  const { config } = useWeddingStore();
  const { story, translations } = config;

  return (
    <section id="story" className="section-padding bg-muted">
      <div className="container-padding max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16 text-foreground">
          {translations.story.title}
        </h2>
        <div className="space-y-24">
          {story.map((section, index) => (
            <div 
              key={section.title}
              className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`relative h-[400px] rounded-lg overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className="text-2xl font-playfair text-foreground">{section.title}</h3>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 