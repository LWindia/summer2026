import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin } from 'lucide-react';


interface StudentProfileCardProps {
  linkedinUrl: string;
  studentName: string;
  role: string;
  companyLogoUrl?: string;
  profileImage: string;
}

const StudentMobileCard: React.FC<StudentProfileCardProps> = ({
  linkedinUrl,
  studentName,
  role,
  profileImage,
}) => {
  return (
    <Card className="bg-white p-2 sm:p-3 md:p-4 flex gap-2 sm:gap-3 md:gap-4 w-full h-full min-h-[85px] sm:h-24 relative overflow-hidden">
      {/* Left side - Student Image */}
      <div className="flex-shrink-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-100 relative">
          <Image
            src={profileImage}
            alt={`Profile of ${studentName}`}
            fill
            className="object-cover"
            unoptimized={profileImage.startsWith('http')}
          />
        </div>
      </div>

      {/* Right side content */}
      <div className="flex-1 flex flex-col justify-center pr-5 md:pr-0 min-w-0 gap-0.5">
        {/* Name - Allow wrapping for long names */}
        <h3 className="text-[10px] sm:text-sm font-semibold text-[#ff0000] leading-tight" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          wordBreak: 'break-word',
          hyphens: 'auto'
        }}>
          {studentName}
        </h3>

        {/* Role - Proper text wrapping */}
        <p className="text-[8px] sm:text-[10px] text-black font-medium leading-tight" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          wordBreak: 'break-word',
          hyphens: 'auto'
        }}>
          {role}
        </p>
      </div>

      {/* Badge - positioned at bottom right corner for mobile, top right for desktop */}
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-1.5 right-1.5 md:top-0.5 md:right-0.5 md:bottom-auto z-10">
        <Badge
          variant="outline"
          className="flex items-center justify-center hover:bg-blue-50 cursor-pointer text-[7px] sm:text-xs bg-white shadow-sm p-1 w-5 h-5"
        >
          <Linkedin className="w-2 h-2 sm:w-3 sm:h-3" />
        </Badge>
      </a>
    </Card>
  );
};

export default StudentMobileCard;