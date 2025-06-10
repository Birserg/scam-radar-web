import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';

// Repository name for GitHub Pages
const repoName = 'scam-radar-web';

// Configure base path for GitHub Pages only
const basePath = isProd && isGitHubPages ? `/${repoName}` : '';
const assetPrefix = isProd && isGitHubPages ? `/${repoName}/` : '';

const nextConfig: NextConfig = {
  output: 'export', // Always use static export for consistency
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'], // Prefer modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Note: Custom headers are not supported with static export
  // Security headers would need to be configured at the web server level (GitHub Pages, Vercel, etc.)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Webpack optimizations for bundle size reduction
  webpack: (config, { dev, isServer }) => {
    // Only in production
    if (!dev && !isServer) {
      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Bundle splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    // Bundle analyzer (uncomment to analyze)
    // if (process.env.ANALYZE === 'true') {
    //   const BundleAnalyzerPlugin = require('@next/bundle-analyzer')({
    //     enabled: true
    //   });
    //   config.plugins.push(BundleAnalyzerPlugin);
    // }

    return config;
  },
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
};

export default nextConfig;
