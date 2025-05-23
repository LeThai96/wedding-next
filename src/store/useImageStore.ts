import { create } from 'zustand';

interface ImageDimensions {
  width: number;
  height: number;
}

interface DirectoryImage {
  path: string;
  ratio: number;
}

interface ImageStore {
  // State
  galleryImages: DirectoryImage[];
  storyImages: { [key: string]: DirectoryImage[] };
  isLoading: boolean;
  error: string | null;

  // Actions
  loadGalleryImages: (directory: string) => Promise<void>;
  loadStoryImages: (directory: string) => Promise<DirectoryImage[]>;
  getImageDimensions: (src: string) => Promise<ImageDimensions>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  // Initial state
  galleryImages: [],
  storyImages: {},
  isLoading: false,
  error: null,

  // Get image dimensions
  getImageDimensions: async (src: string): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  },

  // Load gallery images
  loadGalleryImages: async (directory: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/images?directory=${encodeURIComponent(directory)}`);
      if (!response.ok) {
        throw new Error('Failed to load gallery images');
      }
      const images = await response.json();
      
      const imagesWithRatios = await Promise.allSettled(
        images.map(async (image: string) => {
          try {
            const dimensions = await get().getImageDimensions(image);
            return {
              path: image,
              ratio: dimensions.width / dimensions.height
            };
          } catch (error) {
            console.error(`Error loading image ${image}:`, error);
            return null;
          }
        })
      );

      // Filter out failed image loads and extract successful results
      const validImages: DirectoryImage[] = imagesWithRatios
        .filter((result): result is PromiseFulfilledResult<DirectoryImage> => 
          result.status === 'fulfilled' && result.value !== null)
        .map(result => result.value);
      
      set({ galleryImages: validImages, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load gallery images',
        isLoading: false 
      });
    }
  },

  // Load story images
  loadStoryImages: async (directory: string): Promise<DirectoryImage[]> => {
    try {
      const response = await fetch(`/api/images?directory=${encodeURIComponent(directory)}`);
      if (!response.ok) {
        throw new Error('Failed to load story images');
      }
      const images = await response.json();
      
      const imagesWithRatios = await Promise.allSettled(
        images.map(async (image: string) => {
          try {
            const dimensions = await get().getImageDimensions(image);
            return {
              path: image,
              ratio: dimensions.width / dimensions.height
            };
          } catch (error) {
            console.error(`Error loading image ${image}:`, error);
            return null;
          }
        })
      );

      // Filter out failed image loads and extract successful results
      const validImages: DirectoryImage[] = imagesWithRatios
        .filter((result): result is PromiseFulfilledResult<DirectoryImage> => 
          result.status === 'fulfilled' && result.value !== null)
        .map(result => result.value);

      // Update story images in store
      set((state) => ({
        storyImages: {
          ...state.storyImages,
          [directory]: validImages
        }
      }));
      
      return validImages;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load story images',
        isLoading: false 
      });
      return [];
    }
  }
})); 