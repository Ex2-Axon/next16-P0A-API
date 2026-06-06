import { NextResponse, NextRequest } from 'next/server';

const codeSnippets: Record<string, string> = {
  hero: `import AnimatedHero from '@/components/AnimatedHero';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <AnimatedHero 
      title="Welcome to Our Platform"
      subtitle="Built with Next.js and Tailwind CSS"
      animated={true}
    />
  );
}`,

  navbar: `import BrandNavbar from '@/components/brand-navbar';

export default function Header() {
  return (
    <BrandNavbar 
      sticky={true}
      transparent={false}
    />
  );
}`,

  footer: `import Footer from '@/components/Footer';

export default function PageFooter() {
  return (
    <Footer variant="dark" />
  );
}`,

  gallery: `import GalleryShowcase from '@/components/gallery-showcase';

export default function Gallery() {
  const items = [
    { id: 1, title: 'Item 1', image: '/images/1.jpg' },
    { id: 2, title: 'Item 2', image: '/images/2.jpg' },
    { id: 3, title: 'Item 3', image: '/images/3.jpg' },
  ];

  return (
    <GalleryShowcase 
      items={items}
      columns={3}
      animated={true}
    />
  );
}`,

  cookieBanner: `import CookieBanner from '@/components/CookieBanner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieBanner 
          position="bottom"
          variant="dark"
        />
      </body>
    </html>
  );
}`,
};

/**
 * GET /api/components/[slug]/code
 * Get code snippet for a component
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!codeSnippets[slug]) {
    return NextResponse.json(
      { error: 'Code snippet not found for component', slug },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    component: slug,
    language: 'typescript',
    code: codeSnippets[slug],
  });
}
