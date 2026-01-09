import React from "react";
import Image from "next/image";

const Footer3 = ()=>{

    return (
        <div className="w-fll mx-auto h-full overflow-clip">
            <Image 
                className="w-full mx-auto h-full object-cover" 
                src="/assets/footerImage.jpg" 
                alt="Footer"
                width={1920}
                height={400}
                loading="lazy"
            />
        </div>
    )

}

export default Footer3;