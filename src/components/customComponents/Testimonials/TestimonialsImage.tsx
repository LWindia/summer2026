"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ImageSlideshow from "./ImageSlideshow";
import { motion } from "framer-motion";
import { landingPageTestimonialPosts } from "./data";
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
});
// Define interface for testimonial data
interface Testimonial {
  id: string | number;
  testimonialScreenShot: string;
  images?: string[];
}

export default function ImageTestimonials() {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 10;
  const hasMoreTestimonials = landingPageTestimonialPosts.length > initialDisplayCount;

  const displayedTestimonials = showAll
    ? landingPageTestimonialPosts
    : landingPageTestimonialPosts.slice(0, initialDisplayCount);

  const handleToggleDisplay = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="bg-[#000000] py-6 ">
      <div className="max-w-6xl mx-auto px-2">
        <div className="bg-[#111111] border  border-gray-600 rounded-xl p-6 shadow-2xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-[#ff0000] text-3xl md:text-4xl font-bold mt-2">
              Summer Interns felt <br />
              “It’s a Life Changing Program”
            </h2>
            <h2 className={`text-white ${poppins.className} pt-2 text-lg font-semibold`}>Let's Hear From Them Why ?</h2>
          </div>

          {/* Testimonials Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-4">
            {displayedTestimonials.map((testimonial: Testimonial) => (
              <div key={testimonial.id} className="break-inside-avoid space-y-4">
                {/* Testimonial Screenshot Card (Static Image) */}
                <Card className="relative overflow-hidden bg-[#000000] border border-gray-500 hover:border-gray-400 transition-colors">
                  <CardContent className="p-4">
                    <Image 
                      className="w-full h-[96] rounded-lg object-cover" 
                      src={testimonial.testimonialScreenShot} 
                      alt={`Testimonial ${testimonial.id}`}
                      width={400}
                      height={96}
                      loading="lazy"
                    />
                  </CardContent>
                </Card>

                {/* Fading Image Slideshow (Dynamic) */}
                {testimonial.images && testimonial.images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }} // Smooth fade effect
                  >
                    <Card className="relative overflow-hidden bg-[#000000] border border-gray-500 hover:border-gray-400 transition-colors">
                      <CardContent className="p-4">
                        <ImageSlideshow images={testimonial.images} />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            ))}




          </div>
          <div className="flex-grow flex items-end mt-4 flex-col justify-center">
    {/* Centered Text */}
    <p className="text-[#ff0000] text-center">And many more...</p>

  
  </div>
{/* 
          <Card className="relative border-[0px] h-8 overflow-hidden  bg-[#111111]  ">
  <CardContent className="p-4 h-full w-full flex items-center justify-center">
    <h1 className="text-[#ff0000] text-lg text-center">And many More ...</h1>
  </CardContent>
</Card> */}

          {/* Load More Button */}
          {hasMoreTestimonials && (
            <div className="flex items-center mt-12">
              <button
                className="mx-auto px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800 transition-colors text-white font-medium"
                onClick={handleToggleDisplay}
              >
                {showAll ? "View Less" : "See our Wall of Love"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
