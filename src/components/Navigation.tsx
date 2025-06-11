'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWeddingStore } from '@/store/useWeddingStore';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { config } = useWeddingStore();
  const { translations } = config;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="#home"
            className={`text-xl font-playfair transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            {translations.navigation.title}
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(translations.navigation)
              .filter(([key]) => key !== 'title')
              .map(([key, value]) => (
                <Link
                  key={key}
                  href={`#${key.toLowerCase()}`}
                  className={`text-sm transition-colors duration-300 ${
                    isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
                  }`}
                >
                  {value}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 