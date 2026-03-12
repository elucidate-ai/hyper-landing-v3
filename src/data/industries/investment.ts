import type { SiteContent } from '../content-types'
import { navigation, trustBar, footer } from '../content'

export const investmentContent: SiteContent = {
  siteMetadata: {
    title: 'Hypr | Investment Data',
    description: 'Dedicated data engineering for mid-market investment managers.',
  },
  navigation,
  hero: {
    eyebrow: 'Portfolio data consolidation for mid-market investment managers',
    headline: 'Portfolio data consolidation,\nbuilt and managed for you.',
    subheadline:
      'We design, build, and operate production-grade investment pipelines, consolidation, and governance, turning scattered portfolio data into a clean, reliable foundation your team can query and act on.',
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
          'Positions in one system. Risk in another. Reporting in spreadsheets.',
          'Simple questions take <strong>half a day</strong> to answer.',
          "It\u2019s not a data problem. It\u2019s a <strong>visibility</strong> problem.",
        ],
      },
      {
        headline: 'You tried consolidating in Excel. Then reality hit.',
        fragments: [
          '<strong>Ten</strong> funds. <strong>Ten</strong> different formats. Every month.',
          'You still need someone just to keep the numbers current.',
          "Built for one person\u2019s logic, <strong>not a growing investment operation</strong>.",
        ],
      },
      {
        headline: "You hired a data person. You still can\u2019t see portfolio performance.",
        fragments: [
          'Analysts build reports, not the pipelines behind them.',
          "<strong>One person</strong> can\u2019t maintain pipelines across funds and mandates.",
          'Internal teams <strong>cost more</strong> and <strong>deliver less</strong> than dedicated specialists.',
        ],
      },
    ],
    transition:
      "You don\u2019t need another platform, another tool, or another hire. You need a specialist team that delivers the portfolio dashboards your leadership needs and fully manages the infrastructure behind them, so your people can focus on making better investment decisions.",
  },
  solution: {
    headline: 'Production-grade investment data infrastructure: designed, built, and fully managed',
    subheadline:
      'Our specialist team builds and operates your complete investment data layer, including ingestion, consolidation, governance, and monitoring, so your organisation gets clean, reliable, queryable data without building the capability in-house. Dashboards, portfolio insights, and better investment decisions follow from a foundation you can trust.',
    products: [
      {
        name: 'HyprFlow',
        tagline: 'Connect & Sync',
        description:
          'Every investment data source, from portfolio management systems and custodian feeds to Bloomberg, risk engines, and fund accounting platforms, connected into a single, automated pipeline. Data arrives clean, on time, and governed. No engineering effort from your team.',
      },
      {
        name: 'HyprStore',
        tagline: 'Warehouse & Govern',
        description:
          'A fully managed, production-grade investment warehouse: modelled for portfolio reporting, governed, and queryable from day one. The reliable foundation your business needs for performance attribution, risk monitoring, and client reporting.',
      },
    ],
  },
  dataFlow: {
    titleBlockText: 'HYPR SYSTEMS | INVESTMENT DATA ARCHITECTURE',
    sources: [
      { iconKey: 'TbDatabase', color: '#0072C6', name: 'Iress' },
      { iconKey: 'TbChartLine', color: '#FF6900', name: 'Bloomberg' },
      { iconKey: 'SiXero', color: '#13B5EA', name: 'Xero/Sage' },
      { iconKey: 'TbApi', color: '#6B4C9A', name: 'SS&C Advent' },
      { iconKey: 'TbChartBar', color: '#2CA01C', name: 'MetaTrader/FlexTrade' },
    ],
    outputs: [
      { iconKey: 'TbChartBar', color: '#1a3a5c', name: 'Portfolio Dashboards' },
      { iconKey: 'TbReportAnalytics', color: '#1a3a5c', name: 'Client Reports' },
      { iconKey: 'TbFileAnalytics', color: '#1a3a5c', name: 'Risk Analytics' },
    ],
  },
  process: {
    headline: 'From scattered investment data to clear insights in weeks',
    subheadline:
      'A proven process refined across dozens of investment engagements. Your first tailored demo ships in days. Most investment firms have production portfolio reporting within five weeks.',
    stages: [
      {
        phase: 'Discover',
        headline: 'A diagnostic worth having, even if you stop here',
        description:
          'We map every investment data source, interview portfolio and compliance leads, and deliver a prioritised roadmap with quick wins: a standalone deliverable your team can act on, whether or not you move forward with Hypr.',
        duration: 'Week 1',
      },
      {
        phase: 'Build',
        headline: 'Your first tailored demo in days, actionable insights in weeks',
        description:
          'A working demo tailored to your investment data within the first week. Weekly walkthroughs, full transparency, no surprises. Most investment firms are in production within five weeks.',
        duration: 'Weeks 2\u20134',
      },
      {
        phase: 'Validate',
        headline: 'Your team tests, verifies, and signs off',
        description:
          "Your team reviews the dashboards, checks portfolio valuations against your custodian, and verifies the numbers match. We don\u2019t go live until you\u2019re confident the data is right.",
        duration: 'Week 5',
      },
      {
        phase: 'Operate',
        headline: 'A long-term partnership that scales with your AUM',
        description:
          'We monitor 24/7, resolve issues before they reach you, and evolve your platform as you grow. New funds, new mandates, and new integrations, all from your managed investment data department.',
        duration: 'Ongoing',
      },
    ],
  },
  comparison: {
    headline: "Three paths to portfolio analytics. One doesn\u2019t need a data team.",
    subheadline:
      "Every approach has trade-offs. Here\u2019s what each one actually costs, how long it takes, and what it demands from your team.",
    approaches: [
      {
        name: 'Hypr',
        tagline: 'Managed investment data partner',
        highlighted: true,
        metrics: [
          { label: 'Time to first insight', value: 'Days' },
          { label: 'Total cost of ownership', value: 'Up to 80% less' },
          { label: 'Ongoing iteration speed', value: 'Fast' },
          { label: 'Risk of project failure', value: "Guaranteed or you don\u2019t pay" },
          { label: 'Expertise included', value: 'Investment data eng. + portfolio modelling' },
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
    headline: 'Real results from real investment managers',
    stats: [
      { value: '35TB', label: 'Total investment data processed per month' },
      { value: '20+ hours', label: 'Saved weekly on manual reporting per client' },
      { value: '200+', label: 'Pre-built investment connectors' },
      { value: '95%+', label: 'Client retention rate year-over-year' },
    ],
    testimonials: [
      {
        quote:
          "When your business runs on financial data across multiple platforms, the worst thing you can do is make decisions on numbers that aren\u2019t reconciled. Before Hypr, getting to a clean, trusted view took days of manual work every month. Now it\u2019s just there. As a CA I care about the integrity of the numbers and that\u2019s exactly what Hypr delivers.",
        author: 'Michael Roffey CA(SA)',
        title: 'Co-Founder',
        company: 'Airvantage',
        result: 'From days of manual reconciliation to live, trusted financial data',
      },
      {
        quote:
          "We seriously considered building our own data infrastructure. The quotes we got back were unpredictable, the timelines were optimistic, and we\u2019d have needed engineers just to keep it running. Hypr was live and managed in four weeks. The build option would still be running today.",
        author: 'Joshua K.',
        title: 'CEO',
        company: 'Sourcefin',
        result: 'Live dashboards in 6 weeks at 60% lower cost than building in-house',
      },
      {
        quote:
          "We\u2019d been through other providers who could build things but never really understood what we were trying to achieve. That has not been a problem with Hypr. They came in, understood the business, and built something we actually use every day.",
        author: 'Verified 5-star client review',
        title: '',
        company: 'G2.com',
        result: 'Every verified G2 reviewer says the same thing: Hypr understood their business',
      },
    ],
  },
  security: {
    headline: 'Your investment data security is non-negotiable',
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
        description: 'Granular permissions ensure portfolio managers, compliance, and client reporting teams only access the data they need, with complete audit logging of every action. Integrates with your existing SSO provider for centralised identity management.',
      },
      {
        name: 'Data Residency',
        description: 'Your data stays in South Africa, with no exceptions. We operate in local cloud regions so you can meet POPIA data sovereignty and compliance obligations with confidence.',
      },
    ],
  },
  finalCta: {
    badge: 'START HERE',
    headline: 'See what your investment analytics could look like in five weeks',
    subheadline:
      "Start with a free discovery call. We\u2019ll map your investment data sources, identify quick wins, and show you a tailored preview of the portfolio dashboards we\u2019d build. It\u2019s a valuable diagnostic whether or not you move forward.",
    ctas: [
      { label: 'Book a Free Discovery Call', href: 'https://calendly.com/saul-bloch-meeting/30min', variant: 'primary' },
      { label: 'Get in Touch', action: 'contact-form', href: '#', variant: 'secondary' },
    ],
    trustBadges: ['Free data diagnostic included', 'Zero obligation', 'Fully managed from day one'],
  },
  contactModal: {
    title: 'Tell us about your investment data challenge',
    subtitle: "Not ready for a call? No problem. Drop us a message and we\u2019ll get back to you within one business day.",
  },
  footer,
}
