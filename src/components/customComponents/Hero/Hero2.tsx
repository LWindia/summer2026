import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BsCalendarCheck } from "react-icons/bs";
import { AiOutlineHourglass } from "react-icons/ai";
import { Album, ShieldCheck } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  query: string;
}

const Hero2 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    query: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      setSubmitStatus("success");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        query: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="h-full mx-auto w-full">
      <div className="hidden md:flex lg:flex w-full">
        <div className="w-2/3">
          <img className="w-full h-full object-cover" src="/assets/Hero/hero-section2026.jpg" alt="Hero" />
        </div>

        <div className="w-1/3 flex items-center justify-center pr-8">
          <div className="bg-black border-2 border-white p-6 rounded-lg shadow-lg w-full relative z-10">
            <h2 className="text-2xl mb-4 text-center text-white">Contact Us</h2>

            {submitStatus === "success" && (
              <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                Thank you! Your query has been submitted.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
                Error submitting form. Please try again.
              </div>
            )}

            <div className="space-y-3">
              <div>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                  aria-label="Full Name"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                  aria-label="Email Address"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  maxLength={10}
                  className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                  aria-label="Phone Number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <Input
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                aria-label="College Name"
              />

              <Input
                type="text"
                name="query"
                placeholder="Your Query"
                value={formData.query}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white min-h-[80px]"
                aria-label="Your Query"
              />

              <div className="flex justify-center md:block">
                <div className="flex flex-col items-center justify-center w-fit md:w-full">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-fit md:w-full bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer border border-white font-semibold text-base py-5 md:py-6 px-6 md:px-8 min-h-[48px] md:min-h-[48px] shadow-md"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Query'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-row-2 md:hidden lg:hidden sm:block">
        <div className="mb-2 relative w-full h-auto">
          <Image src="/assets/Hero/hero-section2026.jpg" alt="Hero" width={1200} height={600} className="w-full h-auto" />
        </div>
      </div>

      <div className="relative md:-mt-12 lg:-mt-4 z-30 px-4 md:px-0">
        <div className="bg-black rounded-lg p-5 md:p-8 shadow-lg max-w-6xl border-2 border-white mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full">
              {/* Admission Section */}
              <div className="flex items-start gap-4 md:gap-3 justify-start min-w-0 md:min-w-[250px]">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-10 md:h-10 bg-red-50 rounded-lg">
                  <BsCalendarCheck className="w-7 h-7 md:w-6 md:h-6 text-[#ff0000]" />
                </div>
                <div className="flex flex-col flex-grow min-w-0">
                  <span className="text-white text-base md:text-sm font-semibold uppercase tracking-wide">
                    TENTATIVE START DATES
                  </span>
                  <span className="font-bold text-base md:text-sm text-white mt-2 md:mt-1.5">
                    May 2026 / June 2026 / July 2026
                  </span>
                  <Badge variant="outline" className="text-[#ff0000] border-red-200 text-sm md:text-xs mt-3 md:mt-2 w-fit">
                    Limited seats
                  </Badge>
                </div>
              </div>

              {/* Duration Section */}
              <div className="flex items-start gap-4 md:gap-3 justify-start min-w-0 md:min-w-[250px]">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-10 md:h-10 bg-red-50 rounded-lg">
                  <AiOutlineHourglass className="w-7 h-7 md:w-6 md:h-6 text-[#ff0000]" />
                </div>
                <div className="flex flex-col flex-grow min-w-0">
                  <span className="text-white text-base md:text-sm font-semibold uppercase tracking-wide">
                    DURATION SUMMER PROGRAM​
                  </span>
                  <span className="font-bold text-base md:text-sm text-white mt-2 md:mt-1.5">
                    6 weeks / 8 weeks
                  </span>
                </div>
              </div>

              {/* Internship Section */}
              <div className="flex items-start gap-4 md:gap-3 justify-start min-w-0 md:min-w-[250px]">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-10 md:h-10 bg-red-50 rounded-lg">
                  <Album className="w-7 h-7 md:w-6 md:h-6 text-[#ff0000]" />
                </div>
                <div className="flex flex-col flex-grow min-w-0">
                  <span className="text-white text-base md:text-sm font-semibold uppercase tracking-wide">
                    Internship ​
                  </span>
                  <span className="font-bold text-base md:text-sm text-white mt-2 md:mt-1.5 leading-relaxed md:leading-tight">
                    Industry Recognised Internship (Project) Certificate
                  </span>
                </div>
              </div>

              {/* Training Certificate Section */}
              <div className="flex items-start gap-4 md:gap-3 justify-start min-w-0 md:min-w-[250px]">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-10 md:h-10 bg-red-50 rounded-lg">
                  <ShieldCheck className="w-7 h-7 md:w-6 md:h-6 text-[#ff0000]" />
                </div>
                <div className="flex flex-col flex-grow min-w-0">
                  <span className="text-white text-base md:text-sm font-semibold uppercase tracking-wide">
                    Training Certificate
                  </span>
                  <span className="font-bold text-base md:text-sm text-white mt-2 md:mt-1.5 leading-relaxed md:leading-tight">
                    Training Certificate from 
                    <br></br>
                    LinuxWorld Informatics Pvt Ltd
                  </span>
                </div>
              </div>
            </div>

            {/* Button Section */}
            <div className="flex items-center justify-center lg:border-l lg:pl-6 w-full lg:w-auto mt-6 lg:mt-0">
              <div className="flex flex-col items-center justify-center w-full lg:w-auto">
                <a href="/application-form" target="_blank" rel="noopener noreferrer" className="w-auto lg:w-auto">
                  <Button className="bg-[#ff0000] w-auto lg:w-auto text-base md:text-base font-bold py-5 md:py-6 px-6 md:px-8 hover:bg-[#ff0000]/90 hover:shadow-lg transition-all duration-300 min-h-[48px] md:min-h-[48px]">
                    Apply Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;