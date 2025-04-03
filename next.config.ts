import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ['myapp-profile-pictures.s3.ap-northeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig;

export default nextConfig;
