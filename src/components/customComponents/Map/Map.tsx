"use client"

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Youtube,Instagram ,Linkedin ,Globe ,Cpu ,KeyRound  } from 'lucide-react';


import MapScroll from "./MapScroll";
import { Inter,Khand,Poppins } from 'next/font/google'
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})
const khandFont = Khand({
  subsets: ['latin'],
  weight: ['700']
})
const Map = () => {
  return (
    <section className="max-w-7xl pt-4 md:pt-8 mx-auto px-4 md:px-0 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] justify-center gap-0 items-center">
        {/* Mobile: Map first, Desktop: Left column first */}
        <div className="order-2 md:order-1 bg-black h-full pb-4 md:pb-0 lg:p-10 space-y-4 md:space-y-6 flex flex-col justify-center relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
          </div>

          <div className="relative p-4 md:p-8 md:p-0 z-10 pt-4 md:pt-8 text-white space-y-3 md:space-y-5 overflow-hidden">
            {/* Main Content Stack */}
            <div className="space-y-2 md:space-y-2">
              <h1 className={`text-xl md:text-3xl lg:text-4xl xl:text-4xl text-center md:text-left md:block text-[#ff0000] tracking-tight font-bold leading-tight ${khandFont.className}`}>
                Engineering Students from across India participate
              </h1>
              <p className={`text-base md:text-lg lg:text-xl text-white text-center md:text-left md:block leading-relaxed ${poppins.className}`}>
                Gain Real-World Experience Through Industry-Oriented Summer Training 2026 Programs with Live Projects
              </p>
            </div>

            {/* Desktop: MapScroll and Button */}
            <div className="hidden md:block">
              <MapScroll />
            </div>
            <div className="flex pt-6 hidden justify-center md:flex md:w-full md:max-w-[50%] md:mx-auto">
              <a href="/application-form" className="w-full md:w-auto">
                <Button
                  size="lg"
                  className={`w-full md:w-auto bg-[#ff0000] hover:bg-[#ff0000]/90 text-white font-bold text-base md:text-lg py-6 px-10 md:px-12 shadow-lg hover:shadow-xl transition-all duration-300 rounded-md`}
                >
                  Apply Now
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: Map second (appears first due to order), Desktop: Right column */}
        <div className="order-1 md:order-2 w-full h-full flex items-center justify-center min-h-[300px] md:min-h-[600px] lg:min-h-[800px] xl:min-h-[900px] relative">
          <Image src="/assets/map/map.png" alt="Map" fill className="object-contain" />
        </div>
      </div>

      {/* Mobile: Boxes below map with proper alignment */}
      <div className="md:hidden mt-6 px-4">
        <MapScroll />
      </div>

      {/* Mobile: Apply Now button below boxes */}
      <div className="flex md:hidden mt-6 mb-4 justify-center px-4">
        <a href="/application-form" className="w-auto">
          <Button
            size="lg"
            className={`w-auto bg-[#ff0000] hover:bg-[#ff0000]/90 text-white font-bold text-base md:text-lg py-5 md:py-6 px-6 md:px-12 shadow-lg hover:shadow-xl transition-all duration-300 rounded-md min-h-[48px]`}
          >
            Apply Now
          </Button>
        </a>
      </div>
    </section>
  );
};

export default Map;