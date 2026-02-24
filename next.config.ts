import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGhPages ? "export" : undefined,
  basePath: isGhPages ? "/template-discovery" : "",
  assetPrefix: isGhPages ? "/template-discovery/" : undefined,
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
