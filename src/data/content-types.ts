/* =========================================
   Shared TypeScript interfaces for site content.
   Extracted from content.ts to allow reuse
   across industry-specific content files.
   ========================================= */

// Navigation
export interface NavItem {
  label: string
  href: string
}

export interface Navigation {
  items: NavItem[]
  cta: { label: string; href: string }
}

// Hero
export interface HeroCta {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'tertiary'
  action?: string
}

export interface HeroContent {
  eyebrow: string
  headline: string
  subheadline: string
  ctas: HeroCta[]
}

// Trust Bar
export interface TrustBar {
  label: string
  clients: string[]
  microStat: string
}

// Problem Section
export interface PainPoint {
  headline: string
  fragments: string[]
}

export interface ProblemSection {
  headline: string
  painPoints: PainPoint[]
  transition: string
}

// Solution Section
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

// Process
export interface Stage {
  phase: string
  headline: string
  description: string
  duration?: string
}

export interface ProcessSection {
  headline: string
  subheadline: string
  stages: Stage[]
}

// Comparison Matrix
export interface ComparisonMetric {
  label: string
  value: string
}

export interface ComparisonApproach {
  name: string
  tagline: string
  highlighted?: boolean
  metrics: ComparisonMetric[]
  bestFor?: string
}

export interface ComparisonSection {
  headline: string
  subheadline: string
  approaches: ComparisonApproach[]
}

// Results & Testimonials
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

// Security
export interface SecurityFeature {
  name: string
  description: string
}

export interface SecuritySection {
  headline: string
  subheadline: string
  features: SecurityFeature[]
}

// Final CTA
export interface FinalCtaSection {
  badge: string
  headline: string
  subheadline: string
  ctas: HeroCta[]
  trustBadges: string[]
}

// Footer
export interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterContent {
  ctaBar: {
    text: string
    email: string
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

// Site Metadata
export interface SiteMetadata {
  title: string
  description: string
}

// Data Flow (blueprint diagram)
export interface DataFlowSource {
  iconKey: string
  color: string
  name: string
}

export interface DataFlowOutput {
  iconKey: string
  color: string
  name: string
}

export interface DataFlowContent {
  titleBlockText: string
  sources: DataFlowSource[]
  outputs: DataFlowOutput[]
}

// Contact Modal
export interface ContactModalContent {
  title: string
  subtitle: string
}

// Aggregate site content — everything needed to render the full page
export interface SiteContent {
  siteMetadata: SiteMetadata
  navigation: Navigation
  hero: HeroContent
  trustBar: TrustBar
  problem: ProblemSection
  solution: SolutionSection
  dataFlow: DataFlowContent
  process: ProcessSection
  comparison: ComparisonSection
  results: ResultsSection
  security: SecuritySection
  finalCta: FinalCtaSection
  contactModal: ContactModalContent
  footer: FooterContent
}
