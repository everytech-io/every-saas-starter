export const brand = {
  // Core identity
  name: 'AeroEdit',
  tagline: 'Powerful design tools.',
  taglineSecondLine: 'Simple pricing.',
  description: 'Plans for teams of every size — from start-up to enterprise.',
  siteUrl: 'https://paddle-billing.vercel.app',
  metaDescription:
    'AeroEdit is a powerful team design collaboration app and image editor. With plans for businesses of all sizes, streamline your workflow with real-time collaboration, advanced editing tools, and seamless project management.',

  // Logo paths (relative to /public) — replace SVG files to rebrand
  logoPath: '/logo.svg',
  logoWidth: 131,
  logoHeight: 28,
  logoIconPath: '/assets/icons/logo/aeroedit-logo-icon.svg',
  logoIconWidth: 41,
  logoIconHeight: 41,
  authIconPath: '/assets/icons/logo/aeroedit-icon.svg',
  authIconWidth: 80,
  authIconHeight: 80,
  successIconPath: '/assets/icons/logo/aeroedit-success-icon.svg',
  successIconWidth: 96,
  successIconHeight: 96,

  // Used for anonymous guest account synthetic email
  anonymousEmailPrefix: 'aeroedit',
  anonymousEmailDomain: 'paddle.com',

  // Dashboard tutorial card
  tutorialCardDescription: 'Learn how to get the most out of AeroEdit tools and discover your inner artist.',

  // Pricing tier copy — descriptions and features per tier
  pricingContent: {
    starter: {
      description: 'Ideal for individuals who want to get started with simple design tasks.',
      features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
    },
    pro: {
      description: 'Enhanced design tools for scaling teams who need more flexibility.',
      features: ['Integrations', 'Unlimited workspaces', 'Advanced editing tools', 'Everything in Starter'],
    },
    advanced: {
      description: 'Powerful tools designed for extensive collaboration and customization.',
      features: [
        'Single sign on (SSO)',
        'Advanced version control',
        'Assets library',
        'Guest accounts',
        'Everything in Pro',
      ],
    },
  },
} as const;
