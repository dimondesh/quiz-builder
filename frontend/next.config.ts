import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Отключаем проблемные source maps в SSR
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
};

export default nextConfig;
