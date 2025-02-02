import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'cdn-images.dzcdn.net', // Deezer CDN
      'e-cdns-images.dzcdn.net', // Alternative Deezer CDN
      'wxyzxkgugqfofypuzeth.supabase.co', // Supabase storage
      'avatars.githubusercontent.com', // GitHub avatars
      'lh3.googleusercontent.com', // Google avatars
    ],
  },
};

export default nextConfig;
