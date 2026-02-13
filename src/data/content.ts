/* =========================================
   Content Data — extracted from copy.md
   Each section is a named export with proper
   TypeScript interfaces.
   ========================================= */

// -----------------------------------------
// Navigation
// -----------------------------------------

export interface NavItem {
  label: string
  href: string
}

export interface Navigation {
  items: NavItem[]
  cta: { label: string; href: string }
}

export const navigation: Navigation = {
  items: [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Results', href: '#results' },
    { label: 'Process', href: '#process' },
    { label: 'Security', href: '#security' },
  ],
  cta: { label: 'BOOK A CALL', href: '#contact' },
}

// -----------------------------------------
// Hero
// -----------------------------------------

export interface HeroCta {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'tertiary'
}

export interface HeroContent {
  eyebrow: string
  headline: string
  subheadline: string
  ctas: HeroCta[]
}

export const hero: HeroContent = {
  eyebrow: 'Data infrastructure for growth-stage companies',
  headline: 'Your data.\nFinally handled.',
  subheadline:
    'We connect your scattered data sources, build your warehouse, and keep everything running — so you can focus on growing your business.',
  ctas: [
    { label: 'Book a 30-Minute Intro Call', href: '#contact', variant: 'primary' },
    { label: 'Take Our Diagnostic', href: '#diagnostic', variant: 'secondary' },
  ],
}

// -----------------------------------------
// Trust Bar
// -----------------------------------------

export interface TrustBar {
  label: string
  clients: string[]
  microStat: string
}

export const trustBar: TrustBar = {
  label: 'Powering analytics for growing companies',
  clients: ['SayHi', 'Busy Kid', '3Way Marketing', 'Sourcefin', 'DataFirst'],
  microStat: '50M+ rows synced daily across 12 industries',
}

// -----------------------------------------
// Problem Section
// -----------------------------------------

export interface PainPoint {
  headline: string
  body: string
}

export interface ProblemSection {
  headline: string
  painPoints: PainPoint[]
  transition: string
}

export const problem: ProblemSection = {
  headline: 'Sound familiar?',
  painPoints: [
    {
      headline: 'Is your data scattered across dozens of disconnected tools?',
      body: 'Sales in Salesforce. Marketing in HubSpot. Finance in spreadsheets. Getting a single view of your business means hours of manual work every week.',
    },
    {
      headline: "Are AI vendors asking for 'clean data' you don't have?",
      body: "You've heard the promise: AI will transform your business. But every vendor wants unified data you simply don't have. Your AI projects stall before they start.",
    },
    {
      headline: 'Did the enterprise data platform quote make you close the tab?',
      body: "You got the Snowflake + Fivetran quote. R50K/month before you've moved a single row. These tools are built for companies with data teams — not companies that need one.",
    },
  ],
  transition:
    "You're not alone. Most mid-market companies hit this wall. You need real data infrastructure — without hiring a data team to run it.",
}

// -----------------------------------------
// Solution Section
// -----------------------------------------

export interface Product {
  name: string
  tagline: string
  description: string
}

export interface SolutionSection {
  headline: string
  subheadline: string
  products: Product[]
}

export const solution: SolutionSection = {
  headline: 'How your data flows through Hyper',
  subheadline:
    'HyperFlow and HyperStore work together to consolidate your data, make it analytics-ready, and power the dashboards and AI tools that drive growth.',
  products: [
    {
      name: 'HyperFlow',
      tagline: 'Connect & Sync',
      description:
        'Connects to your existing tools — CRMs, ERPs, spreadsheets, databases — and keeps everything syncing reliably.',
    },
    {
      name: 'HyperStore',
      tagline: 'Store & Query',
      description:
        'A fully managed data warehouse designed for analytics. We handle the architecture, hosting, and optimization.',
    },
  ],
}

// -----------------------------------------
// How It Works / Process
// -----------------------------------------

export interface Stage {
  phase: string
  headline: string
  description: string
}

export interface ProcessSection {
  headline: string
  subheadline: string
  stages: Stage[]
}

export const process: ProcessSection = {
  headline: 'How our customers have experienced working with us',
  subheadline: 'A clear, predictable path from first conversation to operating at scale.',
  stages: [
    {
      phase: 'Discover',
      headline: 'Mapped the data landscape',
      description:
        'We dug into their systems, interviewed their teams, and mapped every data source. They had a complete blueprint within days.',
    },
    {
      phase: 'Build',
      headline: 'Built the infrastructure',
      description:
        'Our engineers built pipelines, designed the warehouse, and set up monitoring. Weekly updates, no surprises.',
    },
    {
      phase: 'Validate',
      headline: 'Tested everything together',
      description:
        "Their team tested queries, built reports, and verified the numbers. We didn't go live until they were confident.",
    },
    {
      phase: 'Operate',
      headline: 'Running with confidence',
      description:
        "We've been monitoring 24/7 since. When something needs attention, we handle it — typically before anyone notices.",
    },
  ],
}

// -----------------------------------------
// Comparison Matrix
// -----------------------------------------

export interface ComparisonRow {
  capability: string
  hyper: string
  databricks: string
  diy: string
}

export interface ComparisonSection {
  headline: string
  subheadline: string
  rows: ComparisonRow[]
}

export const comparison: ComparisonSection = {
  headline: 'Why companies choose Hyper',
  subheadline: 'You have options. Here\'s how they compare.',
  rows: [
    { capability: 'Fully managed service', hyper: '✓', databricks: '✗', diy: '✗' },
    { capability: 'No data team required', hyper: '✓', databricks: '✗', diy: '✗' },
    { capability: '200+ pre-built connectors', hyper: '✓', databricks: '✓', diy: '✗' },
    { capability: 'Typical setup under 6 weeks', hyper: '✓', databricks: '✗', diy: '✗' },
    { capability: 'Fixed monthly pricing', hyper: '✓', databricks: '✗', diy: '✗' },
    { capability: 'Dedicated support team', hyper: '✓', databricks: '✗', diy: '✗' },
    { capability: 'Enterprise-grade security', hyper: '✓', databricks: '✓', diy: '~' },
    { capability: 'Custom dashboards & analytics', hyper: '✓', databricks: '✓', diy: '✓' },
    { capability: 'Typical monthly cost', hyper: '$$', databricks: '$$$$', diy: '$$$$' },
  ],
}

// -----------------------------------------
// Results & Testimonials
// -----------------------------------------

export interface Stat {
  value: string
  label: string
}

export interface Testimonial {
  quote: string
  author: string
  title: string
  company: string
  result?: string
}

export interface ResultsSection {
  headline: string
  stats: Stat[]
  testimonials: Testimonial[]
}

export const results: ResultsSection = {
  headline: 'Real results from real clients',
  stats: [
    { value: '5 weeks', label: 'Average time to go live' },
    { value: '20+ hours', label: 'Saved per week on manual reporting' },
    { value: '200+', label: 'Pre-built data connectors' },
    { value: '95%+', label: 'Client retention rate' },
  ],
  testimonials: [
    {
      quote:
        "Before Hyper, our marketing team spent two days every week pulling data from six different platforms into spreadsheets. Now it's automated. We've reallocated that time to actually analyzing the data and optimizing campaigns.",
      author: 'Ricky M.',
      title: 'CMO',
      company: '3Way Marketing',
      result: 'Marketing team reclaimed 16+ hours per week',
    },
    {
      quote:
        "We evaluated Snowflake and Fivetran, but the costs were unpredictable and we didn't have data engineers to manage it. Hyper gave us the same capabilities at a fraction of the cost with none of the overhead.",
      author: 'Sarah K.',
      title: 'Head of Operations',
      company: 'FinServe Co',
    },
    {
      quote:
        "Our AI chatbot project was stalled for six months because we couldn't get clean data. Hyper had us up and running in four weeks. The chatbot is now handling 40% of our customer inquiries.",
      author: 'Michael T.',
      title: 'CTO',
      company: 'TechStart',
    },
  ],
}

// -----------------------------------------
// Security
// -----------------------------------------

export interface SecurityFeature {
  name: string
  description: string
}

export interface SecuritySection {
  headline: string
  subheadline: string
  features: SecurityFeature[]
}

export const security: SecuritySection = {
  headline: 'Your data security is non-negotiable',
  subheadline:
    'We take security as seriously as you do. Every layer of our infrastructure is designed to protect your most sensitive data.',
  features: [
    {
      name: 'SOC 2 Type II',
      description: 'Annual third-party audits of our security controls',
    },
    {
      name: 'GDPR Compliant',
      description: 'Data residency and privacy controls for EU requirements',
    },
    {
      name: 'HIPAA Ready',
      description: 'Healthcare-grade security for protected health information',
    },
    {
      name: 'AES-256 Encryption',
      description: 'Data encrypted in transit and at rest, always',
    },
    {
      name: 'Role-Based Access',
      description: 'Granular permissions and complete audit logging',
    },
    {
      name: 'Data Residency',
      description: 'Your data stays in your chosen geographic region',
    },
  ],
}

// -----------------------------------------
// Final CTA
// -----------------------------------------

export interface FinalCtaSection {
  badge: string
  headline: string
  subheadline: string
  ctas: HeroCta[]
  trustBadges: string[]
}

export const finalCta: FinalCtaSection = {
  badge: 'GET STARTED',
  headline: 'Ready to turn your data into a competitive advantage?',
  subheadline:
    "30 minutes. No slides. We'll look at your actual data situation and show you exactly what we'd build.",
  ctas: [
    {
      label: 'Book a 30-Minute Intro Call',
      href: '#contact',
      variant: 'primary',
    },
    {
      label: 'Watch the Product Demo',
      href: '#demo',
      variant: 'secondary',
    },
  ],
  trustBadges: ['No obligation', 'No pressure', 'Just conversation'],
}

// -----------------------------------------
// Footer
// -----------------------------------------

export interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterContent {
  ctaBar: {
    text: string
    email: string
    phone: string
  }
  brand: {
    name: string
    tagline: string
  }
  linkGroups: FooterLinkGroup[]
  bottomBar: {
    copyright: string
    status: string
  }
}

export const footer: FooterContent = {
  ctaBar: {
    text: 'Questions? Talk to us',
    email: 'hello@hyper.co.za',
    phone: '+27 (0) 00 000 0000',
  },
  brand: {
    name: 'hyper',
    tagline:
      "Data infrastructure for growing businesses. Managed, so you don't have to be.",
  },
  linkGroups: [
    {
      title: 'Products',
      links: [
        { label: 'HyperFlow', href: '#hyperflow' },
        { label: 'HyperStore', href: '#hyperstore' },
        { label: 'HyperLens', href: '#hyperlens' },
        { label: 'HyperMind', href: '#hypermind' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { label: 'Retail & E-commerce', href: '#retail' },
        { label: 'Financial Services', href: '#financial' },
        { label: 'Healthcare', href: '#healthcare' },
        { label: 'AI Enablement', href: '#ai' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Case Studies', href: '#case-studies' },
        { label: 'Documentation', href: '#docs' },
        { label: 'Blog', href: '#blog' },
        { label: 'Security', href: '#security' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy Policy', href: '#privacy' },
      ],
    },
  ],
  bottomBar: {
    copyright: '\u00A9 2025 hyper. All rights reserved.',
    status: 'All systems operational',
  },
}

// -----------------------------------------
// Site Metadata
// -----------------------------------------

export interface SiteMetadata {
  title: string
  description: string
}

export const siteMetadata: SiteMetadata = {
  title: 'hyper - Data Infrastructure for Growing Businesses',
  description:
    'Turn scattered data into business intelligence without the enterprise price tag. HyperFlow and HyperStore give mid-market companies enterprise-grade data infrastructure as a managed service.',
}
