import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGhPages ? "/template-discovery" : "";

const nextConfig: NextConfig = {
  output: isGhPages ? "export" : undefined,
  basePath,
  assetPrefix: isGhPages ? "/template-discovery/" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
