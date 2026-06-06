/**
 * API Type Definitions
 * Centralized type definitions for all API responses
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}

export interface ComponentMetadata {
  id: string;
  name: string;
  path: string;
  description: string;
  category: 'sections' | 'navigation' | 'layout' | 'content' | 'notifications';
  props?: Record<string, PropDefinition>;
  imports?: string[];
  used_in?: string[];
  render?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface PropDefinition {
  type: string;
  required?: boolean;
  default?: any;
  enum?: string[] | number[];
  range?: [number, number];
  description?: string;
}

export interface ComponentCodeSnippet {
  component: string;
  language: 'typescript' | 'javascript';
  code: string;
}

export interface ComponentRegistry {
  [key: string]: ComponentMetadata;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  service: string;
  version: string;
  uptime?: number;
}

export interface ServerConfig {
  name: string;
  version: string;
  environment: string;
  timestamp: string;
  endpoints: Record<string, string>;
  cors: {
    enabled: boolean;
    allowOrigins: string[];
  };
}
