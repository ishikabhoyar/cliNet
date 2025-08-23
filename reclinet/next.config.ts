import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 🚀 disables ESLint in builds
  },
  typescript: {
    ignoreBuildErrors: true, // 🚀 disables TS checks in builds
  },
};

export default nextConfig;
