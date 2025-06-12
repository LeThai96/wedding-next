'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWeddingStore } from '@/store/useWeddingStore';
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CelebrateUsDialogContent } from './sections/CelebrateUsDialogContent';

type NavItem = {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isDialog?: boolean;
};

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

  const navItems: NavItem[] = [
    { key: 'ourStory', label: translations.navigation.ourStory, href: '#story' },
    { key: 'details', label: translations.navigation.details, href: '#details' },
    { key: 'gallery', label: translations.navigation.gallery, href: '#gallery' },
    { key: 'celebrateUs', label: translations.navigation.celebrateUs, isDialog: true },
  ];

  const renderNavItem = (item: NavItem) => {
    const commonClasses = `cursor-pointer text-sm transition-colors duration-300 ${
      isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
    }`;

    if (item.isDialog) {
      return (
        <Dialog key={item.key}>
          <DialogTrigger asChild>
            <button className={commonClasses}>
              {item.label}
            </button>
          </DialogTrigger>
          <CelebrateUsDialogContent />
        </Dialog>
      );
    }

    return (
      <Link
        key={item.key}
        href={item.href || '#'}
        className={commonClasses}
        onClick={item.onClick}
      >
        {item.label}
      </Link>
    );
  };

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
          <div className="hidden md:flex md:mr-[84px] lg:mr-0 items-center space-x-8">
            {navItems.map(renderNavItem)}
          </div>
        </div>
      </div>
    </nav>
  );
} 