import { NextResponse, NextRequest } from 'next/server';
import { getComponent } from '@/lib/component-registry';
import type { ApiResponse } from '@/lib/api-types';

/**
 * GET /api/components/[slug]
 * Get specific component definition by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const component = getComponent(slug);

  if (!component) {
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Component not found',
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const response: ApiResponse = {
    success: true,
    data: {
      component: component,
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
