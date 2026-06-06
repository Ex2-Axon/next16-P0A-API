import { NextResponse } from 'next/server';
import { getAllComponents, getComponentCount } from '@/lib/component-registry';
import type { ApiResponse } from '@/lib/api-types';

/**
 * GET /api/components
 * List all available components
 */
export async function GET() {
  const components = getAllComponents();
  const total = getComponentCount();

  const response: ApiResponse = {
    success: true,
    data: {
      components: components,
      total: total,
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}

