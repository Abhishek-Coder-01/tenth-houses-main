/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* Static export: `npm run build` writes a fully deployable site to ./out
     (GitHub Pages, Netlify, any static host — no Node server required). */
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
