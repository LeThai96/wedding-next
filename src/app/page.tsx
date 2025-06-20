import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { StorySection } from "@/components/sections/StorySection";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Navigation } from "@/components/Navigation";
import { CelebrateUsButton } from "@/components/CelebrateUsButton";
import defaultConfig from '@/config/wedding-details.json';
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const { lang } = await searchParams;
  let config = defaultConfig;
  if (lang !== 'en') {
    try {
      config = (await import(`@/config/wedding-details.${lang}.json`)).default;
    } catch {
      config = defaultConfig;
    }
  }
  const translations = config.translations || {};
  return {
    title: translations?.metadata.title || "Thai & Ly's Wedding",
    description: translations?.metadata.description || "Join us in celebrating our special day",
  };
}


export default async function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <StorySection />
      <DetailsSection />
      <GallerySection />
      <CelebrateUsButton />
    </main>
  );
}
