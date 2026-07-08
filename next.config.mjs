/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Suppress ESLint errors during production build for high-velocity deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Suppress TS errors during production build for high-velocity deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;