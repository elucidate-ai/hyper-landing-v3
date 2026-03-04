import type { SiteContent } from '../content-types'
import { navigation, trustBar, footer } from '../content'

export const logisticsContent: SiteContent = {
  siteMetadata: {
    title: 'Hypr | Logistics Data',
    description: 'Dedicated data engineering for mid-market logistics companies.',
  },
  navigation,
  hero: {
    eyebrow: 'Dedicated data engineering for mid-market logistics companies',
    headline: 'Operational data consolidation,\nbuilt and managed for you.',
    subheadline:
      'We design, build, and operate production-grade logistics pipelines, consolidation, and governance, turning scattered operational data into a clean, reliable foundation your team can query and act on.',
    ctas: [
      { label: 'Book a Free Discovery Call', href: 'https://calendly.com/saul-elucidate/30min', variant: 'primary' },
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
          'Warehouse in one system. Fleet in another. Billing in spreadsheets.',
          'Simple questions take <strong>half a day</strong> to answer.',
          "It\u2019s not a delivery problem. It\u2019s a <strong>visibility</strong> problem.",
        ],
      },
      {
        headline: 'You tried consolidating in Excel. Then reality hit.',
        fragments: [
          '<strong>Ten</strong> systems. <strong>Ten</strong> different formats. Every week.',
          'You still need someone just to keep the numbers current.',
          "Built for one person\u2019s logic, <strong>not a growing logistics operation</strong>.",
        ],
      },
      {
        headline: "You hired a data person. You still can\u2019t see fleet performance.",
        fragments: [
          'Analysts build reports, not the pipelines behind them.',
          "<strong>One person</strong> can\u2019t maintain pipelines across depots and clients.",
          'Internal teams <strong>cost more</strong> and <strong>deliver less</strong> than dedicated specialists.',
        ],
      },
    ],
    transition:
      "You don\u2019t need another platform, another tool, or another hire. You need a specialist team that delivers the operations dashboards your leadership needs and fully manages the infrastructure behind them, so your people can focus on making better routing decisions.",
  },
  solution: {
    headline: 'Production-grade logistics data infrastructure: designed, built, and fully managed',
    subheadline:
      'Our specialist team builds and operates your complete logistics data layer, including ingestion, consolidation, governance, and monitoring, so your organisation gets clean, reliable, queryable data without building the capability in-house. Dashboards, operational insights, and better routing decisions follow from a foundation you can trust.',
    products: [
      {
        name: 'HyprFlow',
        tagline: 'Connect & Sync',
        description:
          'Every logistics data source, from WMS platforms and fleet trackers to POD systems and ERPs, connected into a single, automated pipeline. Data arrives clean, on time, and governed. No engineering effort from your team.',
      },
      {
        name: 'HyprStore',
        tagline: 'Warehouse & Govern',
        description:
          'A fully managed, production-grade logistics warehouse: modelled for operational performance, governed, and queryable from day one. The reliable foundation your business needs for SLA tracking, fleet utilisation, and cost-per-delivery.',
      },
    ],
  },
  dataFlow: {
    titleBlockText: 'HYPR SYSTEMS | LOGISTICS DATA ARCHITECTURE',
    sources: [
      { iconKey: 'TbDatabase', color: '#0072C6', name: 'WMS' },
      { iconKey: 'TbTruck', color: '#FF7A59', name: 'MiX Telematics' },
      { iconKey: 'TbMapPin', color: '#2CA01C', name: 'Netstar' },
      { iconKey: 'TbApi', color: '#6B4C9A', name: 'POD Apps' },
      { iconKey: 'TbPlug', color: '#0FAAFF', name: 'Sage/SAP B1' },
    ],
    outputs: [
      { iconKey: 'TbChartBar', color: '#1a3a5c', name: 'SLA Dashboards' },
      { iconKey: 'TbReportAnalytics', color: '#1a3a5c', name: 'Client Reports' },
      { iconKey: 'TbFileAnalytics', color: '#1a3a5c', name: 'Fleet Analytics' },
    ],
  },
  process: {
    headline: 'From scattered logistics data to clear insights in weeks',
    subheadline:
      'A proven process refined across dozens of logistics engagements. Your first tailored demo ships in days. Most logistics companies have production operational reporting within five weeks.',
    stages: [
      {
        phase: 'Discover',
        headline: 'A diagnostic worth having, even if you stop here',
        description:
          'We map every logistics data source, interview ops and finance leads, and deliver a prioritised roadmap with quick wins: a standalone deliverable your team can act on, whether or not you move forward with Hypr.',
        duration: 'Week 1',
      },
      {
        phase: 'Build',
        headline: 'Your first tailored demo in days, actionable insights in weeks',
        description:
          'A working demo tailored to your logistics data within the first week. Weekly walkthroughs, full transparency, no surprises. Most logistics companies are in production within five weeks.',
        duration: 'Weeks 2\u20134',
      },
      {
        phase: 'Validate',
        headline: 'Your team tests, verifies, and signs off',
        description:
          "Your team reviews the dashboards, checks delivery records against the WMS, and verifies the numbers match. We don\u2019t go live until you\u2019re confident the data is right.",
        duration: 'Week 5',
      },
      {
        phase: 'Operate',
        headline: 'A long-term partnership that scales with your depots',
        description:
          'We monitor 24/7, resolve issues before they reach you, and evolve your platform as you grow. New depots, new clients, and new integrations, all from your managed logistics data department.',
        duration: 'Ongoing',
      },
    ],
  },
  comparison: {
    headline: "Three paths to logistics analytics. One doesn\u2019t need a data team.",
    subheadline:
      "Every approach has trade-offs. Here\u2019s what each one actually costs, how long it takes, and what it demands from your team.",
    approaches: [
      {
        name: 'Hypr',
        tagline: 'Managed logistics data partner',
        highlighted: true,
        metrics: [
          { label: 'Time to first insight', value: 'Days' },
          { label: 'Total cost of ownership', value: 'Up to 80% less' },
          { label: 'Ongoing iteration speed', value: 'Fast' },
          { label: 'Risk of project failure', value: "Guaranteed or you don\u2019t pay" },
          { label: 'Expertise included', value: 'Logistics data eng. + operational modelling' },
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
    headline: 'Real results from real logistics companies',
    stats: [
      { value: '35TB', label: 'Total logistics data processed per month' },
      { value: '20+ hours', label: 'Saved weekly on manual reporting per client' },
      { value: '200+', label: 'Pre-built logistics connectors' },
      { value: '95%+', label: 'Client retention rate year-over-year' },
    ],
    testimonials: [
      {
        quote:
          "Before Hypr, our operations team spent two days every week pulling data from eight systems into spreadsheets. Now we have live dashboards that update automatically. We\u2019ve reallocated that time to actually improving delivery performance.",
        author: '[Name]',
        title: 'Head of Operations',
        company: '[Company]',
        result: 'Operations team reclaimed 16+ hours per week for route optimisation',
      },
      {
        quote:
          "We evaluated building our own warehouse, but the costs were unpredictable and we\u2019d have needed engineers just to manage it. Hypr gave us consolidated operations dashboards at a fraction of the cost, fully managed and live in four weeks.",
        author: '[Name]',
        title: '[Role]',
        company: '[Company]',
        result: 'Live dashboards in 4 weeks at 60% lower cost than in-house alternatives',
      },
      {
        quote:
          "What started as a delivery tracking dashboard has grown into a company-wide logistics analytics platform. Hypr\u2019s team evolves our infrastructure as we scale. It\u2019s like having an entire data department without the headcount.",
        author: '[Name]',
        title: '[Role]',
        company: '[Company]',
        result: 'From a single dashboard to multi-depot logistics analytics platform in 12 months, and still scaling',
      },
    ],
  },
  security: {
    headline: 'Your logistics data security is non-negotiable',
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
        description: 'Granular permissions ensure depot managers, fleet coordinators, and finance only access the data they need, with complete audit logging of every action. Integrates with your existing SSO provider for centralised identity management.',
      },
      {
        name: 'Data Residency',
        description: 'Your data stays in South Africa, with no exceptions. We operate in local cloud regions so you can meet POPIA data sovereignty and compliance obligations with confidence.',
      },
    ],
  },
  finalCta: {
    badge: 'START HERE',
    headline: 'See what your logistics analytics could look like in five weeks',
    subheadline:
      "Start with a free discovery call. We\u2019ll map your logistics data sources, identify quick wins, and show you a tailored preview of the operations dashboards we\u2019d build. It\u2019s a valuable diagnostic whether or not you move forward.",
    ctas: [
      { label: 'Book a Free Discovery Call', href: 'https://calendly.com/saul-elucidate/30min', variant: 'primary' },
      { label: 'Get in Touch', action: 'contact-form', href: '#', variant: 'secondary' },
    ],
    trustBadges: ['Free data diagnostic included', 'Zero obligation', 'Fully managed from day one'],
  },
  contactModal: {
    title: 'Tell us about your logistics data challenge',
    subtitle: "Not ready for a call? No problem. Drop us a message and we\u2019ll get back to you within one business day.",
  },
  footer,
}
