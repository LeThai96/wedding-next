import type { Metadata } from "next";
import { Playfair_Display, Shantell_Sans } from "next/font/google";
import "./globals.css";
import defaultConfig from '@/config/wedding-details.json';
import { SnowfallEffect } from '@/components/SnowfallEffect';

const shantellSans = Shantell_Sans({ 
  subsets: ["latin"],
  variable: '--font-shantell-sans',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  let lang = 'en';
  if (searchParams?.lang && typeof searchParams.lang === 'string') {
    lang = searchParams.lang;
  }
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${shantellSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <SnowfallEffect />
        {children}
      </body>
    </html>
  );
}
