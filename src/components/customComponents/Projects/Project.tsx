

import React from 'react';
import { Khand, Poppins } from 'next/font/google';
import CourseCard from './CourseCard';
import { courses } from './coursesData';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400']
});
const khandFont = Khand({
  subsets: ['latin'],
  weight: ['700']
});

export default function GitiProjects(): JSX.Element {
  return (
    <div className="relative bg-black" id="Projects">
      <div className="w-full text-center py-6 md:py-8 px-4" id="#Projects">
        <h1 className={`text-2xl md:text-4xl mt-2 md:mt-4 text-[#ff0000] font-bold leading-tight mb-3 md:mb-4 ${khandFont.className}`}>
          4–6 Weeks Summer Industrial Training with Live Projects
        </h1>
        <p className={`text-white text-base md:text-lg leading-relaxed ${poppins.className}`}>
          Gain Hands-On Experience in Trending Technologies and Boost Your Career Opportunities
        </p>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              courseName={course.courseName}
              tagline={course.tagline}
              image={course.image}
              price={course.price}
              originalPrice={course.originalPrice}
              paymentLink={course.paymentLink}
              brochurePdfUrl={course.brochurePdfUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}