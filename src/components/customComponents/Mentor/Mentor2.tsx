import React from 'react';
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Mentor2 = () => {
  const transfers = [
    { amount: "3500 usat", position: "top-[10%] left-[5%]" },
    { amount: "700 usat", position: "top-[50%] left-[12%]" },
    { amount: "1800 usat", position: "bottom-[20%] left-[8%]" },
    { amount: "3500 usat", position: "top-[15%] right-[5%]" },
    { amount: "700 usat", position: "bottom-[30%] right-[10%]" },
    { amount: "1800 usat", position: "top-[40%] right-[3%]" }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#520000] via-[#710000] to-[#ce0000] p-8">
      <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section - Left Side */}
        <div className="lg:w-1/2 relative w-full h-[70vh] min-h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent rounded-2xl overflow-hidden">
            <img 
              src="/assets/Mentor/vimalsir.webp"
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Floating Badges */}
          {transfers.map((transfer, index) => (
            <Card
              key={index}
              className={`absolute ${transfer.position} bg-black/90 backdrop-blur-sm p-2 rounded-xl flex items-center gap-2 transform transition-all duration-300 border-none shadow-xl z-20`}
            >
              <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="text-white text-xs">
                <div className="opacity-80">Transferencia exitosa</div>
                <div className="font-medium">monte: {transfer.amount}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Text Content - Right Side */}
        <div className="lg:w-1/2 space-y-6 text-white relative z-10">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#FF1F8E] to-[#ff6b6b] bg-clip-text text-transparent">
                Know Your Mentor
              </span>
            </h1>
            
            <div className="space-y-4">
              <div className="h-1 w-24 bg-[#FF1F8E] rounded-full" />
              <p className="text-xl font-medium opacity-90">
                Passionately dedicated to his vision of making the world future-ready through technological innovation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-black/30 rounded-xl">
                <div className="text-2xl">🌐</div>
                <div className="text-sm">9+ Years Experience</div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-black/30 rounded-xl">
                <div className="text-2xl">💰</div>
                <div className="text-sm">$900k+ Generated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor2;