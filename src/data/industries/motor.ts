import type { SiteContent } from '../content-types'
import { navigation, trustBar, footer } from '../content'

export const motorContent: SiteContent = {
  siteMetadata: {
    title: 'Hypr | Dealer Group Data',
    description: 'Dedicated data engineering for mid-market dealer groups.',
  },
  navigation,
  hero: {
    eyebrow: 'Dealership data consolidation for mid-market motor groups',
    headline: 'Dealership data consolidation,\nbuilt and managed for you.',
    subheadline:
      'We design, build, and operate production-grade dealership pipelines, consolidation, and governance, turning scattered rooftop data into a clean, reliable foundation your team can query and act on.',
    ctas: [
      { label: 'Book a Free Discovery Call', href: 'https://calendly.com/saul-bloch-meeting/30min', variant: 'primary' },
      { label: 'Get in Touch', action: 'contact-form', href: '#', variant: 'secondary' },
    ],
  },
  trustBar,
  problem: {
    headline: 'Sound familiar?',
    painPoints: [
      {
        headline: 'Your data lives in 15 tools. Your decisions live in the dark.',
        fragments: [
          'Sales in one DMS. Workshop in another. Group finance in spreadsheets.',
          'Simple questions take <strong>half a day</strong> to answer.',
          "It\u2019s not a sales problem. It\u2019s a <strong>visibility</strong> problem.",
        ],
      },
      {
        headline: 'You tried consolidating in Excel. Then reality hit.',
        fragments: [
          '<strong>Fifteen</strong> rooftops. <strong>Fifteen</strong> different exports. Every month.',
          'You still need someone just to keep the numbers current.',
          "Built for one person\u2019s logic, <strong>not a growing dealer group</strong>.",
        ],
      },
      {
        headline: "You hired a data person. You still can\u2019t see group performance.",
        fragments: [
          'Analysts build reports, not the pipelines behind them.',
          "<strong>One person</strong> can\u2019t maintain pipelines across rooftops and brands.",
          'Internal teams <strong>cost more</strong> and <strong>deliver less</strong> than dedicated specialists.',
        ],
      },
    ],
    transition:
      "You don\u2019t need another platform, another tool, or another hire. You need a specialist team that delivers the group dashboards your leadership needs and fully manages the infrastructure behind them, so your people can focus on making better commercial decisions.",
  },
  solution: {
    headline: 'Production-grade dealership data infrastructure: designed, built, and fully managed',
    subheadline:
      'Our specialist team builds and operates your complete dealership data layer, including ingestion, consolidation, governance, and monitoring, so your organisation gets clean, reliable, queryable data without building the capability in-house. Dashboards, group insights, and better commercial decisions follow from a foundation you can trust.',
    products: [
      {
        name: 'HyprFlow',
        tagline: 'Connect & Sync',
        description:
          'Every dealership data source, from DMS platforms and OEM portals to F&I systems and ERPs, connected into a single, automated pipeline. Data arrives clean, on time, and governed. No engineering effort from your team.',
      },
      {
        name: 'HyprStore',
        tagline: 'Warehouse & Govern',
        description:
          'A fully managed, production-grade dealer warehouse: modelled for group performance, governed, and queryable from day one. The reliable foundation your business needs for stock ageing, F&I penetration, and brand reporting.',
      },
    ],
  },
  dataFlow: {
    titleBlockText: 'HYPR SYSTEMS | DEALER DATA ARCHITECTURE',
    sources: [
      { iconKey: 'TbDatabase', color: '#0072C6', name: 'Keyloop' },
      { iconKey: 'TbCar', color: '#FF7A59', name: 'Toyota/VW' },
      { iconKey: 'SiSap', color: '#0FAAFF', name: 'SAP/Sage' },
      { iconKey: 'TbPlug', color: '#6B4C9A', name: 'AutoMate' },
      { iconKey: 'TbApi', color: '#2CA01C', name: 'Pinewood' },
    ],
    outputs: [
      { iconKey: 'TbChartBar', color: '#1a3a5c', name: 'Group Dashboards' },
      { iconKey: 'TbReportAnalytics', color: '#1a3a5c', name: 'Brand Reports' },
      { iconKey: 'TbFileAnalytics', color: '#1a3a5c', name: 'F&I Analytics' },
    ],
  },
  process: {
    headline: 'From scattered dealership data to clear insights in weeks',
    subheadline:
      'A proven process refined across dozens of dealer engagements. Your first tailored demo ships in days. Most dealer groups have production group reporting within five weeks.',
    stages: [
      {
        phase: 'Discover',
        headline: 'A diagnostic worth having, even if you stop here',
        description:
          'We map every dealership data source, interview dealer principals and group finance, and deliver a prioritised roadmap with quick wins: a standalone deliverable your team can act on, whether or not you move forward with Hypr.',
        duration: 'Week 1',
      },
      {
        phase: 'Build',
        headline: 'Your first tailored demo in days, actionable insights in weeks',
        description:
          'A working demo tailored to your dealership data within the first week. Weekly walkthroughs, full transparency, no surprises. Most dealer groups are in production within five weeks.',
        duration: 'Weeks 2\u20134',
      },
      {
        phase: 'Validate',
        headline: 'Your team tests, verifies, and signs off',
        description:
          "Your team reviews the dashboards, checks deal files against the DMS, and verifies the numbers match. We don\u2019t go live until you\u2019re confident the data is right.",
        duration: 'Week 5',
      },
      {
        phase: 'Operate',
        headline: 'A long-term partnership that scales with your rooftops',
        description:
          'We monitor 24/7, resolve issues before they reach you, and evolve your platform as you grow. New rooftops, new brands, and new integrations, all from your managed dealer data department.',
        duration: 'Ongoing',
      },
    ],
  },
  comparison: {
    headline: "Three paths to group analytics. One doesn\u2019t need a data team.",
    subheadline:
      "Every approach has trade-offs. Here\u2019s what each one actually costs, how long it takes, and what it demands from your team.",
    approaches: [
      {
        name: 'Hypr',
        tagline: 'Managed dealer data partner',
        highlighted: true,
        metrics: [
          { label: 'Time to first insight', value: 'Days' },
          { label: 'Total cost of ownership', value: 'Up to 80% less' },
          { label: 'Ongoing iteration speed', value: 'Fast' },
          { label: 'Risk of project failure', value: "Guaranteed or you don\u2019t pay" },
          { label: 'Expertise included', value: 'Dealer data eng. + group performance modelling' },
          { label: 'Switching cost / lock-in', value: 'Transition to in-house anytime' },
        ],
      },
      {
        name: 'DIY Platforms',
        tagline: 'Databricks, Snowflake, dbt',
        metrics: [
          { label: 'Time to first insight', value: 'Months' },
          { label: 'Total cost of ownership', value: 'R500k\u2013R1M+' },
          { label: 'Ongoing iteration speed', value: 'Slow' },
          { label: 'Risk of project failure', value: 'Medium: config complexity' },
          { label: 'Expertise included', value: 'Platform only, bring your own engineers' },
          { label: 'Switching cost / lock-in', value: 'High migration cost' },
        ],
      },
      {
        name: 'In-House Team',
        tagline: 'Build your own data department',
        metrics: [
          { label: 'Time to first insight', value: '6\u201312 months' },
          { label: 'Total cost of ownership', value: 'R800k\u2013R1.5M+' },
          { label: 'Ongoing iteration speed', value: 'Weeks (backlog dependent)' },
          { label: 'Risk of project failure', value: 'High: hiring + retention risk' },
          { label: 'Expertise included', value: 'Depends on who you hire' },
          { label: 'Switching cost / lock-in', value: 'Key-person dependency' },
        ],
      },
    ],
  },
  results: {
    headline: 'Real results from real dealer groups',
    stats: [
      { value: '35TB', label: 'Total dealership data processed per month' },
      { value: '20+ hours', label: 'Saved weekly on manual reporting per group' },
      { value: '200+', label: 'Pre-built dealer connectors' },
      { value: '95%+', label: 'Client retention rate year-over-year' },
    ],
    testimonials: [
      {
        quote:
          "Before Hypr, my team spent two full days every week just pulling numbers from different platforms into spreadsheets before we could even start analysing anything. Now the data is just there, live, every morning. We stopped talking about where the numbers come from and started talking about what to do about them.",
        author: 'Ricky M.',
        title: 'CMO',
        company: '3Way Marketing',
        result: 'Marketing team reclaimed 25+ hours per week for actual decision-making',
      },
      {
        quote:
          "We seriously considered building our own data infrastructure. The quotes we got were unpredictable, the timelines were optimistic, and we would have needed to hire engineers just to keep it running. Hypr gave us everything we needed. The build option would still be running today.",
        author: 'Joshua K.',
        title: 'CEO',
        company: 'Sourcefin',
        result: 'Live dashboards in 6 weeks at 60% lower cost than building in-house',
      },
      {
        quote:
          "We\u2019d been through other providers who could build things, but never really understood what we were trying to achieve. Hypr was different from day one. They came in, understood the business, and built something we actually use every day. Twelve months later we\u2019re still expanding it.",
        author: 'Verified 5-star client review',
        title: '',
        company: 'G2.com',
        result: 'From first dashboard to company-wide analytics platform in 12 months, still scaling',
      },
    ],
  },
  security: {
    headline: 'Your dealership data security is non-negotiable',
    subheadline:
      'Every layer of our infrastructure is built to protect your most sensitive data. No shortcuts.',
    features: [
      {
        name: 'SOC 2 Type II',
        description: 'Annual third-party audits verify the design and operating effectiveness of our security controls. Every audit report is available to clients under NDA upon request.',
      },
      {
        name: 'POPIA Compliant',
        description: 'Full data residency controls and privacy safeguards that meet POPIA and GDPR requirements. We support data subject access requests, right-to-erasure, and consent management out of the box.',
      },
      {
        name: 'HIPAA Ready',
        description: 'Healthcare-grade safeguards for protected health information, including BAA execution. Our infrastructure meets the administrative, physical, and technical requirements for HIPAA compliance.',
      },
      {
        name: 'AES-256 Encryption',
        description: 'All data is encrypted in transit via TLS 1.3 and at rest using AES-256, the same standard used by banks and government agencies. Encryption keys are managed through a dedicated key management service with automatic rotation.',
      },
      {
        name: 'Role-Based Access',
        description: 'Granular permissions ensure dealer principals, group finance, and workshop managers only access the data they need, with complete audit logging of every action. Integrates with your existing SSO provider for centralised identity management.',
      },
      {
        name: 'Data Residency',
        description: 'Your data stays in South Africa, with no exceptions. We operate in local cloud regions so you can meet POPIA data sovereignty and compliance obligations with confidence.',
      },
    ],
  },
  finalCta: {
    badge: 'START HERE',
    headline: 'See what your group analytics could look like in five weeks',
    subheadline:
      "Start with a free discovery call. We\u2019ll map your dealership data sources, identify quick wins, and show you a tailored preview of the group dashboards we\u2019d build. It\u2019s a valuable diagnostic whether or not you move forward.",
    ctas: [
      { label: 'Book a Free Discovery Call', href: 'https://calendly.com/saul-bloch-meeting/30min', variant: 'primary' },
      { label: 'Get in Touch', action: 'contact-form', href: '#', variant: 'secondary' },
    ],
    trustBadges: ['Free data diagnostic included', 'Zero obligation', 'Fully managed from day one'],
  },
  contactModal: {
    title: 'Tell us about your dealership data challenge',
    subtitle: "Not ready for a call? No problem. Drop us a message and we\u2019ll get back to you within one business day.",
  },
  footer,
}
