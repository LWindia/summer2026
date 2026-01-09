import React from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
});

const technologies = [
  { name: "Machine Learning", image:"/assets/TechStackLogo/awsLogo.svg", category: "AI/ML" },
  { name: "Cloud Computing", image:"/assets/TechStackLogo/cloudcomputing.png", category: "Cloud" },
  { name: "Python", image: "/assets/TechStackLogo/pythonLogo.svg", category: "Programming" },
  // { name: "RedHat Linux", image:"/assets/TechStackLogo/new/4.png", category: "OS" },
  
  { name: "FullStack", image:"/assets/TechStackLogo/reactLogo.svg", category: "Web Dev" },
  { name: "GenerativeAI", image:"/assets/TechStackLogo/8618881.png", category: "AI" },
  { name: "DevOps", image:"/assets/TechStackLogo/devops.png", category: "Automation" },
  // { name: "Blockchain", image: "/assets/TechStackLogo/new/9.png", category: "Security" },
  // { name: "MetaVerse", image: "/assets/TechStackLogo/new/10.png", category: "Virtual" },
  // { name: "Web 3.0", image:"/assets/TechStackLogo/new/11", category: "Next-Gen Web" },
  { name: "App Development", image: "/assets/TechStackLogo/11096817.png", category: "Development" },
  { name: "IoT", image:"/assets/TechStackLogo/IOT.png", category: "Connectivity" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TechStack() {
  return (
    <section className="container bg-black mx-auto px-4 py-2 md:py-8">
      <div className="grid mx-auto gap-8  lg:grid-cols-2 lg:gap-12 items-center max-w-6xl">
        <div className="space-y-4 w-full mx-auto">
          <h1 className="text-3xl text-[#ff0000] font-bold tracking-tight text-center sm:text-left lg:text-4xl">
            Learn, Research, Integrate & Build  Live Summer Project
          </h1>
          <p className={`text-sm md:text-2xl  text-white hidden sm:block ${poppins.className}`}>
            Master modern technologies through hands-on experience with industry-standard tools and frameworks.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {technologies.map((tech) => (
            <motion.div key={tech.name} variants={item}>
              {/* todo I want to show only 4 cards in a row  */}
              <Card className="group  relative flex flex-col items-center bg-white justify-center w-24 h-24 space-y-2 overflow-hidden p-2 text-white rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="relative flex items-center justify-center w-16 h-16">
                  <Image
                    src={tech.image || "/placeholder.svg"}
                    alt={`${tech.name} logo`}
                    width={64}
                    height={64}
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <p className="text-xs font-medium text-center text-black">{tech.name}</p>
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <p className="text-black text-[10px] font-semibold">{tech.category}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
