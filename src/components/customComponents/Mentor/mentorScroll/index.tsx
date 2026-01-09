"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image1 from "../../../../../public/assets/Mentor/1.jpg";
import Image2 from "../../../../../public/assets/Mentor/2.jpg";
import tedx from "../../../../../public/assets/Mentor/tedx.jpg";
import Image3 from "../../../../../public/assets/Mentor/3.jpg";
import Image4 from "../../../../../public/assets/Mentor/Onemanarmy.jpg";
import Image5 from "../../../../../public/assets/Mentor/TAlkofTown.jpg";
import Image6 from "../../../../../public/assets/Mentor/techguru.jpg";
import Image7 from "../../../../../public/assets/Mentor/TheO&O.jpg";
import Image8 from "../../../../../public/assets/Mentor/thonlyone.jpg";

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
});

import localFont from "next/font/local";
const khandFont = localFont({
  
    src: '../../../../app/fonts/Khand-SemiBold.woff',
    weight: '100 900',
});
// Types
interface CardData {
  title: string;
  description: string;
  imageUrl: string;
}

// Lens Component
const Lens = ({ 
  children, 
  hovering, 
  setHovering 
}: { 
  children: React.ReactNode; 
  hovering: boolean; 
  setHovering: (hovering: boolean) => void;
}) => {
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative overflow-hidden"
    >
      {children}
    </div>
  );
};

// Rays Component
const Rays = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />
  </div>
);

// Beams Component
const Beams = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />
  </div>
);

export function MentorScroll() {
  const [hoveringStates, setHoveringStates] = useState(Array(9).fill(false));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleHover = (index: number, isHovering: boolean) => {
    const newHoveringStates = [...hoveringStates];
    newHoveringStates[index] = isHovering;
    setHoveringStates(newHoveringStates);
  };

  // Original card data
  const originalCardData: CardData[] = [
    {
      title: "Worked with Creators",
      description: "Closely worked associated with the Founders & Creators of technologies. So learn the right approach clear your myths with the right mentor",
      imageUrl: Image1.src
    },
    {
      title: "The World Record Holder",
      description: "The One & Only in the World to achieve RedHat Certified Architect Level 25 with Enterprise Application Level 11",
      imageUrl: Image2.src
    },
    {
      title: "Awarded as 1",
      description: "Applauded Globally for his contribution towards the Engineering Community for the last 21 years & popularly known as Tech Guru of India",
      imageUrl: Image3.src
    },
    {
      title: "TedX Speaker",
      description: "First we have to create them, then Indian Engineering Students will be The Creator in technology space for our Nation",
      imageUrl: tedx.src
    },
    {
      title: "One Man Army",
      description: "Learn,Implement,Research,Integrate & Showcase your Summer Product under thw Internationally Recogniosed Industry Expert - Mr Vimal Daga",
      imageUrl: Image4.src
    },
    {
      title: "Talk of the Town",
      description: "Awarded & Recognised by all the Top Media Publications,News Channels,Top IT Magazines for serving the Engineering Youth Community.",
      imageUrl: Image5.src
    },
    {
      title: "The World Record Holder",
      description: "The One & Only to achieve 11 AWS Global Certifications in just 11 days which ohterwise professionals take more than 5 years.",
      imageUrl: Image7.src
    },
    {
      title: "The One & Only One in the World",
      description: "Popularly known as Integration Expert in IT Industry since he is the only one who has worked upon & knows to integrate maximum technologies.",
      imageUrl: Image8.src
    },
    {
      title: "Tech Guru",
      description: "Sr Principal IT Consultant for fortune 500 Companies & trained Directors,CTOs,CIOs,Founders,Principal Architects,Team Leaders & many more.",
      imageUrl: Image6.src
    }
  ];

  // Create extended array for infinite scroll
  const extendedCardData = [...originalCardData, ...originalCardData, ...originalCardData];

  // Handle scroll position
  const handleScroll = () => {
    if (!scrollRef.current || isScrolling) return;

    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    const scrollLeft = scrollContainer.scrollLeft;

    // If we're near the end
    if (scrollLeft + containerWidth >= scrollWidth - 100) {
      setIsScrolling(true);
      scrollContainer.scrollLeft = containerWidth;
      setTimeout(() => setIsScrolling(false), 100);
    }
    // If we're near the start
    else if (scrollLeft <= 100) {
      setIsScrolling(true);
      scrollContainer.scrollLeft = scrollWidth - (2 * containerWidth);
      setTimeout(() => setIsScrolling(false), 100);
    }
  };

  // Set initial scroll position
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.clientWidth;
    }
  }, []);

  // Handle manual scroll
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative'>
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-4 lg:py-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4">
            <span className='text-[#ff0000]'>World Record Holder - </span> <br className='md:hidden sm:block'/>Mr Vimal Daga
          </h1>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-2 top-1/2 z-30 bg-white/30 hover:bg-white/50 rounded-full p-2 transform -translate-y-1/2"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-2 top-1/2 z-30 bg-white/30 hover:bg-white/50 rounded-full p-2 transform -translate-y-1/2"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={handleScroll}
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="flex gap-4 min-w-max px-4">
            {extendedCardData.map((card, index) => (
              <motion.div 
                key={`${index}-${card.title}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 1) }}
                className="w-[300px] flex-shrink-0 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1D2235] to-[#121318] p-2"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Rays />
                <Beams />
                <div className="relative z-10">
                  <Lens 
                    hovering={hoveringStates[index % originalCardData.length]}
                    setHovering={(isHovering) => handleHover(index % originalCardData.length, isHovering)}
                  >
                    <div className="pb-[75%] w-full relative rounded-xl overflow-hidden">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="rounded-xl object-cover absolute top-0 left-0"
                      />
                    </div>
                  </Lens>
                  <div className="py-2 px-2 relative z-20">
                    <h2 className={`text-[#ff0000] text-lg text-bold ${khandFont.className}`}>
                      {card.title}
                    </h2>
                    <p className={`text-neutral-200 mt-1 text-sm ${poppins.className}`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}