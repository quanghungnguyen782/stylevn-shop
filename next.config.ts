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
    // Render's free-tier web service only gets ~0.1 vCPU, which makes the
    // on-demand resize/re-encode behind /_next/image (sharp) take 1-3s per
    // image — even on a cache hit. Serving the original CDN images
    // unoptimized (no resize step at all) is far faster there in practice;
    // revisit if this ever runs on a plan with real CPU.
    unoptimized: true,
  },
};

export default nextConfig;
