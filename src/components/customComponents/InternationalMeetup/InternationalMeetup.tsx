import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function InternationalMeetup() {
  return (
    <Card className="overflow-hidden max-w-6xl mx-auto mt-2 border-0 bg-white">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="p-6 md:p-8 lg:p-10 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-[28px] font-medium leading-tight">
                Learn real AI skills that you can{" "}
                <span className="text-[#ff0000]">apply at work the very next day</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Includes masterclasses from AI experts at Microsoft and free access to ChatGPT Plus, Midjourney and
                GitHub Copilot.
              </p>
            </div>
            <Button className="bg-[#ff0000] hover:bg-[#E31B54]/90 text-white rounded-md px-6">View Program</Button>
          </div>
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full">
            <div className="absolute top-4 right-4 z-10">
              {/* <Image
                src="https://www.upgrad.com/_ww3-next/image/?url=https%3A%2F%2Fd2o2utebsixu4k.cloudfront.net%2FU%26AI__Img%20w%20unit-12dfc69bc010469b8e1956f62ea1790e.webp&w=1920&q=75"
                alt="Microsoft Logo"
                width={100}
                height={24}
                className="h-6 w-auto"
              />
              */}
             </div> 
            <Image src="https://www.upgrad.com/_ww3-next/image/?url=https%3A%2F%2Fd2o2utebsixu4k.cloudfront.net%2FU%26AI__Img%20w%20unit-12dfc69bc010469b8e1956f62ea1790e.webp&w=1920&q=75" alt="Professional working with AI" fill className="object-cover" priority />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

