import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  experimental: { cpus: 2 },
};
export default config;
