import type { NextConfig } from "next";

/**
 * next.config.ts - Component API Server Configuration
 *
 * Architecture:
 * - Runs in server/SSR mode for API routes and dynamic rendering
 * - NO static export (output: 'export' is commented out)
 * - Uses rewrites and headers in next.config.js for CORS handling
 * - NO middleware.ts - Uses proxy.ts approach or rewrites instead
 */

const nextConfig: NextConfig = {
  // API Server mode enabled - no static export
  // This allows API routes and dynamic rendering

  images: {
    // Allowlist remote image sources used by `next/image`.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Add headers for CORS support
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  // Rewrites for routing (no middleware.ts per AGENTS.md guidelines)
  async rewrites() {
    return {
      beforeFiles: [
        // Route /api/* to API handler functions
        // This is handled by Next.js App Router automatically
      ],
    };
  },
};

export default nextConfig;
