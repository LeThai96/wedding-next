import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { StorySection } from "@/components/sections/StorySection";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Navigation } from "@/components/Navigation";
import { CelebrateUsButton } from "@/components/CelebrateUsButton";
import { useWeddingStore } from '@/store/useWeddingStore';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Initialize the store server-side with default language
  await useWeddingStore.getState().loadConfig('en');

  const { lang } = await searchParams;

  // If there's a language parameter, load that configuration
  if (lang && typeof lang === 'string') {
    await useWeddingStore.getState().loadConfig(lang);
  }

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
