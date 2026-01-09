"use client";
import React from 'react';
import { Khand, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400']
});

const khandFont = Khand({
  subsets: ['latin'],
  weight: ['700']
});

const MapScroll = () => {
  const dummyBoxes = [
    { 
      title: "Summer Training & Internship Program 2026", 
      description: "LinuxWorld Informatics Pvt. Ltd. provides Summer Training and Internship Programs 2026 for B.Tech, MCA, and BCA students looking for practical IT training and real project experience. Learn from Industry Expert Mentors with real-world IT experience." 
    },
    { 
      title: "Industry-Oriented Content", 
      description: "We provide insights into the latest trends, tools, and innovations in the technology industry. Our content focuses on emerging technologies and real-world applications, helping learners stay aligned with current and future industry demands." 
    },
    { 
      title: "Industry Exposure", 
      description: "We help students understand how the tech industry actually works. Through real-world exposure, interns learn about current technologies, industry trends, and the real challenges faced by technology companies, helping them feel more confident and career-ready." 
    },
  ];

  return (
    <div className="relative bg-black py-2 md:py-4">
      <div className="flex flex-col gap-4 md:gap-4 w-full">
        {/* Top row - 2 boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
          <div className="w-full border border-gray-600 rounded-lg shadow-md p-4 md:p-5 hover:scale-[1.02] transition-transform duration-300 bg-gray-800">
            <div className="w-full flex flex-col items-center justify-center text-center">
              <h4 className={`text-white text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 leading-tight ${khandFont.className}`}>
                {dummyBoxes[0].title}
              </h4>
              <p className={`text-gray-300 text-sm md:text-sm leading-relaxed ${poppins.className}`}>
                {dummyBoxes[0].description}
              </p>
            </div>
          </div>
          <div className="w-full border border-gray-600 rounded-lg shadow-md p-4 md:p-5 hover:scale-[1.02] transition-transform duration-300 bg-gray-800">
            <div className="w-full flex flex-col items-center justify-center text-center">
              <h4 className={`text-white text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 leading-tight ${khandFont.className}`}>
                {dummyBoxes[1].title}
              </h4>
              <p className={`text-gray-300 text-sm md:text-sm leading-relaxed ${poppins.className}`}>
                {dummyBoxes[1].description}
              </p>
            </div>
          </div>
        </div>
        {/* Bottom row - 1 centered box */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 border border-gray-600 rounded-lg shadow-md p-4 md:p-5 hover:scale-[1.02] transition-transform duration-300 bg-gray-800">
            <div className="w-full flex flex-col items-center justify-center text-center">
              <h4 className={`text-white text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 leading-tight ${khandFont.className}`}>
                {dummyBoxes[2].title}
              </h4>
              <p className={`text-gray-300 text-sm md:text-sm leading-relaxed ${poppins.className}`}>
                {dummyBoxes[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScroll;