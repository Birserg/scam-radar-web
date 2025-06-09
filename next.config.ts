import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';

// Repository name for GitHub Pages
const repoName = 'scam-radar-web';

// Configure base path for GitHub Pages only
const basePath = isProd && isGitHubPages ? `/${repoName}` : '';
const assetPrefix = isProd && isGitHubPages ? `/${repoName}/` : '';

const nextConfig: NextConfig = {
  output: 'export', // Always static export
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
