import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    disableStaticImages: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
