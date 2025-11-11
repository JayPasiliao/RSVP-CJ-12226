/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Next.js 16+ optimizations
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

