import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steve-p.org',
      },
    ],
  },
  // reactStrictMode: false
};

export default nextConfig;
