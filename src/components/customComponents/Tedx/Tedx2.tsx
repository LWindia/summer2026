import React from 'react';
import { SpeakerProps } from './types';
import { Inter, Poppins } from 'next/font/google'
import localFont from "next/font/local";
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})

const khandFont = localFont({
  src: '../../../app/fonts/Khand-SemiBold.woff',
  weight: '100 900',
})

const Tedx2: React.FC<SpeakerProps> = ({ 
  imageUrl, 
  badge, 
  firstName, 
  lastName,
  link,
  socialLinks = {} // Default empty object for social links
}) => {
  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Image Container */}
      <div 
        className="relative w-[300px] h-[300px] group cursor-pointer transform transition-transform hover:scale-105"
        onClick={handleClick}
      >
        {/* Main circle with gradient border */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Badge */}
        <div className="absolute bottom-12 -right-4">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full px-6 py-2 text-white shadow-lg">
            <p className={`text-lg font-semibold ${poppins.className}`}>{badge}</p>
          </div>
        </div>

        {/* Link indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg 
            className="w-6 h-6 text-white" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </div>
      </div>

      {/* Text Content Container */}
      <div className="text-center space-y-4 max-w-[300px]">
        {/* Name */}
        <h2 className={`text-xl font-bold ${poppins.className}`}>
          <span className="text-[#ff0000]">{firstName}</span>{' '}
          <span className="text-white">{lastName}</span>
        </h2>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          {socialLinks.instagram && (
            <a 
              href={socialLinks.instagram}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
            </a>
          )}
          {socialLinks.facebook && (
            <a 
              href={socialLinks.facebook}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a 
              href={socialLinks.linkedin}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tedx2;