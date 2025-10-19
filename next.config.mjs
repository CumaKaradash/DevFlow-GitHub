/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          // Split Recharts into separate chunk (loaded only when needed)
          recharts: {
            name: "recharts",
            test: /[\\/]node_modules[\\/](recharts|d3-[\w-]+)[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
          // Split Lucide icons into separate chunk
          lucide: {
            name: "lucide",
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
          // Split date-fns into separate chunk
          dateFns: {
            name: "date-fns",
            test: /[\\/]node_modules[\\/](date-fns)[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
          // Common UI components
          ui: {
            name: "ui",
            test: /[\\/]components[\\/]ui[\\/]/,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
}

export default nextConfig
