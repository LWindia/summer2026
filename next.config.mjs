/** @type {import('next').NextConfig} */

const nextConfig = {
    images:{
        // Image optimization settings
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'cdn.prod.website-files.com',
              
            },
            {
              protocol: 'https',
              hostname: 'utfs.io',
  
            },

            {
              protocol: 'https',
              hostname: 'assets.aceternity.com',
  
            },

            {
              protocol: 'https',
              hostname: 'media.licdn.com',
  
            },
           
            {
              protocol: 'https',
              hostname: 'www.upgrad.com',
  
            },
            {
              protocol: 'https',
              hostname: 'hkga9exljh.ufs.sh',
  
            },
          ],
    }
};

export default nextConfig;
