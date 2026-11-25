/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    ...(process.platform === "android" ? { useWasmBinary: true } : {}),
  },
};

export default nextConfig;
