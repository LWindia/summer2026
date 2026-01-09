import React, { useEffect, useRef } from 'react';
import Card from './Card';
import { register } from 'swiper/element/bundle';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play } from 'lucide-react';

import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
});

import localFont from "next/font/local";
const khandFont = localFont({
    src: '../../../app/fonts/Khand-SemiBold.woff',
    weight: '100 900',
});
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': any;
      'swiper-slide': any;
    }
  }
}

register();
const VideoCarousel = () => {
    const videos = [
      {
        id: 1,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1',
        thumbnail:"/assets/Thumbnail/1.jpg",
      },
      {
        id: 2,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
        thumbnail:"/assets/Thumbnail/2.jpg",
      },
      {
        id: 3,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3',
        thumbnail:"/assets/Thumbnail/3.jpg",
      },
      {
        id: 4,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_4',
        thumbnail:"/assets/Thumbnail/4.jpg",
      },
      {
        id: 5,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_5',
        thumbnail:"/assets/Thumbnail/5.jpg",
      },
      {
        id: 6,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_6',
        thumbnail:"/assets/Thumbnail/6.jpg",
      },
    ];
  
    return (
      <div className="w-full max-w-6xl h-full mx-auto p-4">

        <div className='w-full h-24 flex items-center justify-center'>
            <h1 className={`text-[#ff0000] text-center text-3xl md:text-4xl ${khandFont.className}`}>Hear what Investors &
            Industry Experts have to say</h1>
        </div>
        <swiper-container
  slides-per-view="3"
  space-between="24"
  loop="true"
  navigation="true"
  pagination="false"
  autoplay-delay="3000"
  autoplay-disable-on-interaction="false"
  breakpoints='{
    "320": {
      "slidesPerView": 1,
      "spaceBetween": 20
    },
    "640": {
      "slidesPerView": 2,
      "spaceBetween": 20
    },
    "768": {
      "slidesPerView": 3,
      "spaceBetween": 24
    },
    "1024": {
      "slidesPerView": 3,
      "spaceBetween": 24
    }
  }'
>
  {videos.map((video) => (
    <swiper-slide key={video.id}>
      <Card
        thumbnail={video.thumbnail}
        videoUrl={video.videoUrl}
      />
    </swiper-slide>
  ))}
</swiper-container>


{/* <div className='max-w-2xl mt-8 h-96 mx-auto'>
<Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full h-full cursor-pointer group rounded-lg overflow-hidden">
          <img
            src="https://thecreator.one/wp-content/uploads/2024/01/JAZBAA-2.jpg"
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
            src=""
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
</div> */}

      </div>
    );
  };
  
  export default VideoCarousel;

