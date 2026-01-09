import React from "react";
import Image from "next/image";

const Footer3 = ()=>{

    return (
        <>
        <div className="w-full  h-full mx-auto ">


                <Image 
                    className="w-full object-cover" 
                    src="/assets/footerImage.jpg" 
                    alt="Footer"
                    width={1920}
                    height={400}
                    loading="lazy"
                />
       

            
        </div>
        
        </>
    )

}

export default Footer3;