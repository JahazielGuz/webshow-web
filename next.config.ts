import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating Next.js badge in the corner of every dev page. It never shipped, since it only
  // renders in development, but it sits on top of the bottom-left poster in every screenshot.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
