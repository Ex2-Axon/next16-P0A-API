'use client';

import { Code2, Zap, Shield, BookOpen, GitBranch } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/health',
      description: 'Health check endpoint - verify server status',
    },
    {
      method: 'GET',
      path: '/api/components',
      description: 'List all available components',
    },
    {
      method: 'GET',
      path: '/api/components/[slug]',
      description: 'Get specific component definition and metadata',
    },
    {
      method: 'GET',
      path: '/api/components/[slug]/code',
      description: 'Get code snippet for a component',
    },
  ];

  const components = [
    { id: 'hero', name: 'AnimatedHero', description: 'Animated hero section' },
    { id: 'navbar', name: 'BrandNavbar', description: 'Navigation bar' },
    { id: 'footer', name: 'Footer', description: 'Footer component' },
    { id: 'gallery', name: 'GalleryShowcase', description: 'Gallery showcase' },
    { id: 'cookieBanner', name: 'CookieBanner', description: 'Cookie notice' },
  ];

  const apiOrigin = process.env.NEXT_PUBLIC_API_URL ?? 'https://next16-p0-a-api.vercel.app';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-emerald-400">
            <Zap size={16} />
            Component API Server
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
            P0A API Server
          </h1>
          <p className="text-xl text-slate-300">
            RESTful API for component definitions, metadata, and code snippets
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Code2,
              title: 'Component Registry',
              description: 'Access definitions for all available components',
            },
            {
              icon: BookOpen,
              title: 'API Documentation',
              description: 'Complete metadata and usage examples',
            },
            {
              icon: Shield,
              title: 'Production Ready',
              description: 'Built with Next.js 16 and TypeScript',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 backdrop-blur"
            >
              <feature.icon className="mb-4 text-emerald-400" size={24} />
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">API Endpoints</h2>
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="inline-flex items-center rounded bg-emerald-500/20 px-2 py-1 text-xs font-mono font-semibold text-emerald-400">
                    {endpoint.method}
                  </span>
                  <code className="font-mono text-sm text-slate-300">{endpoint.path}</code>
                </div>
                <p className="text-sm text-slate-400">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Available Components */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Available Components</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {components.map((comp) => (
              <Link
                key={comp.id}
                href={`/api/components/${comp.id}`}
                className="group rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur transition-all hover:border-emerald-400 hover:bg-slate-800"
              >
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {comp.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{comp.description}</p>
                <p className="mt-3 text-xs font-mono text-slate-500">
                  GET /api/components/{comp.id}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-16 rounded-lg border border-slate-700 bg-slate-800/50 p-8 backdrop-blur">
          <h2 className="mb-4 text-2xl font-bold">Quick Start</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-semibold text-slate-300">1. Get all components:</p>
              <code className="block rounded bg-slate-900 p-3 font-mono text-sm text-emerald-400">
                curl {apiOrigin}/api/components
              </code>
            </div>
            <div>
              <p className="mb-2 font-semibold text-slate-300">2. Get specific component:</p>
              <code className="block rounded bg-slate-900 p-3 font-mono text-sm text-emerald-400">
                curl {apiOrigin}/api/components/hero
              </code>
            </div>
            <div>
              <p className="mb-2 font-semibold text-slate-300">3. Get component code:</p>
              <code className="block rounded bg-slate-900 p-3 font-mono text-sm text-emerald-400">
                curl {apiOrigin}/api/components/hero/code
              </code>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="mb-4 text-slate-400">
            Serving component definitions for Microtronic Thailand
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/microtronic-thailand"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <GitBranch size={20} />
              GitHub
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="mailto:grids@microtronic.biz"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
