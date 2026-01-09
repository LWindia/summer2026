import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface ImageCyclerProps {
  images: string[];
  interval?: number;
  transitionDuration?: number;
}

const ImageCycler: React.FC<ImageCyclerProps> = ({
  images,
  interval = 2000,
  transitionDuration = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [validImages, setValidImages] = useState<string[]>(images);

  // Filter out invalid/broken images
  useEffect(() => {
    // Filter out images with 'copy' in path, empty strings, or broken images
    const filtered = images.filter(img => 
      img && 
      img.trim() !== '' && 
      !img.includes('copy') &&
      !img.includes('G13 copy') &&
      !img.includes('G26.jpeg')
    );
    setValidImages(filtered.length > 0 ? filtered : images);
  }, [images]);

  useEffect(() => {
    if (validImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [validImages.length, interval]);

  // Don't render if no valid images
  if (validImages.length === 0) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <span className="text-gray-500 text-xs">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" style={{ minHeight: '180px' }}>
      <AnimatePresence mode="wait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          key={currentIndex}
          src={validImages[currentIndex]}
          alt="Cycling image"
          className="w-full h-full object-cover absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration }}
          loading={currentIndex === 0 ? "eager" : "lazy"}
          fetchPriority={currentIndex === 0 ? "high" : "auto"}
          decoding="async"
        />
      </AnimatePresence>
    </div>
  );
};

interface BentoItem {
  id: number;
  title: string;
  images: string[];
  width: number;
  height: number;
  interval: number;
  transitionDuration: number;
}

interface MobileGalleryProps {
  bentoItems: BentoItem[];
}

const MobileGalleryFrame: React.FC<MobileGalleryProps> = ({ bentoItems }) => {
  // Filter out items with potentially broken images for mobile
  const filteredItems = bentoItems.filter((item) => {
    // Remove items with suspicious image paths
    const hasInvalidPath = item.images.some(img => 
      img.includes('copy') || !img || img.trim() === ''
    );
    return !hasInvalidPath;
  });

  // Split items into groups: first 2 for top row, rest for bottom
  const topRowItems = filteredItems.slice(0, 2);
  const bottomRowItems = filteredItems.slice(2);

  return (
    <div className="w-full mx-auto h-auto bg-black px-2 py-2 mb-4">
      {/* Top Row: 2 images side by side */}
      <div className="grid grid-cols-2 gap-3 mb-3 w-full">
        {topRowItems.map((item) => {
          const validImages = item.images.filter(img => 
            img && 
            !img.includes('copy') && 
            !img.includes('G26.jpeg')
          );
          if (validImages.length === 0) return null;
          
          return (
            <div
              key={item.id}
              className="w-full border border-white rounded-sm overflow-hidden bg-white"
              style={{ minHeight: '180px' }}
            >
              <ImageCycler
                images={validImages}
                interval={item.interval}
                transitionDuration={item.transitionDuration}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Row: 1 full-width image spanning both top images */}
      {bottomRowItems.length > 0 && (
        <div className="w-full">
          {bottomRowItems.slice(0, 1).map((item) => {
            const validImages = item.images.filter(img => 
              img && 
              !img.includes('copy') && 
              !img.includes('G26.jpeg')
            );
            if (validImages.length === 0) return null;
            
            return (
              <div
                key={item.id}
                className="w-full border border-white rounded-sm overflow-hidden bg-white"
                style={{ minHeight: '180px' }}
              >
                <ImageCycler
                  images={validImages}
                  interval={item.interval}
                  transitionDuration={item.transitionDuration}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileGalleryFrame;