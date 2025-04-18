import { Countdown } from "@/components/Countdown";
import { getWeddingConfig } from "@/utils/config";

export async function CountdownSection() {
  const { event } = await getWeddingConfig();
  const weddingDate = new Date(event.date);

  return (
    <section className="section-padding bg-white">
      <div className="container-padding max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-playfair mb-12 text-primary">
          Counting Down to Our Special Day
        </h2>
        <Countdown targetDate={weddingDate} />
      </div>
    </section>
  );
} 