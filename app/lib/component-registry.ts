/**
 * Component Registry
 * Centralized registry for all available components
 */

import type { ComponentMetadata } from './api-types';

export const componentRegistry: Record<string, ComponentMetadata> = {
  hero: {
    id: 'hero',
    name: 'AnimatedHero',
    path: '@/components/AnimatedHero',
    description: 'Animated hero section with smooth transitions and CTAs',
    category: 'sections',
    props: {
      title: {
        type: 'string',
        required: true,
        description: 'Main headline text',
      },
      subtitle: {
        type: 'string',
        required: false,
        description: 'Subheading text',
      },
      ctaText: {
        type: 'string',
        required: false,
        default: 'Get Started',
      },
      animated: {
        type: 'boolean',
        required: false,
        default: true,
      },
    },
    imports: ['framer-motion', 'lucide-react'],
    used_in: ['HomePage'],
  },

  navbar: {
    id: 'navbar',
    name: 'BrandNavbar',
    path: '@/components/brand-navbar',
    description: 'Navigation bar with brand styling and responsive menu',
    category: 'navigation',
    props: {
      sticky: {
        type: 'boolean',
        default: true,
        description: 'Make navbar stick to top when scrolling',
      },
      transparent: {
        type: 'boolean',
        default: false,
        description: 'Use transparent background',
      },
      brand: {
        type: 'string',
        default: 'Microtronic',
        description: 'Brand name to display',
      },
    },
    render: {
      brand: 'Microtronic Thailand',
      badge: 'Donation & Payment',
      subtitle: 'Support creators and communities with secure micro donations.',
      actionLabel: 'Micro Donate & Payment',
      actionHref: 'https://microtronic-thailand.github.io/micro-payment/',
    },
    imports: ['lucide-react'],
    used_in: ['Layout', 'HomePage'],
  },

  footer: {
    id: 'footer',
    name: 'Footer',
    path: '@/components/Footer',
    description: 'Footer component with links, social media, and copyright',
    category: 'layout',
    props: {
      variant: {
        type: 'string',
        enum: ['light', 'dark'],
        default: 'dark',
      },
      showSocial: {
        type: 'boolean',
        default: true,
      },
      showLinks: {
        type: 'boolean',
        default: true,
      },
    },
    render: {
      description: 'Official donation and payments portal for creators and social projects. Stay connected through secure micro-donations and modern payment flows.',
      legalLinks: [
        {
          label: 'Privacy Policy',
          href: 'https://microtronic-thailand.github.io/privacy-policy/?lang=en',
        },
        {
          label: 'Terms of Service',
          href: 'https://microtronic-thailand.github.io/terms-conditions/',
        },
      ],
      contactLinks: [
        {
          label: 'Official Website',
          href: 'https://microtronic.biz/',
        },
        {
          label: 'Email: grids@microtronic.biz',
          href: 'mailto:grids@microtronic.biz',
        },
      ],
      socialLinks: [
        {
          label: 'Facebook',
          href: 'https://www.facebook.com/MicrotronicTH',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/microtronic-thailand',
        },
        {
          label: 'Discord',
          href: 'https://discord.gg/ZBu8ARCW',
        },
        {
          label: 'LINE',
          href: 'https://lin.ee/nHRMd36',
        },
        {
          label: 'Email',
          href: 'mailto:grids@microtronic.biz',
        },
      ],
    },
    used_in: ['Layout'],
  },

  gallery: {
    id: 'gallery',
    name: 'GalleryShowcase',
    path: '@/components/gallery-showcase',
    description: 'Gallery/showcase component for displaying images or properties',
    category: 'content',
    props: {
      items: {
        type: 'array',
        required: true,
        description: 'Array of gallery items with id, title, image',
      },
      columns: {
        type: 'number',
        default: 3,
        range: [1, 4],
        description: 'Number of columns (1-4)',
      },
      animated: {
        type: 'boolean',
        default: true,
      },
      gap: {
        type: 'string',
        enum: ['small', 'medium', 'large'],
        default: 'medium',
      },
    },
    imports: ['framer-motion', 'lucide-react'],
    used_in: ['HomePage'],
  },

  cookieBanner: {
    id: 'cookieBanner',
    name: 'CookieBanner',
    path: '@/components/CookieBanner',
    description: 'GDPR/PDPA compliant cookie notice banner',
    category: 'notifications',
    props: {
      position: {
        type: 'string',
        enum: ['bottom', 'top'],
        default: 'bottom',
      },
      variant: {
        type: 'string',
        enum: ['light', 'dark'],
        default: 'dark',
      },
      onAccept: {
        type: 'function',
        description: 'Callback when user accepts cookies',
      },
      onReject: {
        type: 'function',
        description: 'Callback when user rejects cookies',
      },
    },
    imports: ['react'],
    used_in: ['Layout'],
  },

  propertyGrid: {
    id: 'propertyGrid',
    name: 'PropertyGrid',
    path: '@/components/property-grid',
    description: 'Grid display for properties with filtering',
    category: 'content',
    props: {
      properties: {
        type: 'array',
        required: true,
      },
      filter: {
        type: 'string',
        default: 'all',
      },
    },
    imports: ['lucide-react'],
    used_in: ['HomePage'],
  },

  bookingSection: {
    id: 'bookingSection',
    name: 'BookingSection',
    path: '@/components/booking-section',
    description: 'Booking/reservation component',
    category: 'sections',
    props: {
      title: {
        type: 'string',
        default: 'Book Now',
      },
    },
    imports: ['framer-motion'],
    used_in: ['HomePage'],
  },
};

/**
 * Get component by ID
 */
export function getComponent(id: string): ComponentMetadata | undefined {
  return componentRegistry[id];
}

/**
 * Get all components
 */
export function getAllComponents(): ComponentMetadata[] {
  return Object.values(componentRegistry);
}

/**
 * Get components by category
 */
export function getComponentsByCategory(
  category: ComponentMetadata['category']
): ComponentMetadata[] {
  return Object.values(componentRegistry).filter((c) => c.category === category);
}

/**
 * Get component count
 */
export function getComponentCount(): number {
  return Object.keys(componentRegistry).length;
}
