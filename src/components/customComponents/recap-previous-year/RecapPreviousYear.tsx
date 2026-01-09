"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Define interfaces
interface EventCard {
  title: string;
  location: string;
  image: string;
  videoUrl: string;
  isYoutube: boolean;
}

export default function RecapPreviousYear() {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);

  // States
  const [mainVideo, setMainVideo] = useState<EventCard>({
    title: "RECAP VIDEO",
    location: "Main Event",
    image: "/assets/events/recap2024.jpg",
    videoUrl: "https://www.youtube.com/embed/GCX02RwZ5dk",
    isYoutube: true,
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const [events, setEvents] = useState<EventCard[]>([
    {
      title: "JAZBAA 3.0",
      location: "",
      image: "/assets/events/summer2023.jpg",
      videoUrl: "https://www.youtube.com/embed/xdVdOeRmEKg",
      isYoutube: false,
    },
    {
      title: "JAZBAA 2.0",
      location: "",
      image: "/assets/events/jazbaa2.jpg",
      videoUrl: "https://www.youtube.com/embed/hF6EUQYekkw",
      isYoutube: true,
    },
    {
      title: "JAZBAA 1.0",
      location: "",
      image: "/assets/Thumbnail/jazbaa1.jpg",
      videoUrl: "https://www.youtube.com/embed/GCX02RwZ5dk",
      isYoutube: true,
    },
  ]);

  // Handlers
  const handleVideoPlay = () => {
    if (!mainVideo.isYoutube && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.error("Video playback error:", error);
      });
    }
  };

  const handleVideoSwap = (selectedEvent: EventCard) => {
    const currentMain = { ...mainVideo };
    setMainVideo(selectedEvent);
    setIsPlaying(true);

    if (!selectedEvent.isYoutube && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }

    const updatedEvents = events.map((event) =>
      event.title === selectedEvent.title ? currentMain : event
    );
    setEvents(updatedEvents);
  };

  // Effects
  useEffect(() => {
    handleVideoPlay();
  }, [mainVideo]);

  // Render Methods
  const renderMainVideo = () => {
    if (mainVideo.isYoutube) {
      return (
        <div className="relative w-full aspect-[16/8]" id="#Previous">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`${mainVideo.videoUrl}?autoplay=${isPlaying ? 1 : 0}`}
            title={`${mainVideo.title} video player`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      // todo -> 
      <video
        ref={videoRef}
        className="w-full aspect-[16/8] object-cover h-[200px] sm:h-auto"
        poster={mainVideo.image}
        autoPlay={isPlaying}
        loop
        muted 
        playsInline
      >
        <source src={mainVideo.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  const renderEventCard = (event: EventCard, index: number) => (
    <Card
      key={index}
      className="relative overflow-hidden rounded-none cursor-pointer group hover:scale-105 transition-transform duration-300"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square h-[100px] sm:h-auto">
          {/* Prevent autoplay for event cards */}
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`${event.videoUrl}?autoplay=0`}
            title={`${event.title} video player`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2 sm:p-6">
            <h3 className="text-sm sm:text-2xl font-bold text-white">{event.title}</h3>
            <p className="text-xs sm:text-xl font-semibold text-red-400">{event.location}</p>
          </div>
          <Button
            size="icon"
            className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleVideoSwap(event);
            }}
          >
            <Play className="h-3 w-3 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-black py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl px-2 sm:px-4 py-6 sm:py-12 space-y-4 sm:space-y-8">
        {/* Main Video Section */}
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          {renderMainVideo()}

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent p-4 sm:p-8 flex flex-col justify-between pointer-events-none">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-6xl font-bold text-white">
                {mainVideo.title}
              </h1>
            </div>
            <p className="text-xs sm:text-xl text-white">{mainVideo.location}</p>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mx-auto">
          {events.map((event, index) => renderEventCard(event, index))}
        </div>
      </div>
    </div>
  );
}