import { NextResponse } from 'next/server';

/**
 * GET /api/health
 * Health check endpoint for API server status
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Component API Server',
    version: 'P0A-1.0',
  });
}
