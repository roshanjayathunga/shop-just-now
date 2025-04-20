/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/shop-just-now" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/shop-just-now/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
