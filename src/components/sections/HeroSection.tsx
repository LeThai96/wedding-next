import Image from "next/image";
import { getWeddingConfig } from "@/utils/config";

export async function HeroSection() {
  const config = await getWeddingConfig();
  const { couple, event } = config;

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src={config.images.hero}
          alt="Wedding background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative z-20 text-center text-white space-y-6 px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-playfair tracking-wide">
          {couple.person1} & {couple.person2}
        </h1>
        <p className="text-xl md:text-2xl font-light font-parisienne">
          Are getting married
        </p>
        <div className="text-lg md:text-xl font-light space-y-2">
          <p>Saturday, {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p>{event.time}</p>
          <p className="mt-4">{event.venue.name}</p>
          <p>{event.venue.address}</p>
          <p>{event.venue.city}, {event.venue.state} {event.venue.zipCode}</p>
        </div>
        <div className="pt-8">
          <a 
            href="#rsvp"
            className="inline-block px-8 py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          >
            RSVP Now
          </a>
        </div>
      </div>
    </section>
  );
} 