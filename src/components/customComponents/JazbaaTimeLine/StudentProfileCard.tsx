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

const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  linkedinUrl,
  studentName,
  role,
  profileImage,
}) => {
  return (
    <Card className="bg-white p-2 sm:p-3 md:p-4 flex items-center gap-4 w-full h-auto sm:h-24 relative overflow-hidden">
      {/* Left - Student Image */}
      <div className="flex-shrink-0 w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 relative">
        <Image
          src={profileImage}
          alt={`Profile of ${studentName}`}
          fill
          className="object-cover"
          unoptimized={profileImage.startsWith('http')}
        />
      </div>

      {/* Right side content */}
      <div className="flex-grow flex flex-col justify-between">
        {/* Top row with name */}
        <div className="flex justify-between items-start">
          <h3 className="text-xs sm:text-sm font-semibold text-[#ff0000] truncate max-w-[150px] sm:max-w-[200px]">
            {studentName} {/* Dynamic Student Name from props */}
          </h3>
        </div>

        {/* Company section */}
        <div className="flex flex-col">
          <p className="text-[8px] sm:text-[9px] p-[2px] text-black font-semibold line-clamp-2">
            {role} {/* Dynamic Role from props */}
          </p>
        </div>
      </div>

      {/* LinkedIn Badge */}
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="absolute top-1 right-1">
        <Badge
          variant="outline"
          className="flex items-center gap-1 hover:bg-blue-50 cursor-pointer text-[8px] sm:text-[10px] md:text-xs"
        >
          <Linkedin className="w-3 h-3" />
        </Badge>
      </a>
    </Card>
  );
};

export default StudentProfileCard;
                