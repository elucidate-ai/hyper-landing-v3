import type {
  DiagnosticContent,
  DiagnosticMaturityOption,
  DiagnosticPillar,
  DiagnosticProductKey,
  DiagnosticProfileId,
  DiagnosticResultProfile,
  IndustrySlug,
} from './content-types'

export const diagnosticBookingHref = 'https://calendly.com/saul-bloch-meeting/30min'

const maturityLabels = ['Initial', 'Developing', 'Defined', 'Managed', 'Optimized'] as const

function levels(descriptions: [string, string, string, string, string]): DiagnosticMaturityOption[] {
  return descriptions.map((description, index) => ({
    value: (index + 1) as DiagnosticMaturityOption['value'],
    label: maturityLabels[index],
    description,
  }))
}

function question(
  id: string,
  theme: string,
  prompt: string,
  descriptions: [string, string, string, string, string],
) {
  return {
    id,
    theme,
    prompt,
    options: levels(descriptions),
  }
}

const profiles: Record<DiagnosticProfileId, DiagnosticResultProfile> = {
  'visibility-gap': {
    id: 'visibility-gap',
    headline: 'You have a visibility gap, not a data ambition gap.',
    summary:
      'Leadership wants a cleaner operating view, but reporting is still arriving too late, in too many formats, and with too much interpretation required before anyone acts.',
    rootCause:
      'This pattern shows up when the reporting layer has outgrown the plumbing underneath it. Data exists, but it is not being shaped into a reliable operating view with the speed executives need.',
    recommendationLead:
      'The fastest lift is to tighten the path from governed data to executive visibility so decisions stop waiting on analyst assembly.',
    bookingPrompt:
      'Book a diagnostic review and we will show you how Hypr would turn your reporting layer into something leadership can actually run on.',
  },
  'trust-gap': {
    id: 'trust-gap',
    headline: 'Your reporting problem is really a trust problem.',
    summary:
      'Teams can get numbers on the page, but they still hesitate before acting because metric definitions, data quality, and business logic are not stable enough yet.',
    rootCause:
      'This usually happens when warehouse logic, governance, and stakeholder definitions have evolved separately. Dashboards exist, but the operating model behind them is still fragmented.',
    recommendationLead:
      'The priority is a governed warehouse and modelling layer that gives finance, operations, and leadership one version of the truth before more dashboards get added on top.',
    bookingPrompt:
      'Book a diagnostic review and we will map where trust is breaking down and what Hypr would stabilise first.',
  },
  'manual-drag': {
    id: 'manual-drag',
    headline: 'Data delivery still depends on heroics.',
    summary:
      'The business is paying for answers twice: once in the time it takes to prepare them, and again in the opportunities lost while people are still reconciling spreadsheets and one-off requests.',
    rootCause:
      'When data engineering is held together by exports, ad hoc scripts, and key-person knowledge, every new request becomes operating drag instead of reusable infrastructure.',
    recommendationLead:
      'The first win is to remove manual delivery pressure so clean data arrives through repeatable pipelines instead of depending on individual effort.',
    bookingPrompt:
      'Book a diagnostic review and we will show you where Hypr would remove the most reporting drag in the first 30 to 90 days.',
  },
  'foundation-strain': {
    id: 'foundation-strain',
    headline: 'Your growth is outrunning the data foundation underneath it.',
    summary:
      'Demand for better analytics is real, but the platform, operating model, and reliability layer are not yet strong enough to support that demand cleanly at scale.',
    rootCause:
      'This is what it looks like when more sources, more stakeholders, and more reporting pressure arrive before the warehouse, orchestration, and governance layer is truly production-ready.',
    recommendationLead:
      'The right move is to stabilise the operating layer first, then build outward into reporting and AI use cases with far less rework.',
    bookingPrompt:
      'Book a diagnostic review and we will walk through the foundational layer Hypr would put in place before expanding the reporting surface area.',
  },
  'full-stack-pressure': {
    id: 'full-stack-pressure',
    headline: 'You need a connected data operating layer, not another point fix.',
    summary:
      'Pressure is showing up across ingestion, governance, warehousing, and visibility at the same time. Solving just one layer would leave the rest of the bottleneck intact.',
    rootCause:
      'This pattern usually appears when the business has outgrown DIY reporting, but has not yet put a full data engineering operating model in place to support scale.',
    recommendationLead:
      'The most credible path is a connected stack: reliable ingestion, a governed warehouse and model layer, and an executive-facing reporting surface built on top of it.',
    bookingPrompt:
      'Book a diagnostic review and we will show you the phased Hypr stack we would deploy for this level of complexity.',
  },
}

const pillars: DiagnosticPillar[] = [
  {
    id: 'sources',
    name: 'Sources & Integration',
    description: 'How data enters the business and how resilient that intake layer really is.',
    accent: '#365e8d',
    productWeights: { flow: 3, store: 1 },
    profileWeights: { 'manual-drag': 2, 'foundation-strain': 1 },
    recommendations: {
      low: [
        'Stabilise the ingestion layer for your highest-value systems before adding more reporting requests.',
        'Replace manual exports with a repeatable connector and pipeline pattern.',
        'Set source ownership and schema-change response rules for the systems leadership relies on most.',
      ],
      mid: [
        'Expand connector coverage so the same pipeline standards apply across finance, CRM, and operations.',
        'Add ingestion observability and alerting before source changes become dashboard outages.',
        'Reduce source-specific custom logic so onboarding the next system is faster and less brittle.',
      ],
      high: [
        'Use the intake layer as a reusable operating asset rather than a project-by-project integration effort.',
        'Push toward data contracts and faster source onboarding for new business initiatives.',
      ],
    },
    questions: [
      question(
        'sources_sprawl',
        'Source sprawl',
        'How coordinated is ingestion across the systems that matter most to the business?',
        [
          'Data lives in disconnected tools and the team still depends on manual exports to move it around.',
          'A few critical feeds are scripted, but ingestion is still brittle and depends on specific people.',
          'Key systems land in a shared destination on a schedule, though edge cases still rely on manual work.',
          'Most priority systems are integrated through repeatable pipelines with clear ownership.',
          'New sources are onboarded through standard patterns, with contracts and observability from the start.',
        ],
      ),
      question(
        'sources_reliability',
        'Ingestion reliability',
        'How reliable are the pipelines that move data into your reporting stack?',
        [
          'Loads fail silently or are noticed only after a report is already wrong.',
          'Failures are spotted manually and fixed reactively when someone complains.',
          'Important jobs are monitored, but incident handling is still inconsistent.',
          'Pipelines have alerts, run history, and clear response ownership for production issues.',
          'Reliability is engineered proactively with SLAs, observability, and rapid recovery patterns.',
        ],
      ),
      question(
        'sources_connectors',
        'Connector coverage',
        'How much of your data intake layer is reusable versus one-off integration work?',
        [
          'Every new source feels like a fresh custom project.',
          'There are a handful of reusable scripts, but most integrations still need bespoke work.',
          'Common source types follow some shared patterns, even if the last mile is still custom.',
          'Most source onboarding uses reusable connector and transformation templates.',
          'Integration work is productised enough that new sources slot into a governed operating model quickly.',
        ],
      ),
      question(
        'sources_change',
        'Schema and source change handling',
        'What happens when a source system changes its schema, logic, or export shape?',
        [
          'Changes break downstream reporting and the team discovers it after the fact.',
          'A few people know how to patch issues, but there is no consistent response pattern.',
          'Major changes are usually caught and fixed, though smaller shifts still slip through.',
          'Schema and source changes are monitored, triaged, and handled through defined workflows.',
          'Change handling is built into the platform with tests, alerts, and low-friction rollout paths.',
        ],
      ),
    ],
  },
  {
    id: 'trust',
    name: 'Data Trust & Governance',
    description: 'Whether the business trusts the numbers enough to act without repeated reconciliation.',
    accent: '#356f67',
    productWeights: { store: 3, lens: 1 },
    profileWeights: { 'trust-gap': 3, 'foundation-strain': 1 },
    recommendations: {
      low: [
        'Define ownership for your most critical datasets and metrics before adding more dashboard surface area.',
        'Prioritise quality checks and shared business definitions for revenue, margin, and operational exceptions.',
        'Introduce access and governance controls that match how the business already consumes the data.',
      ],
      mid: [
        'Standardise business logic across teams so each report is not re-litigating the same metric definitions.',
        'Move quality monitoring closer to the warehouse and transformation layer.',
        'Tighten governance around sensitive data and role-based access before usage scales further.',
      ],
      high: [
        'Turn trusted definitions into reusable semantic and governance assets for every new reporting initiative.',
        'Use strong governance as the launchpad for AI and self-serve analytics, not just compliance.',
      ],
    },
    questions: [
      question(
        'trust_ownership',
        'Ownership and accountability',
        'How clearly is data ownership defined for the numbers leadership cares about most?',
        [
          'No one can say who owns the underlying logic once reports start to conflict.',
          'Ownership exists informally, but it still depends on tribal knowledge.',
          'Important datasets have named owners, though accountability is uneven across teams.',
          'Ownership and stewardship are defined across critical domains and used in day-to-day operations.',
          'Ownership is embedded into the operating model, with clear responsibility for data contracts, quality, and change.',
        ],
      ),
      question(
        'trust_quality',
        'Quality confidence',
        'How much confidence does the business have in data quality today?',
        [
          'Important reports are treated cautiously because quality issues are common and poorly understood.',
          'Teams know where some quality issues live, but checks are still mostly manual.',
          'Quality checks exist for important workflows, though coverage is incomplete.',
          'Critical datasets are monitored systematically and quality issues are visible quickly.',
          'Quality is continuously measured, governed, and trusted enough that teams act without rechecking the basics.',
        ],
      ),
      question(
        'trust_definitions',
        'Shared metric definitions',
        'How aligned are teams on the definitions behind your most important metrics?',
        [
          'Different departments use different definitions for the same metric.',
          'There is a rough consensus, but exceptions and local versions still show up often.',
          'Core metrics are mostly aligned, though edge cases still trigger debate.',
          'Shared definitions exist and are applied consistently across reporting surfaces.',
          'Metric logic is centralised, versioned, and reused so new reporting does not reintroduce confusion.',
        ],
      ),
      question(
        'trust_access',
        'Access and control',
        'How mature are your controls around who can access, change, and use sensitive data?',
        [
          'Access is broad and difficult to govern consistently.',
          'Some sensitive data is controlled, but permissions and auditability are uneven.',
          'Access policies exist for important systems, though enforcement is still partly manual.',
          'Role-based access, audit trails, and governance controls are applied across the core stack.',
          'Access, privacy, and governance are built into the platform by default and scale cleanly with usage.',
        ],
      ),
    ],
  },
  {
    id: 'warehouse',
    name: 'Warehouse & Modeling',
    description: 'The health of the central data platform, transformation layer, and historical model.',
    accent: '#7c5f3a',
    productWeights: { store: 3, lens: 1 },
    profileWeights: { 'trust-gap': 1, 'foundation-strain': 2 },
    recommendations: {
      low: [
        'Stand up one governed warehouse and model layer before more teams build their own reporting logic.',
        'Move critical transformations out of spreadsheets and BI tools into a managed data model.',
        'Preserve historical context so the business can answer trend and exception questions reliably.',
      ],
      mid: [
        'Strengthen modelling standards so core entities and business logic are reusable across reporting requests.',
        'Automate more of the transformation layer and test it before new dashboards depend on it.',
        'Expand historical coverage and lineage so leaders can trust change over time, not just current snapshots.',
      ],
      high: [
        'Use the warehouse and model layer as the durable operating backbone for reporting, experimentation, and AI use cases.',
        'Keep tightening semantic consistency so every new insight reuses the same trusted foundation.',
      ],
    },
    questions: [
      question(
        'warehouse_central',
        'Central warehouse maturity',
        'How centralised is the platform that stores and serves reporting data?',
        [
          'There is no true central warehouse; reporting is stitched together from source systems and files.',
          'A warehouse exists, but only a few datasets are reliable enough to depend on.',
          'The warehouse is the main reporting destination for important workflows, though coverage is incomplete.',
          'Most priority reporting runs from a central warehouse that the business trusts.',
          'The warehouse is the operating backbone for analytics, reporting, and downstream data products.',
        ],
      ),
      question(
        'warehouse_transforms',
        'Transformation automation',
        'How mature is the transformation layer that turns raw data into business-ready models?',
        [
          'Business logic still lives mainly in BI tools, spreadsheets, or analyst workarounds.',
          'Some transformations are centralised, but many reporting outputs still contain local logic.',
          'Core transforms are automated, though coverage and testing are still uneven.',
          'Business-ready models are generated through a managed transformation workflow with clear ownership.',
          'Transformations are modular, tested, and easy to extend without destabilising the rest of the platform.',
        ],
      ),
      question(
        'warehouse_modeling',
        'Modelling discipline',
        'How reusable and well-structured are the data models behind your reporting?',
        [
          'Models are mostly ad hoc and built to satisfy one report at a time.',
          'Some common patterns exist, but reuse is inconsistent and definitions drift over time.',
          'Key subject areas are modelled deliberately, though some duplication remains.',
          'Reusable domain models underpin most reporting and reduce repeated logic across teams.',
          'The modelling layer is treated like a product, with clear standards, reuse, and change control.',
        ],
      ),
      question(
        'warehouse_history',
        'Historical depth',
        'How confidently can the business analyse changes over time rather than just current snapshots?',
        [
          'Historical analysis is limited because data is overwritten, incomplete, or hard to reconcile.',
          'Some history is kept, but not consistently enough for confident trend analysis.',
          'Important subject areas retain usable history, though some gaps still exist.',
          'The warehouse supports reliable historical analysis across core business domains.',
          'Historical depth is intentionally designed so leadership can compare trends, cohorts, and operational shifts with confidence.',
        ],
      ),
    ],
  },
  {
    id: 'visibility',
    name: 'Reporting & Visibility',
    description: 'How quickly the business can see what is happening and act without waiting on manual reporting cycles.',
    accent: '#784a8c',
    productWeights: { flow: 1, store: 1, lens: 3 },
    profileWeights: { 'visibility-gap': 3 },
    recommendations: {
      low: [
        'Focus reporting on the handful of operating views leadership actually uses to run the business.',
        'Reduce dashboard sprawl by turning repeated reporting requests into a managed visibility layer.',
        'Shorten the lag between warehouse updates and executive decision-making.',
      ],
      mid: [
        'Improve freshness and exception visibility so the business can act before the next reporting cycle.',
        'Standardise the reporting experience across leadership, finance, and operations.',
        'Tighten the path from governed models to executive-ready outputs.',
      ],
      high: [
        'Use the reporting layer as a true operating surface for leaders, not just a repository of dashboards.',
        'Build more scenario, exception, and AI-assisted visibility on top of the strong foundation already in place.',
      ],
    },
    questions: [
      question(
        'visibility_exec',
        'Executive visibility',
        'How quickly can leadership get a clear picture of business performance when something changes?',
        [
          'Leaders still wait on analysts or ops teams to assemble the story manually.',
          'Leadership gets regular reporting, but urgent questions still trigger ad hoc scramble.',
          'Core performance views are available, though deeper questions still take time to answer.',
          'Leadership has timely access to the metrics and exceptions needed for most operating decisions.',
          'Executive visibility is immediate enough that the business can respond in-cycle, not after the fact.',
        ],
      ),
      question(
        'visibility_selfserve',
        'Self-serve reporting',
        'How well can non-technical stakeholders answer routine questions without pulling in the data team?',
        [
          'Routine questions usually become manual requests for analysts or technical staff.',
          'A few reports are self-serve, but confidence and coverage are still low.',
          'Common questions can usually be answered through shared dashboards, though exceptions still need support.',
          'Most routine decisions are supported by clear, self-serve reporting experiences.',
          'Self-serve access is strong enough that the data team can focus on leverage, not repeated report assembly.',
        ],
      ),
      question(
        'visibility_exceptions',
        'Exception detection',
        'How effectively does the business spot anomalies, delays, or operational exceptions early?',
        [
          'Exceptions are usually discovered after they have already impacted customers or revenue.',
          'Teams notice some issues manually, but there is no consistent early-warning layer.',
          'Important exceptions are visible, though not yet with enough consistency or context.',
          'Operational exceptions are surfaced quickly enough for teams to respond with confidence.',
          'The business has a strong early-warning system that turns data into timely intervention, not hindsight.',
        ],
      ),
      question(
        'visibility_freshness',
        'Data freshness',
        'How current is the information people rely on for operational and executive reporting?',
        [
          'Reporting is largely retrospective and often lags the business materially.',
          'Some critical views are fresher, but many decisions still rely on stale information.',
          'Most key reporting updates on a workable schedule, though high-pressure use cases still feel delayed.',
          'Freshness is aligned to the pace of the business for most important decisions.',
          'Data arrives with the speed and consistency needed to run the business in near real time where it matters.',
        ],
      ),
    ],
  },
  {
    id: 'team',
    name: 'Team & Operating Model',
    description: 'How data engineering work is owned, prioritised, and translated into business outcomes.',
    accent: '#a35b2c',
    productWeights: { flow: 2, store: 1, lens: 1 },
    profileWeights: { 'manual-drag': 2, 'foundation-strain': 1 },
    recommendations: {
      low: [
        'Clarify who owns the data platform versus who consumes reporting so requests stop turning into backlog chaos.',
        'Reduce key-person dependency by documenting and standardising the operating model.',
        'Align roadmap and budget decisions to the reporting pressure the business is already feeling.',
      ],
      mid: [
        'Move from reactive request handling toward a clearer data platform roadmap with stakeholder prioritisation.',
        'Create repeatable intake and prioritisation for analytics and reporting work.',
        'Shift more effort from recurring manual requests into reusable infrastructure.',
      ],
      high: [
        'Use the strong operating model to accelerate delivery instead of letting growth reintroduce ad hoc reporting patterns.',
        'Turn stakeholder alignment into a faster path for rolling out new reporting and AI use cases.',
      ],
    },
    questions: [
      question(
        'team_ownership',
        'Ownership model',
        'How clearly is the data engineering function owned and operated today?',
        [
          'The work is scattered across analysts, operations, contractors, or one technical person.',
          'There is partial ownership, but responsibilities still blur across teams.',
          'A clear owner exists for core data engineering work, though supporting processes are still forming.',
          'Ownership, delivery expectations, and handoffs are understood across the business.',
          'The operating model is mature enough that platform work and business-facing delivery move in sync.',
        ],
      ),
      question(
        'team_manual',
        'Manual reporting burden',
        'How much recurring reporting work still depends on analysts, ops teams, or finance doing manual assembly?',
        [
          'A large share of recurring reporting still depends on manual exports, spreadsheet work, or one-off requests.',
          'Some automation exists, but manual reporting is still a material operating cost.',
          'Manual work is concentrated in known areas rather than spread everywhere.',
          'Most recurring reporting is automated and manual effort is reserved for genuine exceptions.',
          'Manual reporting drag is minimal because the platform does the repetitive work reliably.',
        ],
      ),
      question(
        'team_alignment',
        'Stakeholder alignment',
        'How aligned are business stakeholders on what the data platform should prioritise next?',
        [
          'Requests compete constantly and the loudest stakeholder often wins.',
          'There is some prioritisation, but trade-offs are not consistently explicit.',
          'Priority areas are mostly agreed, though cross-functional alignment still takes work.',
          'Stakeholders share a clear view of what the platform should unlock next and why.',
          'Prioritisation is disciplined enough that infrastructure, reporting, and business outcomes reinforce each other.',
        ],
      ),
      question(
        'team_commitment',
        'Roadmap and budget commitment',
        'How committed is the business to investing in the data foundation behind reporting and analytics?',
        [
          'Investment is reactive and usually triggered only after reporting pain becomes severe.',
          'There is growing recognition of the need, but commitment is still ad hoc.',
          'The business has started funding the right work, though not always with long enough horizon.',
          'Data platform work has clear sponsorship, roadmap intent, and business backing.',
          'The organisation treats data engineering as a strategic operating capability, not a side project.',
        ],
      ),
    ],
  },
  {
    id: 'reliability',
    name: 'Reliability & Scale',
    description: 'Whether the platform can operate predictably as data volume, stakeholder demand, and complexity increase.',
    accent: '#3f4d63',
    productWeights: { flow: 2, store: 1 },
    profileWeights: { 'foundation-strain': 3, 'manual-drag': 1 },
    recommendations: {
      low: [
        'Add orchestration, monitoring, and incident response discipline before scale turns small failures into business disruption.',
        'Treat cost, performance, and security as part of the operating model, not cleanup work for later.',
        'Define the minimum production standard for the data platform before onboarding more demand.',
      ],
      mid: [
        'Strengthen incident response and runbooks so platform failures do not depend on one person knowing what to do.',
        'Tune costs and workloads before scale makes the platform harder to change.',
        'Harden security and compliance practices to match the growing value of the data estate.',
      ],
      high: [
        'Use the strong production footing to support more ambitious reporting and AI use cases without compromising reliability.',
        'Keep pushing automation in observability, performance, and recovery as demand expands.',
      ],
    },
    questions: [
      question(
        'reliability_orchestration',
        'Orchestration and monitoring',
        'How mature is the orchestration and monitoring layer behind the platform?',
        [
          'Jobs are triggered manually or through fragile schedules with little observability.',
          'Basic orchestration exists, but monitoring is still patchy and reactive.',
          'Important workflows are orchestrated centrally, though end-to-end visibility is incomplete.',
          'The platform has dependable orchestration and monitoring across the workflows the business relies on.',
          'Orchestration, lineage, and observability are strong enough to support scale without guesswork.',
        ],
      ),
      question(
        'reliability_incidents',
        'Incident response',
        'How well does the team handle pipeline failures, bad loads, or broken reporting incidents?',
        [
          'Incidents are handled ad hoc and often discovered late.',
          'Some incidents are resolved quickly, but the response still depends on whoever happens to notice.',
          'There is a workable response pattern for critical issues, though not yet consistently documented.',
          'Incident response is clear, timely, and understood across the people who support the platform.',
          'The team treats incidents as an engineering discipline with rapid response, learning, and prevention built in.',
        ],
      ),
      question(
        'reliability_cost',
        'Cost and performance management',
        'How intentionally are platform cost, query performance, and workload efficiency managed?',
        [
          'Costs and performance are mostly reviewed only when they become a visible problem.',
          'There is partial visibility, but optimisation still happens reactively.',
          'The team tracks major cost and performance drivers, though optimisation is not yet systematic.',
          'Cost and performance are managed deliberately as part of platform operations.',
          'The platform is tuned continuously so scale improves leverage instead of compounding waste.',
        ],
      ),
      question(
        'reliability_security',
        'Security and compliance readiness',
        'How ready is the platform for the security, audit, and compliance expectations attached to sensitive business data?',
        [
          'Security and compliance controls are limited or inconsistent across the stack.',
          'Some controls exist, but enforcement and auditability are still uneven.',
          'Core security practices are in place for priority systems, though coverage is still expanding.',
          'Security, access control, and audit readiness are designed into the platform for core workflows.',
          'The platform meets high-trust security and compliance expectations without slowing delivery down.',
        ],
      ),
    ],
  },
]

const recommendations: Record<DiagnosticProductKey, DiagnosticContent['recommendations'][DiagnosticProductKey]> = {
  flow: {
    key: 'flow',
    name: 'HyprFlow',
    tagline: 'Connect and operationalise your source data.',
    description:
      'HyprFlow gives you a managed ingestion and orchestration layer, replacing brittle exports and one-off sync jobs with production-grade data movement.',
    outcome:
      'A cleaner, more reliable intake layer for every system feeding reporting, analytics, and downstream automation.',
  },
  store: {
    key: 'store',
    name: 'HyprStore',
    tagline: 'Create one governed warehouse and model layer.',
    description:
      'HyprStore centralises data, modelling, governance, and quality into a shared foundation the business can trust without rebuilding logic in every report.',
    outcome:
      'A durable warehouse and semantic layer that gives teams one version of the truth to build on.',
  },
  lens: {
    key: 'lens',
    name: 'HyprLens',
    tagline: 'Deliver executive-ready visibility without the spreadsheet scramble.',
    description:
      'HyprLens turns governed data into leadership-ready dashboards, exception views, and reporting experiences so decisions stop waiting on manual assembly.',
    outcome:
      'A sharper decision surface for operators, finance, and leadership teams that need answers quickly.',
  },
}

export const genericDiagnosticContent: DiagnosticContent = {
  title: 'Data Engineering Readiness Diagnostic',
  contextLabel: 'Mid-market data engineering diagnostic',
  intro: {
    eyebrow: 'Data Engineering Readiness Diagnostic',
    headline: 'Benchmark your data engineering foundations.',
    subheadline:
      'Score your data foundations across six pillars, then get a tailored Hypr recommendation for the fastest path forward.',
    bullets: [
      'Built for operators, finance leaders, and executives who need clarity without a technical audit.',
      'Combines readiness scoring with a practical HyprFlow, HyprStore, and HyprLens recommendation.',
      'Ends with a concrete next-step conversation shaped around the first 30 to 90 days.',
    ],
    estimatedTime: '24 questions | about 6 minutes',
    secondaryCta: {
      label: 'Prefer to walk through it live instead?',
      href: diagnosticBookingHref,
    },
  },
  pillars,
  profiles,
  recommendations,
  review: {
    eyebrow: 'Review before results',
    headline: 'Pressure-test your answers before we generate the readiness readout.',
    subheadline:
      'You can submit now, or tighten any remaining pillars for a more accurate maturity score and product-fit recommendation.',
    incompleteMessage:
      'You can submit now or complete the remaining pillars for a more accurate readiness diagnosis.',
    completeMessage:
      'Submit your assessment to see your data engineering readiness report and recommended Hypr stack.',
    emptyMessage: 'Answer at least one question to unlock the readiness readout.',
  },
  cta: {
    label: 'Book your diagnostic review',
    href: diagnosticBookingHref,
    supportingText:
      'We will walk through the diagnosis with you, pressure-test the recommendation, and show what the first 30 to 90 days would look like for your stack.',
  },
}

export function buildIndustryDiagnosticContent(_industry: IndustrySlug): DiagnosticContent {
  return genericDiagnosticContent
}

export function isIndustrySlug(value: string | null): value is IndustrySlug {
  return value === 'retail'
    || value === 'property'
    || value === 'motor'
    || value === 'logistics'
    || value === 'investment'
}

export const diagnosticHrefByIndustry: Record<IndustrySlug, string> = {
  retail: '/diagnostic?industry=retail',
  property: '/diagnostic?industry=property',
  motor: '/diagnostic?industry=motor',
  logistics: '/diagnostic?industry=logistics',
  investment: '/diagnostic?industry=investment',
}
