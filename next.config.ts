import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 画像最適化の設定
  images: {
    domains: ['images.microcms-assets.io'], // microCMSの画像ドメインを許可
    formats: ['image/webp', 'image/avif'],
  },
  // Vercelでの最適化
  experimental: {
    optimizePackageImports: ['react-markdown'],
  },
  // 静的生成の最適化
  output: 'standalone',
  // ヘッダーの設定（セキュリティとパフォーマンス向上）
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
