'use client';

import Image from "next/image";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useWeddingStore } from '@/store/useWeddingStore';
import imageConfig from '@/config/image-config.json';

export function HeroSection() {
  const { config } = useWeddingStore();
  const { couple, event, translations } = config;

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute top-4 right-4 z-30">
        <LanguageSelector />
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={imageConfig.heroMobile}
          alt="Wedding background"
          fill
          className="object-cover md:hidden"
          priority
        />
        <Image
          src={imageConfig.hero}
          alt="Wedding background"
          fill
          className="object-cover hidden md:block"
          priority
        />
      </div>
      
      <div className="relative z-20 text-center text-white space-y-6 px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-playfair tracking-wide">
          <span className="block md:inline">{couple.person1}</span>
          <span className="block md:inline">{" & "}</span>
          <span className="block md:inline">{couple.person2}</span>
        </h1>
        <span className="block md:hidden h-30"></span>
        <p className="text-xl md:text-2xl font-light">
          {translations.hero.gettingMarried}
        </p>
        <div className="text-lg md:text-xl font-light space-y-2">
          <p>Saturday, {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p>{event.time}</p>
          <p className="mt-4">{event.venue.name}</p>
          <p>{event.venue.address}</p>
        </div>
        <div className="pt-8">
          <a 
            href="#rsvp"
            className="inline-block px-8 py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          >
            {translations.hero.rsvpButton}
          </a>
        </div>
      </div>
    </section>
  );
} 