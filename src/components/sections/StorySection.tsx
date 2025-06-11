'use client';

import Image from "next/image";
import { useWeddingStore } from '@/store/useWeddingStore';
import { useImageStore } from '@/store/useImageStore';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function StorySection() {
  const { config } = useWeddingStore();
  const { story, translations } = config;
  const { storyImages, loadStoryImages, isLoading, error } = useImageStore();

  // Load story images on mount
  useEffect(() => {
    const loadAllStoryImages = async () => {
      for (const section of story) {
        await loadStoryImages(section.imagesPath);
      }
    };
    loadAllStoryImages();
  }, [story, loadStoryImages]);

  // Add scroll behavior control
  useEffect(() => {
    const storySection = document.getElementById('ourstory');
    if (storySection) {
      storySection.style.scrollBehavior = 'smooth';
      storySection.style.scrollSnapType = 'y mandatory';
      storySection.style.scrollSnapAlign = 'start';
      storySection.style.scrollSnapStop = 'always';
    }

    return () => {
      if (storySection) {
        storySection.style.scrollBehavior = '';
        storySection.style.scrollSnapType = '';
        storySection.style.scrollSnapAlign = '';
        storySection.style.scrollSnapStop = '';
      }
    };
  }, []);

  const getImageLayoutClass = (images: typeof storyImages[string]) => {
    if (!images) return 'grid-cols-1';
    if (images.length === 1) {
      return 'grid-cols-1';
    }
    if (images.length === 2) {
      return 'grid-cols-2';
    }
    return 'grid-cols-3';
  };

  const getImageAspectClass = (image: typeof storyImages[string][number]) => {
    return image.ratio > 1 ? 'aspect-[3/2]' : 'aspect-[2/3]';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: index * 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  if (isLoading) {
    return (
      <section id="ourstory" className="section-padding bg-muted">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-muted-foreground">Loading story...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="ourstory" className="section-padding bg-muted">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-destructive">Error loading story: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="ourstory" className="section-padding bg-muted">
      <div className="container-padding max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-playfair text-center mb-16 text-foreground"
        >
          {translations.story.title}
        </motion.h2>
        <div className="space-y-32">
          {story.map((section, index) => {
            const images = storyImages[section.imagesPath] || [];
            return (
              <motion.div 
                key={section.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px", amount: 0.3 }}
                variants={containerVariants}
                className={`grid md:grid-cols-3 gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <motion.div 
                  className={`md:col-span-2 grid gap-4 ${getImageLayoutClass(images)} ${index % 2 === 1 ? 'md:order-2' : ''}`}
                >
                  {images.slice(0, 3).map((image, imageIndex) => (
                    <motion.div 
                      key={imageIndex}
                      custom={imageIndex}
                      variants={imageVariants}
                      className={`relative rounded-lg overflow-hidden ${getImageAspectClass(image)}`}
                    >
                      <Image
                        src={image.path}
                        alt={`${section.title} - Image ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div 
                  variants={textVariants}
                  className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}
                >
                  <h3 className="text-2xl font-playfair text-foreground">{section.title}</h3>
                  <p className="text-muted-foreground">{section.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 