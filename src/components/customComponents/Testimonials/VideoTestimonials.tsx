"use client";
import { Card } from "@/components/ui/card";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  videoUrl: string;
}

export default function VideoTestimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHoveredIndex(0);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const videos: VideoCardProps[] = [
    {
      title: "Aditi's Journey from Summer Internship ",
      thumbnail: "/assets/videotestinomial/aditi.jpg",
      videoUrl: "https://youtu.be/BUTXyVq2gUE?si=abUFECP-0U7nxhQN"
    },
    {
      title: "Divya's Journey from Summer Internship ",
      thumbnail: "/assets/videotestinomial/divya.jpg",
      videoUrl: "https://youtu.be/EUGLeid00LE?si=ClY2XmL-8NsuMntG"
    },
    
    {
      title: "Om's Journey from Summer Internship ",
      thumbnail: "/assets/videotestinomial/Om.jpg",
      videoUrl: "https://youtu.be/C4H29L1d3ko?si=_501FeGRlvklcgjk"
    },
    {
      title: "Shrishti's Journey from Summer Internship ",
      thumbnail: "/assets/videotestinomial/Shrishti.jpg",
      videoUrl: " https://youtu.be/o31w8dWX1ZA?si=nQSuiYnGmS_9EGmK"
    },
    {
      title: "Vidhisha Taneja's Journey from Summer Internship ",
      thumbnail: "/assets/videotestinomial/vidhisha-taneja.jpg",
      videoUrl: " https://www.youtube.com/watch?v=oi3AiWd7dJk"
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const VideoCard = ({ video, index }: { video: VideoCardProps; index: number }) => (
    <Card
      key={index}
      className={`relative rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
        isMobile 
          ? "w-full h-[450px]"
          : hoveredIndex === index 
            ? "w-[350px] h-[450px] shadow-xl -translate-y-2 z-10"
            : "w-[200px] h-[450px] shadow-md"
      }`}
      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
      onMouseLeave={() => !isMobile && setHoveredIndex(0)}
      onClick={() => window.open(video.videoUrl, "_blank")}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover rounded-xl"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 rounded-xl" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white/90 p-4 rounded-full hover:bg-white hover:scale-110 transition-transform">
          <Play className="w-6 h-6 fill-foreground/90" />
        </div>
      </div>
      
      <p className="absolute bottom-4 left-4 right-4 text-white font-medium text-sm line-clamp-3">
        {video.title}
      </p>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 bg-black">
      <header className="mb-8 space-y-2">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#ff0000] text-center ">
            Hear What Our <br/> <span className="text-[#ff0000]">Summer Learner&apos;s</span> have to say
          </h1>
          {/* <span className="bg-[#ff0000] text-white px-3 py-1 rounded-md text-sm">
            Testimonials
          </span> */}
        </div>
        {/* <p className="text-gray-500 text-lg">
          Tech Alumni Stories, You can&apos;t afford to miss.
        </p> */}
      </header>

      {/* Mobile Carousel */}
      {isMobile ? (
        <div className="relative">
          <div className="overflow-hidden">
            <VideoCard video={videos[currentIndex]} index={currentIndex} />
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Optional: Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-white w-4" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Desktop/Tablet View
        <div className="flex w-full overflow-x-auto mx-auto pb-4 gap-4 scrollbar-hide">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}