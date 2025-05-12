'use client';

import { Countdown } from "@/components/Countdown";
import { useWeddingStore } from '@/store/useWeddingStore';

export function CountdownSection() {
  const { config } = useWeddingStore();
  const { event, translations } = config;
  const weddingDate = new Date(event.date);

  return (
    <section className="section-padding bg-white">
      <div className="container-padding max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-playfair mb-12 text-foreground">
          {translations.countdown.title}
        </h2>
        <Countdown 
          targetDate={weddingDate}
          labels={{
            days: translations.countdown.days,
            hours: translations.countdown.hours,
            minutes: translations.countdown.minutes,
            seconds: translations.countdown.seconds,
          }}
        />
      </div>
    </section>
  );
} 