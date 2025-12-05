import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sacred-texts.com',
      },
    ],
  },
};

export default nextConfig;
