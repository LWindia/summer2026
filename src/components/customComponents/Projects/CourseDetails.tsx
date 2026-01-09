import { Zap } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CourseDetailsProps {
  title: string;
  description: string;
  content: string[];
  registerLink: string;
  originalPrice: string;
  price: string;
}

export default function CourseDetails({
  title,
  description,
  content,
  registerLink,
  originalPrice,
  price,
}: CourseDetailsProps) {
  return (
    <Card className="bg-pink-50 border-none shadow-sm max-w-3xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <span className="font-medium text-red-600 text-xl">{title}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {content.map((item, index) => (
            <Button
              key={index}
              variant="secondary"
              className="bg-pink-200 hover:bg-pink-300 border-none text-gray-800"
            >
              {item}
            </Button>
          ))}
        </div>
        
        <div className="pt-2 space-y-2">
          {/* Mobile view - stacked layout */}
          <div className="md:hidden">
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-lg font-medium mr-2">In Just</span>
                <div className="flex items-center mb-3">
                <span className="line-through text-gray-500 text-lg">₹{originalPrice} </span>
                </div>
                <span className="text-2xl font-bold text-red-600">₹{price}</span>
                <span className="text-xl text-red-600 ml-2">+Taxes</span>
              </div>
             
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.open(registerLink, '_blank')}
              >
                Register Now
              </Button>
            </div>
          </div>

          {/* Desktop view - original layout */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>in just </span>
                <span className="text-gray-500 line-through">₹{originalPrice}</span>
                <span className="text-2xl font-bold text-red-600">₹{price} +Taxes</span>
              </div>
              <Button
                className="w-1/3 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.open(registerLink, '_blank')}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}