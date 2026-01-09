import type { Metadata } from "next";
import React from "react";
import Script from "next/script";
import localFont from "next/font/local";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import Footer2 from "@/components/customComponents/Footer2";
import Footer3 from "@/components/Footer3";
import WhatsAppBot from "@/components/customComponents/Whatsapp/Whatsapp";
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const khandFont = localFont(
  {
    src: './fonts/Khand-SemiBold.woff',
    weight: '100 900',
  }

)

// https://www.thecreator.one/
export const metadata: Metadata = {
  title: "Summer Internship & Industry Training Program 2026 | Jaipur, India",
  description: "Join our Project-Based Summer Internship & Training Program 2026 in Jaipur, India. Gain hands-on experience, live projects, and industry-ready skills",
  icons: {
    icon: '/assets/logo2.webp',
    shortcut: '/assets/logo2.webp',
    apple: '/assets/logo2.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${khandFont.className}  bg-black overflow-x-hidden antialiased`}
      >
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RH7RW5EHGZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RH7RW5EHGZ');
          `}
        </Script>

        <div className="overflow-x-hidden">
        <Navbar/>
        {children}
        <WhatsAppBot/>
        {/* <Footer/> */}
        <Footer3/>
        {/* <Footer2/> */}
        </div>
      </body>
    </html>
  );
}
