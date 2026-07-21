import type { NextConfig } from "next";

// Static-export mode for GitHub Pages previews:
//   NEXT_OUTPUT=export NEXT_PUBLIC_BASE_PATH=/Khusi-website npm run build
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isExport && {
    output: "export",
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined
  })
};

export default nextConfig;
