import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play } from 'lucide-react';
import { register } from 'swiper/element/bundle';
register();
interface CardProps {
  thumbnail: string;
  videoUrl: string;
}

const Card = ({ thumbnail, videoUrl }: CardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full h-64 cursor-pointer group rounded-lg overflow-hidden">
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-fit"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <div className="aspect-video w-full">
          <iframe
            src={videoUrl}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Card;