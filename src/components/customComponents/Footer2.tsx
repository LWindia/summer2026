
import hash13 from "../../../public/assets/logo2.webp";
import lwlogo from "../../../public/assets/logo2.webp";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import Image from "next/image"


export default function Footer2() {
  

  return (
    <footer className="bg-black text-white py-8">
        
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Brand Info with Logos */}
        <div>
          <h2 className="text-xl font-bold text-white">
          Job Oriented Global :<span className="text-[#ff0000]">  DevOps Program </span>
          </h2>
          <p className="text-lg text-blue-400 mt-2 leading-relaxed text-cyan-400">
          &quot;Making India 
  <span>
    <Image 
      src="/assets/flag.png" 
      alt="Indian Flag" 
      width={20} 
      height={14} 
      style={{ display: 'inline-block', marginLeft: '4px', verticalAlign: 'middle' }} 
    />
   &nbsp; </span> 
   Future Ready&quot;
</p>


          <p className="text-sm text-gray-400 font-italic mt-6">Powered By:</p>
          {/* Logos */}
          <div className="mt-4 flex gap-4 mx-auto">
          <span>  <Image src={lwlogo.src.toString()} width={110} height={48} alt="Logo" /></span>
            <div className="flex items-center justify-center">
              <span className="text-4xl text-[#ff0000]" style={{ height: '80px', borderLeft: '2px solid #ff0000' }}></span> {/* Pipe with larger height */}
            </div>
           <span> <Image src={hash13.src.toString()} width={96} height={48} alt="Logo" /></span>
          </div>
        

        <div className="mt-6 flex gap-6 justify-start items-center">
            <a
              href="https://www.linkedin.com/company/linuxworld-informatics-pvt-ltd/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-2xl hover:text-blue-800"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/linuxworld.india/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 text-2xl hover:text-pink-700"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@IIECconnect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 text-2xl hover:text-red-800"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/LinuxWorld.India/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-2xl hover:text-blue-700"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/Linuxworldindia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 text-2xl hover:text-sky-600"
            >
              <FaTwitter />
            </a>
            </div>
        </div>


        {/* Column 2: Cloudinary Video Stream */}
        <div className="flex justify-center items-center">
        <iframe
    width="420"
    height="250"
    src="https://www.youtube.com/embed/dqIsmWjbtfQ?si=JRgPBQsu4PIvUMpy"
    title="YouTube video player"
    
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
></iframe>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-white text-sm">
        © Copyright 2024 TGS | Designed & Developed with ❤️ by LinuxWorld | All Rights Reserved
      </div>
    </footer>
  );
}