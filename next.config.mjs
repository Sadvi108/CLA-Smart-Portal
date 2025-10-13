/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use a different build directory to avoid Windows permission issues with .next\trace
  // This helps resolve EPERM errors when the default .next folder becomes locked.
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
