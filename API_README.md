# API Component Server (P0A-API)

## Overview

This is a production-ready API server built with **Next.js 16** that provides component definitions, metadata, and code snippets for the Microtronic Thailand component library.

## Architecture

- **Framework**: Next.js 16.2.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **API Route**: `/app/api/*`
- **No Middleware**: Uses `next.config.ts` rewrites and headers for CORS (per AGENTS.md guidelines)
- **Server Mode**: SSR enabled (no static export)

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and timestamp.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2026-06-06T10:00:00Z",
  "service": "Component API Server",
  "version": "P0A-1.0"
}
```

### List All Components
```
GET /api/components
```
Returns list of all available components with basic metadata.

**Response**:
```json
{
  "success": true,
  "components": {
    "hero": { "name": "AnimatedHero", "path": "@/components/AnimatedHero", ... },
    "navbar": { "name": "BrandNavbar", "path": "@/components/brand-navbar", ... },
    ...
  },
  "total": 5
}
```

### Get Component Details
```
GET /api/components/{slug}
```
Returns detailed metadata for a specific component.

**Example**: `/api/components/hero`

**Response**:
```json
{
  "success": true,
  "component": {
    "id": "hero",
    "name": "AnimatedHero",
    "path": "@/components/AnimatedHero",
    "description": "Animated hero section with smooth transitions and CTAs",
    "category": "sections",
    "props": { ... },
    "imports": ["framer-motion", "lucide-react"],
    "used_in": ["HomePage"]
  }
}
```

### Get Component Code
```
GET /api/components/{slug}/code
```
Returns TypeScript code snippet for integrating a component.

**Example**: `/api/components/hero/code`

**Response**:
```json
{
  "success": true,
  "component": "hero",
  "language": "typescript",
  "code": "import AnimatedHero from '@/components/AnimatedHero';\n..."
}
```

### Server Configuration
```
GET /api/config
```
Returns server configuration and available endpoints.

## Available Components

| Component | Slug | Category | Description |
|-----------|------|----------|-------------|
| AnimatedHero | `hero` | sections | Animated hero section with smooth transitions |
| BrandNavbar | `navbar` | navigation | Navigation bar with brand styling |
| Footer | `footer` | layout | Footer with links and social media |
| GalleryShowcase | `gallery` | content | Gallery/showcase component |
| CookieBanner | `cookieBanner` | notifications | GDPR/PDPA compliant cookie notice |

## Setup & Installation

### Prerequisites
- Node.js 18+
- pnpm (package manager)

### Installation Steps

```bash
# Navigate to project directory
cd next16-P0A-API

# Install dependencies using pnpm
pnpm install

# Create .env.local if needed
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```env
# Server Configuration
NODE_ENV=development
NEXT_PUBLIC_API_URL=https://next16-p0-a-api.vercel.app

# CORS Settings (if needed)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://microtronic.biz,https://next16-p0-a-api.vercel.app
```

## Running the Server

### Development Mode
```bash
pnpm dev
```
Server runs at `http://localhost:3000` (or next available port). In production, the API is available at `https://next16-p0-a-api.vercel.app`.

### Production Build
```bash
pnpm build
pnpm start
```

### Health Check
```bash
curl https://next16-p0-a-api.vercel.app/api/health
```

## CORS Configuration

CORS headers are configured in `next.config.ts`:

- **Allowed Methods**: GET, OPTIONS, PATCH, DELETE, POST, PUT
- **Allowed Headers**: Content-Type, Authorization, X-Api-Version
- **Credentials**: Enabled

All `/api/*` routes include CORS headers automatically.

## Architecture Notes

### No Middleware
Per project guidelines (AGENTS.md), this project does **NOT** use `middleware.ts`. Instead:
- CORS headers are defined in `next.config.ts` under `headers()` function
- Request routing is handled through Next.js App Router
- Static redirects/rewrites use the `rewrites()` function in `next.config.ts`

### Authentication & Authorization
- Currently no authentication required for API endpoints
- In future versions, authentication can be implemented at the Route Handler level
- All security checks should happen in Server Components or Route Handlers, not at the edge

## File Structure

```
app/
  api/
    health/
      route.ts           # Health check endpoint
    components/
      route.ts           # List all components
      [slug]/
        route.ts         # Get component details
        code/
          route.ts       # Get component code snippet
    config/
      route.ts           # Server configuration
  page.tsx               # API documentation homepage
  layout.tsx             # Root layout
  globals.css            # Global styles with Tailwind v4 @theme
```

## Dependencies

- **next**: ^16.2.7 - Framework
- **react**: 19.2.4 - UI library
- **react-dom**: 19.2.4 - DOM rendering
- **framer-motion**: 12.40.0 - Animations
- **lucide-react**: ^1.17.0 - Icons
- **tailwindcss**: ^4 - Styling
- **typescript**: ^5 - Type safety

## Development Guidelines

1. **API Routes**: Place route handlers in `/app/api/[path]/route.ts`
2. **Type Safety**: Use TypeScript for all code
3. **Response Format**: Always return structured JSON with `success` flag
4. **Error Handling**: Return appropriate HTTP status codes
5. **Documentation**: Keep this README updated with new endpoints

## Example Usage

### JavaScript/TypeScript Client
```typescript
// Fetch all components
const response = await fetch('https://next16-p0-a-api.vercel.app/api/components');
const data = await response.json();

// Get specific component
const heroComponent = await fetch('https://next16-p0-a-api.vercel.app/api/components/hero');
const heroData = await heroComponent.json();

// Get component code
const code = await fetch('https://next16-p0-a-api.vercel.app/api/components/hero/code');
const codeData = await code.json();
console.log(codeData.code);
```

## Deployment

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## Support & Contact

- **Email**: grids@microtronic.biz
- **GitHub**: https://github.com/microtronic-thailand
- **Discord**: https://discord.gg/ZBu8ARCW
- **Website**: https://microtronic.biz

## License

© 2026 Microtronic Thailand. All rights reserved.

---

**Last Updated**: June 6, 2026
**Version**: P0A-1.0
