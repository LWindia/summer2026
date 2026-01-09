import React, { useState, useEffect } from "react";
import { BentoGrid } from "react-bento";
import { motion, AnimatePresence } from "framer-motion";
import { Inter, Poppins } from 'next/font/google'
import MobileGallery from "./MobileGallery"
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})
// Define props for ImageCycler
interface ImageCyclerProps {
  images: string[];
  interval?: number;
  transitionDuration?: number;
}

// ImageCycler Component
const ImageCycler: React.FC<ImageCyclerProps> = ({ images, interval = 2000, transitionDuration = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
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

// Define a type for each item in the BentoGrid
interface BentoItem {
  id: number;
  title: string;
  images: string[];
  width: number;
  height: number;
  interval: number;
  transitionDuration: number;
}

// BentoGallery Component
const BentoGallery: React.FC = () => {
  const bentoItems: BentoItem[] = [
    {
      id: 1,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G28.jpg",
        "/assets/event-gallery/galleryimg.jpeg",
        "/assets/event-gallery/G29.jpeg",
      ],
      width: 2,
      height: 2,
      interval: 5000,
      transitionDuration: 1,
    },
    {
      id: 2,
      title: "Email Preview",
      images: [
        "/assets/event-gallery/G27.jpg",
        "/assets/event-gallery/G26.jpeg",
        "/assets/event-gallery/G25.jpeg",
      ],
      width: 4,
      height: 2,
      interval: 20000,
      transitionDuration: 1.5,
    },
    {
      id: 3,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G24.jpg",
        "/assets/event-gallery/G23.jpg",
        "/assets/event-gallery/G22.jpg",
      ],
      width: 2,
      height: 2,
      interval: 17000,
      transitionDuration: 1,
    },
    {
      id: 6,
      title: "Settings Menu",
      images: [
        
        "/assets/event-gallery/G21.jpg",
        "/assets/event-gallery/G20.jpg",
        "/assets/event-gallery/G19.jpg"
      ],
      width: 2,
      height: 4,
      interval: 6000,
      transitionDuration: 1,
    },
    {
      id: 7,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G18.jpg",
        "/assets/event-gallery/G17.jpg",
        "/assets/event-gallery/G16.jpeg",
      ],
      width: 4,
      height: 2,
      interval: 10000,
      transitionDuration: 1,
    },
    {
      id: 8,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G15.jpg",
        "/assets/event-gallery/G14.jpeg",
        "/assets/event-gallery/G13.jpg",
      ],
      width: 1,
      height: 2,
      interval: 10000,
      transitionDuration: 1,
    },
    {
      id: 10,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G13.jpeg",
        "/assets/event-gallery/G12.jpg",
        "/assets/event-gallery/G11.jpeg",
      ],
      width: 1,
      height: 2,
      interval: 10000,
      transitionDuration: 1,
    },
    {
      id: 11,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G11.jpg",
        "/assets/event-gallery/G10.jpeg",
        "/assets/event-gallery/G9.jpeg",
      ],
      width: 2,
      height: 2,
      interval: 10000,
      transitionDuration: 1,
    },
    
    {
      id: 12,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G7.jpg",
        "/assets/event-gallery/G6.jpeg",
        "/assets/event-gallery/G5.jpeg",
      ],
      width: 2,
      height: 2,
      interval: 10000,
      transitionDuration: 1,
    },
    {
      id: 13,
      title: "Settings Menu",
      images: [
        "/assets/event-gallery/G4.jpeg",
        "/assets/event-gallery/G5.jpeg",
        "/assets/event-gallery/G3.jpeg",
      ],
      width: 2,
      height: 2,
      interval: 10000,
      transitionDuration: 1,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto md:min-h-screen pb-2 md:pb-4 md:mb-10 bg-black overflow-hidden">
      {/* Main Heading */}
      <div className="w-full text-center py-2 md:py-2 px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-[#ff0000] leading-tight mb-2 md:mb-4" id="Preivous"> Previous Summer 2025</h1>
        <p className={`text-white text-sm md:text-3xl leading-relaxed ${poppins.className} px-2`}>Develop problem-solving skills through team-based exercises and enhance your professional portfolio with industry-relevant projects.</p>
      </div>

      {/* Bento Grid for desktop */} 
      <div className="hidden md:block">
        <BentoGrid
          items={bentoItems.map((item) => ({
            ...item,
            element: (
              <ImageCycler
                images={item.images}
                interval={item.interval}
                transitionDuration={item.transitionDuration}
              />
            ),
          }))}
          gridCols={8}
          rowHeight={80}
          classNames={{
            container: "max-w-full mx-auto gap-2",
            elementContainer:
              "bg-white rounded-none gap-0 p-1 gap-2 overflow-hidden hover:opacity-90 transition-opacity duration-300",
          }}
        />
      </div>

      {/* For mobile - Proper spacing and padding */}
      <div className="md:hidden pt-1 pb-2 px-2">
        <MobileGallery/>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .bento-item {
          position: relative;
        }

        .bento-item::after {
          content: attr(data-title);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .bento-item:hover::after {
          opacity: 1;
        }

        .bento-item img {
          transition: transform 0.3s ease;
        }

        .bento-item:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default BentoGallery;