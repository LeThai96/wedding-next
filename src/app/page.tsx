import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { StorySection } from "@/components/sections/StorySection";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Navigation } from "@/components/Navigation";
import { CelebrateUsButton } from "@/components/CelebrateUsButton";

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
