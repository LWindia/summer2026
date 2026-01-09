"use client";

import React from "react";
import { OurAlumniWorksAtCarousel } from "../../ui2/OurAlumniWorksAtCarousel";

// Company logos imports

import Google from "../../../../public/assets/companyLogo/google.png";
import TCS from "../../../../public/assets/companyLogo/tcs.png";
import Infosys from "../../../../public/assets/companyLogo/infosys.png";
import Salesforce from "../../../../public/assets/companyLogo/salesforce.png";
import Intel from "../../../../public/assets/companyLogo/intel.png";
import RedHat from "../../../../public/assets/companyLogo/redhat.png";
import Razorpay from "../../../../public/assets/companyLogo/razorpay.png";
import Wipro from "../../../../public/assets/companyLogo/wipro.png";
import Zoho from "../../../../public/assets/companyLogo/zoho.png";
import Oracle from "../../../../public/assets/companyLogo/oracle.png";
import Searce from "../../../../public/assets/companyLogo/searce.png";
import Syfe from "../../../../public/assets/companyLogo/syfe.png";
import Paytm from "../../../../public/assets/companyLogo/paytm.png";
import PWC from "../../../../public/assets/companyLogo/pwc.png";
import Nykaa from "../../../../public/assets/companyLogo/nykaa.png";
import NPCI from "../../../../public/assets/companyLogo/NPCI_logo.png";
import Accenture from "../../../../public/assets/companyLogo/accenture.png";
import JPMorgan from "../../../../public/assets/companyLogo/jpmorgan.png";
import Microsoft from "../../../../public/assets/companyLogo/microsoft.png";
import Deloitte from "../../../../public/assets/companyLogo/deloitte.png";
import Dell from "../../../../public/assets/companyLogo/dell.png";
import IBM from "../../../../public/assets/companyLogo/ibm.png";
import pinkcompany from "../../../../public/assets/companyLogo/36.png";
import Mercedece from "../../../../public/assets/companyLogo/Mercedes-Benz_Logo_2010.svg.png";
import Tesco from "../../../../public/assets/companyLogo/tesco.png";
import Airtel from "../../../../public/assets/companyLogo/airtel.png";
import Allianz from "../../../../public/assets/companyLogo/allianz.png";
import BankOfAmerica from "../../../../public/assets/companyLogo/bankofamerica.png";
import BigBasket from "../../../../public/assets/companyLogo/bigbasket.png";
import BluePlanet from "../../../../public/assets/companyLogo/blueplanet.png";
import Capgemini from "../../../../public/assets/companyLogo/capgemini.png";
import shyenaTech from "../../../../public/assets/companyLogo/shyenaTechLogo.png";
import quantifi from "../../../../public/assets/companyLogo/quantfi.png";
import peerxp from "../../../../public/assets/companyLogo/peerXp-Photoroom.png";
import unthinkable from "../../../../public/assets/companyLogo/logo_unthinkable_dbd9877981.png"

import localFont from "next/font/local";
const khandFont = localFont(
  {
    src: '../../../app/fonts/Khand-SemiBold.woff',
    weight: '100 900',
  }

)
export function LeftRightAlumniCarousel() {
  
  return (
    <div className="max-w-full px-4 md:py-6 lg:py-6 py-6 mx-auto relative bg-white">
      <div className="text-center mb-8">
        <div className="font-bold text-3xl md:text-4xl lg:text-4xl inline-block ">
          <span className={`text-[#ff0000] ${khandFont.className} text-3xl`}>Our  Summer Learner&apos;s Are Working At </span>
        </div>
        {/* <div className="text-gray-500 ">
          Become a part of our Alumni working at Leading Companies
        </div> */}
      </div>

      {/* First row - Moving Left */}
      <div className="flex flex-col items-center justify-center relative overflow-hidden mt-6">
        <OurAlumniWorksAtCarousel
          items={companiesRow1}
          direction="left"
          speed="slow"
          cardWidth={160}
          cardHeight={80}
        />
      </div>

      {/* Second row - Moving Right */}
      <div className="flex flex-col items-center justify-center relative overflow-hidden">
        <OurAlumniWorksAtCarousel 
          items={companiesRow2}
          direction="right"
          speed="slow"
          cardWidth={160}
          cardHeight={80}
        />
      </div>
    </div>    
  );
}

const companiesRow1 = [
  { image: Google.src },
  { image: BigBasket.src },
  { image: Microsoft.src },
  { image: IBM.src },
  { image: TCS.src },
  { image: Infosys.src },
  { image: Salesforce.src },
  { image: Intel.src },
  { image: RedHat.src },
  { image: PWC.src },
  { image: peerxp.src },
  { image: Wipro.src },
  { image: Zoho.src },
  { image: Oracle.src },
  { image: Searce.src },
  { image: Syfe.src },
  { image: Paytm.src },
  { image: JPMorgan.src },
];

const companiesRow2 = [
  { image: Accenture.src },
  { image: Capgemini.src },
  { image: Nykaa.src },
  { image: NPCI.src },
  { image: Accenture.src },
  { image: unthinkable.src },
  { image: Razorpay.src },
  { image: Deloitte.src },
  { image: Dell.src },
  { image: pinkcompany.src },
  { image: Mercedece.src },
  { image: Tesco.src },
  { image: Airtel.src },
  { image: Allianz.src },
  { image: BankOfAmerica.src },
  { image: quantifi.src },
  { image: BluePlanet.src },
  { image: shyenaTech.src },
];