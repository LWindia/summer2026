import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import Link from "next/link";

import { Inter,Poppins } from 'next/font/google'
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})
export default function JazbaaStartupPlatform() {
  return (
    <section className="w-full bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#ff0000] mb-4" id="JAZBAA" >
            JAZBAA Start-up Platform
          </h1>
          <p className={`text-gray-200 text-sm md:text-md lg:text-lg px-4 ${poppins.className}`}>
           An event which showcases the StartUps incubated by Engineering Students in 45 days during Summer Industrial Training Program.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-16">
          {/* Angel Investors Card */}
          <Card className="bg-gray-800 h-full">
            <CardContent className="p-4 md:p-6 h-full">
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 text-[#ff0000]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#ff0000]">65+ Top-Notch</h3>
                <p className={`text-gray-200 text-sm md:text-base  ${poppins.className}`}>
                  Angel Investors & Industry Experts from various cities namely Mumbai, Bangalore, Hyderabad, Gurgaon
                  were present at JAZBAA 2.0 & JAZBAA 3.0
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Startups Card */}
          <Card className="bg-[#ff0000] h-full">
            <CardContent className="p-4 md:p-6 h-full">
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">123+ Startups</h3>
                <p className={`text-white text-sm md:text-base  ${poppins.className}`}>

                &quot;Unbelievable&quot; was the feedback from the investors to these 123+ Startups which were ideated, build
                  and showcased at JAZBAA 2.0 & JAZBAA 3.0
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sectors Card */}
          <Card className="bg-gray-800 h-full">
            <CardContent className="p-4 md:p-6 h-full">
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 text-[#ff0000]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#ff0000]">10+ Sectors</h3>
                <p className={`text-white text-sm md:text-base  ${poppins.className}`}>

                  Healthcare, Education, Logistics & Transportation, Agriculture, Consumer Products & Services, Retail,
                  Human Resource and many more
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Background Decoration - Made them more subtle and contained */}
        <div className="absolute top-0 right-0 -z-10 opacity-10 overflow-hidden">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-red-900 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-10 overflow-hidden">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-red-900 transform -rotate-45 -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
}