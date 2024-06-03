/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.yourprint.in",
      "*",
      "encrypted-tbn0.gstatic.com",
      "i.pinimg.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
