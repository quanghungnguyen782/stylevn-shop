import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bizweb.dktcdn.net" },
      { protocol: "https", hostname: "product.hstatic.net" },
      { protocol: "https", hostname: "cdn.hstatic.net" },
      { protocol: "https", hostname: "assets.adidas.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
    ],
  },
};

export default nextConfig;
