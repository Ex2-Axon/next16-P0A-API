import { NextResponse, NextRequest } from 'next/server';

/**
 * GET /api/config
 * Get server configuration and CORS settings
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    config: {
      name: 'P0A Component API Server',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/api/health',
        components: '/api/components',
        componentDetail: '/api/components/[slug]',
        componentCode: '/api/components/[slug]/code',
        config: '/api/config',
      },
      cors: {
        enabled: true,
        allowOrigins: [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:5173',
          'https://microtronic.biz',
          'https://microtronic-thailand.github.io',
        ],
      },
    },
  });
}
