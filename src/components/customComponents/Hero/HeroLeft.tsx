import { Button } from "@/components/ui/button"

export default function HeroLeft() {
  return (
    
    <div className="relative bg-red-600 text-white px-6 py-12 md:py-24 overflow-hidden">
      <div className="max-w-full mx-auto">
        {/* Main Heading */}
        <h1 className="text-1xl md:text-6xl font-extrabold tracking-tight mb-4">Summer Internship 2025</h1>

        {/* Subheading */}
        <h2 className="text-1xl md:text-5xl font-bold mb-6">Industrial Training Program</h2>

        {/* Target Audience */}
        <h3 className="text-1xl md:text-4xl font-semibold mb-4">For Engineering Students</h3>

        {/* Eligible Courses */}
        <p className="text-xl md:text-2xl font-medium mb-8">Open for B.Tech | M.Tech | BCA | MCA | B.SC IT</p>

        {/* CTA Button */}
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-red-600 hover:bg-gray-100 text-lg font-bold px-8 py-6"
        >
          Applications Open
        </Button>
      </div>

      {/* Optional: Add a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20" aria-hidden="true" />
    </div>
  )
}

