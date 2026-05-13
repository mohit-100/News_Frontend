// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       { protocol: 'https', hostname: 'images.unsplash.com' },
//       { protocol: 'https', hostname: 'via.placeholder.com' },
//       { protocol: 'https', hostname: 'picsum.photos' },
//       { protocol: 'https', hostname: '**.amazonaws.com' },
//       { protocol: 'https', hostname: '**.cloudinary.com' },
//     ],
//   },
//   experimental: {
//     optimizePackageImports: ['lucide-react', 'framer-motion'],
//   },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;