'use client';

import { useWeddingStore } from '@/store/useWeddingStore';

export function DetailsSection() {
  const { config } = useWeddingStore();
  const { schedule, event, details, translations } = config;

  return (
    <section id="details" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16 text-foreground">
          {translations.details.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-foreground">{translations.details.ceremonyTitle}</h3>
              <p className="text-muted-foreground">{schedule.ceremony} - {translations.details.ceremonyLabel}</p>
              <p className="text-muted-foreground">{schedule.reception} - {translations.details.receptionLabel}</p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-foreground">{translations.details.venueTitle}</h3>
              <p className="text-muted-foreground">{event.venue.name}</p>
              <p className="text-muted-foreground">{event.venue.address}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-foreground">{translations.details.dressCodeTitle}</h3>
              <p className="text-muted-foreground">{details.dressCode}</p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-foreground">{translations.details.parkingTitle}</h3>
              <p className="text-muted-foreground">{details.parking.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 