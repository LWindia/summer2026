'use client'
import { Card } from "@/components/ui/card"
import { Khand } from "next/font/google"

const khand = Khand({
  weight: ['400', '600'],
  subsets: ['latin']
})

export default function SupportContact() {
  return (
    <Card className="max-w-6xl mx-auto min-h-[10rem] bg-black border-[0px] font-sans p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="space-y-2 mb-8">
          <h3 className={`text-[2.25rem] font-semibold leading-tight text-center md:text-left md:text-[2.25rem] sm:text-3xl ${khand.className}`}>
            <span className="text-[#ff0000]">Summer</span>{' '}
            <span className="text-[#ff0000]">Learner Support</span>
          </h3>
          <p className="text-lg md:text-[1.25rem] text-center md:text-left text-white font-normal">
            Talk to our experts. We&apos;re available 24/7.
          </p>
        </div>

        {/* Support Options */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Management Queries */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#FF9933"/>
                <circle cx="16" cy="16" r="5.33333" fill="white"/>
                <circle cx="16" cy="16" r="2.66667" fill="#000080"/>
                <rect y="21.3333" width="10" height="10" fill="#138808"/>
              </svg>
              <span className="text-[1.275rem] text-white font-semibold">Management queries</span>
            </div>
            <a
              href="tel:93510 09002"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-[0.375rem] text-[1.375rem] font-semibold border border-[#FF0000] text-white hover:bg-red-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z"/>
              </svg>
              +91 93510 09002
            </a>
          </div>

          {/* Technical Queries */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#E5E7EB"/>
                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" fill="#34D399"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28ZM16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z" fill="#059669"/>
              </svg>
              <span className="text-[1.275rem] text-white font-semibold">Technical queries</span>
            </div>
            <a
              href="tel:+91 83064 53222"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-[0.375rem] text-[1.375rem] font-semibold border text-white border-[#FF0000] hover:bg-red-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z"/>
              </svg>
              +91 83064 53222
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}