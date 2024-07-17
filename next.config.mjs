/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
