import React, {  } from 'react';
import { OurAlumniWorksAtCarousel } from "../../ui2/OurAlumniWorksAtCarousel";
import { Inter,Khand,Poppins } from 'next/font/google'
const khandFont = Khand({
  subsets: ['latin'],
  weight: ['700']
})
 
const Community = () => {


  const logos = [
    { image: '/assets/collogelogo/AIETM.jaipur.jpeg' },
    { image: '/assets/collogelogo/AU,JAipur.jpeg' },
    { image: '/assets/collogelogo/CU,Punjab.jpeg' },
    { image: '/assets/collogelogo/DEI,Agra.jpeg' },
    { image: '/assets/collogelogo/IGEC.MP.jpeg' },
    { image: '/assets/collogelogo/iiit,nagpur.jpeg' },
    { image: '/assets/collogelogo/MCE,Bihar.jpeg' },
    { image: '/assets/collogelogo/MU,jaipur.jpeg' },
    { image: '/assets/collogelogo/MU,Rajsthan.jpeg' },
    { image: '/assets/collogelogo/NIT,Goa.jpeg' },
    { image: '/assets/collogelogo/NIT,kurukshetra.jpeg' },
    { image: '/assets/collogelogo/PVC,mumbai.jpeg' },
    { image: '/assets/collogelogo/RBS,Agra.jpeg' },
    { image: '/assets/collogelogo/UIET.MOU.Rohthak.jpeg' },
    { image: '/assets/collogelogo/UPES,dehradun.jpeg' },
    { image: '/assets/collogelogo/VIT,Pune.jpeg' },
  ];

 

  return (
    <div className="w-full max-w-full mx-auto h-[200px] overflow-hidden bg-white pt-4">
      <h1 className={`text-3xl md:text-4xl font-bold text-[#ff0000] text-center mb-0  ${khandFont.className}`}>
        Our College Community
      </h1>
      {/* First row - Moving Left */}
      <div className="flex flex-col items-center justify-center bg-white  relative overflow-hidden mt-0">
        <OurAlumniWorksAtCarousel
          items={logos}
          direction="left"
          speed="slow"
          cardWidth={150}
          cardHeight={150}
        />
      </div>

    
    </div>
  );
};

export default Community;
