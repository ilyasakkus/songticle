/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn-images.dzcdn.net',
      'lh3.googleusercontent.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig 