import { Card, CardContent } from "@/components/ui/card"

export default function FactAndFigures() {
  return (
    <div className="max-w-4xl mx-auto ">
    <div className="max-w-6xl px-6  ">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-[#ff0000] mb-2">Our Impact Numbers</h2>
      
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">
        {/* Left column */}
        <div className="space-y-6">
          {/* Students Trained Card */}
          <Card className="rounded-2xl bg-[#4263EB] relative overflow-hidden border-0">
            <div className="absolute inset-0 z-0">
              <div className="absolute bottom-0 right-0 w-full h-[4px] bg-white"></div>
              <div className="absolute bottom-0 right-0 h-full w-[4px] bg-white"></div>
            </div>
            <CardContent className="p-0 relative z-10">
              <div className="text-center p-4 text-white">
                <h3 className="text-5xl font-bold mb-1">150K+</h3>
                <p className="text-xl font-medium mb-2">Students Trained</p>
                <p className="text-sm opacity-90 max-w-md mx-auto">
                  Empowering futures through skilled students trained by our EdTech expertise
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            {/* Interns Card */}
            <Card className="rounded-2xl bg-[#FF9066] relative overflow-hidden border-0">
              <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 right-0 w-full h-[4px] bg-white"></div>
                <div className="absolute bottom-0 right-0 h-full w-[4px] bg-white"></div>
              </div>
              <CardContent className="p-0 relative z-10">
                <div className="text-center p-6 text-white h-full flex flex-col items-center justify-center">
                  <div className="mb-2">
                    <svg
                      className="w-6 h-6 opacity-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">3K+</h3>
                  <p className="text-sm font-medium">Interns</p>
                </div>
              </CardContent>
            </Card>

            {/* Training Domains Card */}
            <Card className="rounded-2xl bg-[#FF6B6B] relative overflow-hidden border-0">
              <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 right-0 w-full h-[4px] bg-white"></div>
                <div className="absolute bottom-0 right-0 h-full w-[4px] bg-white"></div>
              </div>
              <CardContent className="p-0 relative z-10">
                <div className="text-center p-6 text-white h-full flex flex-col items-center justify-center">
                  <div className="mb-2">
                    <svg
                      className="w-6 h-6 opacity-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">100+</h3>
                  <p className="text-sm font-medium">Training Domains</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right column - YouTube Card */}
        <Card className="rounded-2xl bg-white relative overflow-hidden border-0">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#ff0000]"></div>
            <div className="absolute bottom-0 right-0 h-full w-[2px] bg-[#ff0000]"></div>
          </div>
          <CardContent className="p-0 relative z-10">
            <div className="relative h-full p-2">
              {/* Hexagonal images */}
            <div className="absolute border-2  rounded-full  p-0 border-gray-100 top-4 right-16">
                <div className="w-full h-full object-fill rounded-2xl overflow-hidden">
                  <img
                    src="/assets/FactAndFigure/kidzogram.png"
                    alt=""
                    className="w-16 h-16 "
                  />
                </div>
              </div>
              <div className="absolute border-2  rounded-full  p-0 border-gray-100 top-1/3 left-4">
                <div className="w-full h-full object-fill rounded-2xl overflow-hidden">
                  <img
                    src="/assets/FactAndFigure/mystic-map.png"
                    alt=""
                    className="w-16 h-16 "
                  />
                </div>
              </div>
              <div className="absolute border-2  rounded-full  p-0 border-gray-100 bottom-0 right-16">
                <div className="w-full h-full object-fill rounded-2xl overflow-hidden">
                  <img
                    src="/assets/FactAndFigure/poketship.png"
                    alt=""
                    className="w-16 h-16 "
                  />
                </div>
              </div>

              <div className="absolute border-2  rounded-full  p-0 border-gray-100 top-48 left-24">
                <div className="w-full h-full object-fill rounded-2xl overflow-hidden">
                  <img
                    src="/assets/FactAndFigure/logo.jpeg"
                    alt=""
                    className="w-16 h-16 "
                  />
                </div>
              </div>


              <div className="absolute border-2  rounded-full  p-0 border-gray-100 top-8 left-24">
                <div className="w-full h-full object-fill rounded-2xl overflow-hidden">
                  <img
                    src="/assets/FactAndFigure/validx.png"
                    alt=""
                    className="w-16 h-16 "
                  />
                </div>
              </div>
              {/* Content */}
              <div className="text-center py-16">
                <h3 className="text-5xl font-bold mb-2">90+</h3>
                <p className="text-xl font-medium mb-2">
                <span className="text-[#FF0000]"> StartUps </span>  Showcased
                </p>
                <p className="text-[#4263EB] font-medium text-sm">
                  <a href="#" className="hover:underline">@LinuxWords</a>
                  <span className="mx-2">|</span>
                  <span>5K Videos</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>   </div>
  )
}