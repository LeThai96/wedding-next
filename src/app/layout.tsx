import { Playfair_Display, Shantell_Sans } from "next/font/google";
import "./globals.css";
import { SnowfallEffect } from '@/components/SnowfallEffect';

const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  variable: '--font-shantell-sans',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

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
