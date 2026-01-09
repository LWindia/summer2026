"use client"

import Image from "next/image";
import React, { useState } from "react";
import { Timeline, } from "@/components/ui/timeline";
import StudentProfileCard from "./StudentProfileCard";
import { Data2014,Data2015,Data2016,Data2017,Data2018,Data2020,Data2021,Data2022,Data2023 } from './data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Inter,Poppins } from 'next/font/google'
import StudentMobileCard from "./MobileStudentCard"

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})

// Component to render year content with load more for mobile
function YearContent({ 
  students, 
  description, 
  year 
}: { 
  students: typeof Data2014; 
  description: string; 
  year: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 4; // 2 rows x 2 columns on mobile
  const studentsToShow = showAll ? students : students.slice(0, initialCount);
  const hasMore = students.length > initialCount;

  return (
    <div>
      <p className={`text-white dark:text-neutral-200 text-sm md:text-sm font-normal mb-4 sm:mb-6 md:mb-8 leading-relaxed ${poppins.className}`}>
        {description}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 overflow-hidden">
        {/* Desktop: Show all */}
        {students.map((student) => (
          <div key={student.id} className="hidden md:block">
            <StudentProfileCard
              linkedinUrl={student.linkedinUrl}
              studentName={student.studentName}
              role={student.role}
              profileImage={student.profileImage}
            />
          </div>
        ))}

        {/* Mobile: Show limited with load more - 2 columns */}
        {studentsToShow.map((student) => (
          <div key={student.id} className="md:hidden flex">
            <StudentMobileCard
              linkedinUrl={student.linkedinUrl}
              studentName={student.studentName}
              role={student.role}
              profileImage={student.profileImage}
            />
          </div>
        ))}
      </div>

      {/* "And many more..." text - Clickable on mobile when hasMore, always visible on desktop */}
      <Card className="bg-black border-[0px] p-2 sm:p-3 md:p-4 flex gap-2 sm:gap-3 md:gap-4 w-full h-4 sm:h-8 relative mt-4 md:mt-0">
        <div className="flex-grow flex mt-4 items-end flex-col justify-center">
          {/* Mobile: Clickable text when hasMore */}
          {hasMore && (
            <p 
              className="text-[#ff0000] text-center cursor-pointer hover:underline transition-all md:hidden"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'And many more...'}
            </p>
          )}
          {/* Mobile: Non-clickable when no more */}
          {!hasMore && (
            <p className="text-[#ff0000] text-center md:hidden">
              And many more...
            </p>
          )}
          {/* Desktop: Always non-clickable */}
          <p className="text-[#ff0000] text-center hidden md:block">
            And many more...
          </p>
        </div>
      </Card>
    </div>
  );
}

export function JazbaaTimeLine() {
  const data = [
    {
      title: "2014",
      content: <YearContent students={Data2014} description="The First Spark of Transformation!" year="2014" />,
    },
    {
      title: "2015",
      content: <YearContent students={Data2015} description="Innovation & Success Despite All Odds!" year="2015" />,
    },
    {
      title: "2016",
      content: <YearContent students={Data2016} description="Rising Stars in the Tech World!" year="2016" />,
    },
    {
      title: "2017",
      content: <YearContent students={Data2017} description="Summer Learners, Full-Time Achievers!" year="2017" />,
    },
    {
      title: "2018",
      content: <YearContent students={Data2018} description="Engineering Success Stories Begin Here!" year="2018" />,
    },
    {
      title: "2020",
      content: <YearContent students={Data2020} description="Future-Ready Engineers, Industry-Proven Skills!" year="2020" />,
    },
    {
      title: "2021",
      content: <YearContent students={Data2021} description="Resilient Learners, Game-Changing Careers!" year="2021" />,
    },
    {
      title: "2022",
      content: <YearContent students={Data2022} description="Creating a Future Full of Possibilities!" year="2022" />,
    },
    {
      title: "2023",
      content: <YearContent students={Data2023} description="Shaping the Tech Workforce of India!" year="2023" />,
    },
  ];

  return (
    <div className="w-full" id="Placement">
         <div className="w-full text-center pt-10 md:pt-16 pb-4 px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-[#ff0000] leading-tight mb-3 md:mb-4" id="Placement">Our Summer Alumni's Working at</h1>
      </div>
      <Timeline data={data} />
    </div>
  );
}
