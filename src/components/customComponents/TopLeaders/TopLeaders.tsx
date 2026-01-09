import React from "react";
import { Vortex } from "../../ui/vortex";
import { Quote } from 'lucide-react';

import { Inter,Poppins } from 'next/font/google'
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})
export function TopLeaders() {
  return (
    <div className="w-[100%] mx-auto rounded-md  h-[25rem] overflow-hidden">
      <Vortex baseSpeed={0}
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >

        
        <h2 className="text-white text-3xl md:text-6xl  text-center py-2 ">
        {/* <Quote className="text-[#ff0000] inline w-16 h-16 md:w-16 md:h-16 mb-24  rotate-180 opacity-80 mb-0" /> */}
          Top Industry Leaders Recommended

        </h2>
        <p className="text-white p-0 text-sm md:text-2xl max-w-xl mt-0 text-center font-khand">
        <Quote className={`inline mb-6 md:space-y-[1px] rotate-180 text-[#ff0000] ${poppins.className}`} />
        Every Engineer should alteast once, be part of LinuxWorld&apos;s Summer Internship Program. 
        <Quote className='inline mt-2 text-[#ff0000]'/>
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          {/* <button className="px-4 py-4 bg-[#ff0000] mb-4 hover:bg-red-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Apply Now
          </button> */}
          <button className={`mb-6 p-2 rounded-sm text-white text-2xl text-bold bg-[#ff0000] text-bold ${poppins.className}`}>
          The Creator 2025</button>
        </div>
      </Vortex>
    </div>
  );
}
