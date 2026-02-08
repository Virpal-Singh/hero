/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize image handling
  images: {
    unoptimized: true, // Since we're using canvas, we don't need Next.js image optimization
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
}

module.exports = nextConfig
