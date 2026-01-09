import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MobileGalleryFrame from "./MobileGalleryFrame";
import { bentoItems1, bentoItems2 ,bentoItems3} from "./MobileGalleryData";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const MobileGallery = () => {
  const swiperConfig = {
    modules: [Autoplay],
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
  };

  return (
    <div className="w-full">
      {/* First Gallery */}
      <div className="mb-0">
        <Swiper 
          {...swiperConfig}
          className="w-full"
          slidesPerView={1}
          spaceBetween={10}
        >
            <SwiperSlide className="!w-full">
              <MobileGalleryFrame bentoItems={bentoItems1} />
            </SwiperSlide>
        
            <SwiperSlide className="!w-full">
              <MobileGalleryFrame bentoItems={bentoItems2} />
            </SwiperSlide>
            
            <SwiperSlide className="!w-full">
              <MobileGalleryFrame bentoItems={bentoItems3} />
            </SwiperSlide>
            
        </Swiper>
      </div>
    </div>
  );
};

export default MobileGallery;