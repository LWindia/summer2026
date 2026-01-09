

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { Inter,Poppins } from 'next/font/google'
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})

import localFont from "next/font/local";
const khandFont = localFont(
  {
    src: '../../../app/fonts/Khand-SemiBold.woff',
    weight: '100 900',
  }

)
const benefitsData = [
  {
    icon: "🎓",
    title: "100% Sponsorship International Conferences & Summits",
    subtitle: "",
    detail: "Time to meet the Creators of the technologies",
    description:
      "Lifetime Opportunity to visit International conference where you meet the creators of different upcoming technologies, know the Future booming technical concepts, experience a different technical approach & also get unbelievable job opportunities.",
    bgImage: "/assets/benefits/1.jpg"
  },
  {
    icon: "📚",
    title: "Connect with Communities & Industry Experts",
    subtitle: "",
    detail: "Get Connected - Get Inspired",
    description:
      "An Opportunity to meet in person & get connected with many industry experts here during the Summer Program. Also know the path to contribute to major communities namely AWS Community, Docker Community, OpenSource Community & many more.",
    bgImage: "/assets/benefits/industryexperts.png"
  },
  {
    icon: "💼",
    title: "Build Interpersonal Skills",
    subtitle: "",
    detail: "Become Confident & Interview Ready",
    description:
      "Work on real-world projects that enhance your portfolio and give you practical experience in your field.The One & Only Research Based Internship where you integrate more than 10+ technologies which helps you build a real production environment based Summer Project.",
    bgImage:"/assets/benefits/skills.png"
  },
  {
    icon: "🌟",
    title: "Teamwork & Collaboration",
    subtitle: "",
    detail: "Exposure to real industry work culture",
    description:
      "Interns from PAN India Engineering Colleges participate in the Summer Program & while doing your projects you all will be working closely with each other which will help you learn team synergy, how to work collaboratively as a team & team building skills.",
    bgImage:"/assets/benefits/teamwork.png" // Add your image
  },
  {
    icon: "🤝",
    title: "Project Based Learning Approach",
    subtitle: "",
    detail: "Develop Problem Solving Skills",
    description:
      "The problem-based project work @ THE CREATOR 2025 gives you a unique opportunity to acquire new knowledge and technical competences in an independent manner. You get to apply theory to practice when you work to solve real-life problems, and you will be well prepared for your future career.",
    bgImage:"/assets/benefits/learningapproach.png" // Add your image
  },
];

export default function Benefits() {
  return (
    <section className="hidden bg-[#000000] md:py-8 lg:py-8 py-20 " id="Benefits">
      <div className="max-w-6xl mx-auto px-2">
        <div className="bg-[#111111] border border-gray-700 rounded-xl shadow-2xl p-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl  text-[#ff0000] ">
              Benefits of Summer Program 2025
            </h1>
            <h2 className={`text-lg md:text:3xl text-white ${poppins.className} mb-6`}>
              Learn with Engineering students from Across India
            </h2>
          </div>

          {/* Top Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsData.slice(0, 3).map((benefit, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group min-h-[450px]"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${benefit.bgImage})`,
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                
                {/* Content */}
                <div className="relative z-10">
                  <CardHeader className="text-center">
                    <span className="text-5xl">{benefit.icon}</span>
                    <div className={`text-2xl text-[#ff0000] ${khandFont.className}`}>{benefit.title}

                  
                    </div>
                    <div className="text-lg text-gray-200"> 
                      {benefit.subtitle}
                    </div> 
                    
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="text-white font-semibold">{benefit.detail}</h3>
                    <p className={`text-gray-200 text-sm md:text-md mt-2 ${poppins.className}`}>{benefit.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom Row Cards - Now with same styling as top cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {benefitsData.slice(3).map((benefit, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group min-h-[200px] md:min-h-[300px]"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${benefit.bgImage})`,
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                
                {/* Content */}
                <div className="relative z-10">
                  <CardHeader className="text-center">
                    <span className="text-5xl">{benefit.icon}</span>
                    <CardTitle className={`text-2xl md:text-3xl text-[#ff0000] ${khandFont.className}`}>{benefit.title}</CardTitle>
                    <CardDescription className="text-md text-gray-200">
                      {benefit.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="text-white font-semibold">{benefit.detail}</h3>
                    <p className={`text-gray-200 mt-2 text-sm md:text-md ${poppins.className}`}>{benefit.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}