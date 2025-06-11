'use client';

import Image from "next/image";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useWeddingStore } from '@/store/useWeddingStore';
import imageConfig from '@/config/image-config.json';
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { languages } from "@/config/languages";

export function HeroSection() {
  const { config, language } = useWeddingStore();
  const { couple, event, translations } = config;

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };

    const getCurrentLocale = () => {
      return languages.find(lang => lang.code === language)?.locale;
    };

    return dateObj.toLocaleDateString(getCurrentLocale(), options);
  };

  return (
    <section id="home" className="relative w-full h-screen flex flex-col items-center justify-between py-20">
      <div className="absolute top-4 right-4 z-50">
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

      <div className="relative z-20 text-center text-white space-y-8 px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-playfair tracking-wide">
          <span className="block md:inline">{couple.person1}</span>
          <span className="block md:inline">{" & "}</span>
          <span className="block md:inline">{couple.person2}</span>
        </h1>

        <p className="text-xl md:text-2xl font-light">
          {translations.hero.gettingMarried}
        </p>
      </div>

      <div className="relative z-20 text-center text-white px-4 max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-6 inline-block">
          <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-light">
            <CalendarDays className="w-6 h-6" />
            <p>{formatDate(event.date)}</p>
          </div>

          <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-light">
            <Clock className="w-6 h-6" />
            <p>{event.time}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-light">
              <MapPin className="w-6 h-6" />
              <Link href={"https://maps.app.goo.gl/Bxf1gNF9NaJA3BnDA"} target="_blank" className="underline">
                {event.venue.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 