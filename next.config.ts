import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  basePath: "",
};

export default nextConfig;
