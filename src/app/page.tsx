import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { StorySection } from "@/components/sections/StorySection";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { RSVPSection } from "@/components/sections/RSVPSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CountdownSection />
      <StorySection />
      <DetailsSection />
      <RSVPSection />
    </main>
  );
}
