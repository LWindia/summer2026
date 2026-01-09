"use client";

import React, { useState, useEffect, useRef } from "react";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LOGO from "../../../public/assets/logo2.webp";
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // Import Link from next/link

// Navigation Items
const NAV_ITEMS = [
  { href: "#Projects", text: "Projects" },

  { href: "#Placement", text: "Placement" },
  // { href: "#JAZBAA", text: "JAZBAA" },
  { href: "#Preivous", text: "Previous Summer" },
];

// Route Configuration
interface RouteConfig {
  buttonText: string;
}

const ROUTE_CONFIG: Record<string, RouteConfig> = {
  '/students': {
    buttonText: 'Enquire Now'
  },
  'default': {
    buttonText: 'Enquire Now'
  }
};

// Animation Variants
const menuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getRouteConfig = (currentPath: string): RouteConfig => {
    return ROUTE_CONFIG[currentPath] || ROUTE_CONFIG.default;
  };

  const { buttonText } = getRouteConfig(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // const handleEnquiryClick = () => {
  //   router.push('/application-form');
  //   closeMobileMenu();
  // };

  return (
    <header
      className={cn(
        "sticky top-0 z-50  w-full transition-colors duration-300",
        scrolled ? "bg-black shadow-lg" : "bg-black"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={LOGO}
            alt="Logo"
            width={96}
            height={18}
            className="object-contain overflow-hidden"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <ul className="flex space-x-6">
            {NAV_ITEMS.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-white hover:text-[#ff0000] transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.text}
                </a>
              
              </li>
            ))}
              <a
                  href="/application-form"
                  className="text-white hover:text-[#ff0000] transition-colors duration-200"
                 
                >
                  Apply Now
                </a>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-white hover:text-[#ff0000] transition-colors duration-200"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <List className="h-6 w-6" />
          )}
        </button>

        {/* Desktop CTA Button */}
        <Link
          href="#query"
          className="hidden lg:block bg-[#ff0000] text-white px-6 py-2 rounded-lg hover:bg-[#ff0000]/90 hover:shadow-lg transition-all duration-300 text-center"
        >
          {buttonText}
        </Link>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute right-4 top-full bg-black w-64 shadow-lg z-10 rounded-lg border border-gray-800"
          >
            <div className="p-4">
              <ul className="space-y-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="block text-white hover:text-[#ff0000] transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              {/* Mobile CTA Button */}
              <Link
                href="/application-form"
                className="block w-full mt-6 bg-[#ff0000] text-white px-4 py-2 rounded-lg hover:bg-[#ff0000]/90 hover:shadow-lg transition-all duration-300 text-center"
                onClick={closeMobileMenu}
              >
                {buttonText}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;