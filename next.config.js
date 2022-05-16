/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
