/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;