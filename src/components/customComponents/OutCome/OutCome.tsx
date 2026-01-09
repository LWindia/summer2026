"use client";
import React from "react";
import Image from "next/image";
import JazbaaCard from "./JazbaaCard";
import InitCard from "./InitCard";

export function OutCome() {
  return (
    <section className="w-full overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="w-full relative rounded-xl h-[1000px] md:h-[600px] bg-fixed bg-cover bg-center min-h-full overflow-hidden bg-[url(/assets/outCome/backOutCome.jpg)]"
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
          
          <div className="flex flex-col items-center justify-center py-12 md:py-16 relative z-10">

            <div className="relative mb-12 md:mb-24">
              <h2 className="text-3xl md:text-4xl lg:text-4xl text-[#ff0000] font-bold text-inter-var text-center px-4">
                Outcome of Summer Internship Program
              </h2>
              
              {/* Left Arrow - Hidden on mobile and tablet */}
              <div className="hidden lg:block absolute left-[90px] top-full">
                <div className="relative w-32 h-24">
                  <div className="absolute top-0 left-1/2 transform -rotate-12">
                    <Image src="/assets/arrow.png" alt="Left arrow" width={128} height={96} className="hidden lg:block" />
                  </div>
                </div>
              </div>

              {/* Right Arrow - Hidden on mobile and tablet */}
              <div className="hidden lg:block absolute right-1/4 top-full">
                <div className="relative w-32 h-24">
                  <div className="absolute top-0 left-1/2 transform -rotate-90">
                    <Image src="/assets/arrow.png" alt="Right arrow" width={128} height={96} className="hidden lg:block" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Container */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0 lg:gap-6 md:gap-6 px-4">
              {/* First Card */}
              <div className="w-full md:w-1/2 max-w-[280px] relative">
                {/* Mobile Arrow - Hidden on all screens */}
                <div className="hidden">
                  <div className="w-1 h-12 bg-[#ff0000]"></div>
                  <div className="w-3 h-3 border-b-2 border-r-2 border-[#ff0000] transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <JazbaaCard />
              </div>
              
              {/* Second Card */}
              <div className="w-full md:w-1/2 max-w-[280px] relative mt-16 md:mt-0">
                {/* Mobile Arrow - Hidden on all screens */}
                <div className="hidden">
                  <div className="w-1 h-12 bg-[#ff0000]"></div>
                  <div className="w-3 h-3 border-b-2 border-r-2 border-[#ff0000] transform rotate-30 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <InitCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes arrowPulse {
          0% { transform: translateY(0); }
          50% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }

        .arrow-animation {
          animation: arrowPulse 2s infinite;
        }
      `}</style>
    </section>
  );
}