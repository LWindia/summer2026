// FeatureGrid.tsx
import React from "react";
import Tedx2 from "./Tedx2";
import { speakersData } from "./TedxData";
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
});

const FeatureGrid = () => {
  return (
    <div className="w-full py-12 bg-black flex flex-col items-center justify-center p-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff0000] mb-4">Voices of Impact: CREATOR & Beyond</h2>
        <p className={`text-white text-lg md:text-2xl ${poppins.className}`}>How One Vision is Turning Engineering Students into Tech Creators! </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-12">
        {speakersData.map((speaker, index) => (
          <Tedx2
            key={index}
            imageUrl={speaker.imageUrl}
            badge={speaker.badge}
            firstName={speaker.firstName}
            lastName={speaker.lastName}
            link={speaker.link}
            socialLinks={speaker.socialLinks}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;