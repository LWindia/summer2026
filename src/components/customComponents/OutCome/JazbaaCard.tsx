import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Instagram, Twitter, Globe } from 'lucide-react' // Import icons
import { Inter,Poppins } from 'next/font/google'
import Link from "next/link";
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})
export default function JazbaaCard() {
  return (
    <Card className="w-full max-w-sm bg-zinc-900 text-white">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl text-[#ff0000] font-semibold">JAZBAA 4.0</h2>
          <div className="space-x-2">
            <span className={`font-semibold ${poppins.className}`}>Showcase your Summer Product to investors </span>
      <span className=" font-semibold"></span>
          </div>
        </div>

        <p className={`text-center text-gray-300 text-sm leading-relaxed ${poppins.className}`}>
          Only platform where Summer Interns pitch their startup product to investors 

        </p>
        <br/>
       
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pb-6">
      <Link href="/application-form">
        <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8">
          APPLY NOW
        </Button>
        </Link>
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a 
            href="https://www.instagram.com/jazbaabyiiec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://x.com/IIEC_Jazbaa" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Website"
          >
            <Globe size={20} />
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}