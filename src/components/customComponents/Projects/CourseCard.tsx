"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import BrochureFormDialog from './BrochureFormDialog';

interface CourseCardProps {
  courseName: string;
  tagline: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  price: string;
  originalPrice?: string;
  paymentLink: string;
  brochurePdfUrl: string;
}

export default function CourseCard({
  courseName,
  tagline,
  image,
  price,
  originalPrice,
  paymentLink,
  brochurePdfUrl,
}: CourseCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full rounded-2xl w-full shadow-sm md:shadow-sm">
        {/* Red Top Section - Image Only */}
        {/* Image fills completely on all breakpoints */}
        <div className="bg-[#ff0000] h-[280px] md:h-[220px] relative overflow-hidden rounded-t-2xl rounded-b-2xl">
          <div className="absolute inset-0 w-full h-full rounded-t-2xl rounded-b-2xl overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-t-2xl rounded-b-2xl"
              style={{ 
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                borderWidth: '0px'
              }}
              priority
            />
          </div>
        </div>
        
        {/* White Bottom Section */}
        {/* Reduced spacing for better layout */}
        <div className="bg-white p-4 md:p-4 flex flex-col flex-grow min-h-[200px] md:min-h-[220px]">
          {/* Course Name Heading */}
          <h3 className="text-[#ff0000] text-lg lg:text-xl font-bold mb-1.5 leading-tight min-h-[36px] flex items-center">
            {courseName}
          </h3>
          
          {/* Tagline - Reduced min-height */}
          <p className="text-gray-700 text-sm mb-3 leading-relaxed min-h-[48px]">
            {tagline}
          </p>
          
          <div className="mt-auto">
            {/* Buttons - Side by side on mobile, full width on desktop */}
            <div className="flex flex-row md:flex-row gap-2 md:gap-3">
              <Button
                variant="outline"
                className="flex-1 md:flex-1 border-2 border-[#ff0000] text-[#ff0000] hover:bg-red-50 font-semibold h-12 md:h-11 text-xs md:text-sm shadow-sm"
                onClick={() => setIsDialogOpen(true)}
              >
                <Download className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Download Brochure</span>
                <span className="sm:hidden">Download Brochure</span>
              </Button>
              
              <Button
                className="flex-1 md:flex-1 bg-[#ff0000] hover:bg-[#ff0000]/90 text-white font-semibold h-12 md:h-11 text-xs md:text-sm shadow-md"
                onClick={() => window.open('/application-form', '_blank')}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <BrochureFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        courseName={courseName}
        brochurePdfUrl={brochurePdfUrl}
      />
    </>
  );
}


