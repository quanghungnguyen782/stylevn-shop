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
    // Capped below the defaults (which go up to 3840) — the layout never
    // renders wider than 1440px, so larger buckets only add transcode/
    // transfer cost (a major LCP cost for the full-bleed Hero image) with
    // no visible benefit.
    deviceSizes: [375, 430, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
