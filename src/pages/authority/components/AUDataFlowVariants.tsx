import { motion } from 'framer-motion'
import { SiSalesforce, SiHubspot, SiSap, SiQuickbooks, SiGooglesheets } from 'react-icons/si'
import { TbChartBar, TbBrain, TbFileAnalytics } from 'react-icons/tb'
import { solution } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

const DATA_SOURCES = [
  { icon: SiSalesforce, color: '#00A1E0', name: 'Salesforce' },
  { icon: SiHubspot, color: '#FF7A59', name: 'HubSpot' },
  { icon: SiSap, color: '#0FAAFF', name: 'SAP' },
  { icon: SiQuickbooks, color: '#2CA01C', name: 'QuickBooks' },
  { icon: SiGooglesheets, color: '#34A853', name: 'Google Sheets' },
]

const OUTPUTS = [
  { icon: TbChartBar, color: '#1a3a5c', name: 'Dashboards' },
  { icon: TbBrain, color: '#1a3a5c', name: 'AI & ML' },
  { icon: TbFileAnalytics, color: '#1a3a5c', name: 'Reports' },
]

const BLUEPRINT_CSS = `
  @keyframes bp-march {
    from { stroke-dashoffset: 0; }
    to { stroke-dashoffset: -16; }
  }

  @keyframes bp-particle {
    0% { offset-distance: 0%; opacity: 0; }
    5% { opacity: 1; }
    90% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }

  @keyframes bp-pulse-glow {
    0%, 100% { opacity: .12; }
    50% { opacity: .25; }
  }

  .bp-wrap {
    position: relative;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 72px 56px 80px;
    background: #f0f5f9;
    background-image:
      repeating-linear-gradient(0deg, rgba(26,58,92,.04) 0px, rgba(26,58,92,.04) 1px, transparent 1px, transparent 24px),
      repeating-linear-gradient(90deg, rgba(26,58,92,.04) 0px, rgba(26,58,92,.04) 1px, transparent 1px, transparent 24px),
      repeating-linear-gradient(0deg, rgba(26,58,92,.09) 0px, rgba(26,58,92,.09) 1px, transparent 1px, transparent 96px),
      repeating-linear-gradient(90deg, rgba(26,58,92,.09) 0px, rgba(26,58,92,.09) 1px, transparent 1px, transparent 96px);
    border: 2px solid #1a3a5c;
    font-family: 'IBM Plex Mono', monospace;
    box-shadow:
      inset 0 0 120px rgba(26,58,92,.04),
      0 1px 3px rgba(26,58,92,.08),
      0 8px 32px rgba(26,58,92,.06);
  }

  /* Subtle vignette overlay */
  .bp-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 50%, transparent 50%, rgba(26,58,92,.035) 100%);
    pointer-events: none;
    z-index: 0;
  }

  /* Registration marks — four corners */
  .bp-reg {
    position: absolute;
    width: 20px;
    height: 20px;
    z-index: 4;
    pointer-events: none;
  }
  .bp-reg::before, .bp-reg::after {
    content: '';
    position: absolute;
    background: rgba(26,58,92,.3);
  }
  .bp-reg::before {
    width: 1px;
    height: 100%;
    left: 50%;
  }
  .bp-reg::after {
    width: 100%;
    height: 1px;
    top: 50%;
  }
  .bp-reg--tl { top: 12px; left: 12px; }
  .bp-reg--tr { top: 12px; right: 12px; }
  .bp-reg--bl { bottom: 12px; left: 12px; }
  .bp-reg--br { bottom: 12px; right: 12px; }

  /* Title block — proper engineering style */
  .bp-titleblock {
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: grid;
    grid-template-columns: auto auto;
    border: 1.5px solid #1a3a5c;
    background: #f0f5f9;
    z-index: 4;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: .6px;
    text-transform: uppercase;
    color: #1a3a5c;
    line-height: 1;
  }
  .bp-titleblock__cell {
    padding: 6px 12px;
    border-right: 1px solid rgba(26,58,92,.2);
    border-bottom: 1px solid rgba(26,58,92,.2);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .bp-titleblock__cell:nth-child(even) {
    border-right: none;
  }
  .bp-titleblock__cell:nth-last-child(-n+2) {
    border-bottom: none;
  }
  .bp-titleblock__label {
    font-size: 7px;
    letter-spacing: 1px;
    color: rgba(26,58,92,.45);
    font-weight: 600;
  }
  .bp-titleblock__value {
    font-weight: 700;
    font-size: 9px;
    color: #1a3a5c;
    letter-spacing: .5px;
  }
  .bp-titleblock__title {
    grid-column: 1 / -1;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(26,58,92,.2);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .8px;
    color: #1a3a5c;
    text-align: center;
  }

  /* Grid layout */
  .bp-grid {
    position: relative;
    display: grid;
    grid-template-columns: 220px 1fr 200px;
    gap: 56px;
    align-items: center;
    min-height: 440px;
  }

  .bp-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    z-index: 2;
  }

  .bp-col-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: rgba(26,58,92,.4);
    margin-bottom: 2px;
    padding-left: 2px;
  }

  /* Nodes — refined treatment */
  .bp-node {
    position: relative;
    background: rgba(255,255,255,.7);
    border: 1.5px solid rgba(26,58,92,.22);
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all .25s cubic-bezier(.4,0,.2,1);
    cursor: default;
    backdrop-filter: blur(8px);
  }

  /* Corner dots instead of heavy border squares */
  .bp-node::before, .bp-node::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #1a3a5c;
    opacity: .25;
    transition: opacity .25s;
  }
  .bp-node::before { top: -3px; left: -3px; }
  .bp-node::after { bottom: -3px; right: -3px; }

  .bp-node:hover,
  .bp-node:active {
    background: rgba(255,255,255,.92);
    border-color: rgba(26,58,92,.4);
    transform: translateY(-1px);
    box-shadow: 0 2px 12px rgba(26,58,92,.08);
  }
  .bp-node:hover::before, .bp-node:hover::after,
  .bp-node:active::before, .bp-node:active::after {
    opacity: .5;
  }

  /* Accent bar on left */
  .bp-node-accent {
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 8px;
    width: 2px;
    border-radius: 1px;
    opacity: .6;
    transition: opacity .25s;
  }
  .bp-node:hover .bp-node-accent {
    opacity: 1;
  }

  .bp-node-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: rgba(26,58,92,.04);
    transition: background .25s;
  }
  .bp-node:hover .bp-node-icon {
    background: rgba(26,58,92,.07);
  }

  .bp-node-name {
    font-size: 13px;
    font-weight: 600;
    color: #1a3a5c;
    letter-spacing: .2px;
  }

  /* Platform center — dominant visual weight */
  .bp-platform {
    position: relative;
    background: rgba(255,255,255,.55);
    border: 2px solid #1a3a5c;
    padding: 44px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    z-index: 2;
    backdrop-filter: blur(12px);
    box-shadow:
      0 0 0 1px rgba(26,58,92,.06),
      0 0 60px rgba(26,58,92,.06),
      0 4px 24px rgba(26,58,92,.05);
  }

  /* Inner border for double-rule effect */
  .bp-platform::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(26,58,92,.12);
    pointer-events: none;
  }

  /* Corner anchors on platform */
  .bp-platform-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    pointer-events: none;
  }
  .bp-platform-corner::before, .bp-platform-corner::after {
    content: '';
    position: absolute;
    background: #1a3a5c;
  }
  .bp-platform-corner--tl { top: -1px; left: -1px; }
  .bp-platform-corner--tl::before { width: 12px; height: 2px; top: 0; left: 0; }
  .bp-platform-corner--tl::after { width: 2px; height: 12px; top: 0; left: 0; }
  .bp-platform-corner--tr { top: -1px; right: -1px; }
  .bp-platform-corner--tr::before { width: 12px; height: 2px; top: 0; right: 0; }
  .bp-platform-corner--tr::after { width: 2px; height: 12px; top: 0; right: 0; }
  .bp-platform-corner--bl { bottom: -1px; left: -1px; }
  .bp-platform-corner--bl::before { width: 12px; height: 2px; bottom: 0; left: 0; }
  .bp-platform-corner--bl::after { width: 2px; height: 12px; bottom: 0; left: 0; }
  .bp-platform-corner--br { bottom: -1px; right: -1px; }
  .bp-platform-corner--br::before { width: 12px; height: 2px; bottom: 0; right: 0; }
  .bp-platform-corner--br::after { width: 2px; height: 12px; bottom: 0; right: 0; }

  .bp-plat-sec {
    text-align: center;
    padding: 16px 0;
  }

  .bp-plat-lbl {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1.8px;
    color: rgba(26,58,92,.45);
    margin-bottom: 8px;
    font-weight: 500;
  }

  .bp-plat-name {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #1a3a5c;
    letter-spacing: -.5px;
  }

  .bp-plat-divider {
    width: 100%;
    position: relative;
    height: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bp-plat-divider::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(26,58,92,.2) 20%, rgba(26,58,92,.2) 80%, transparent);
  }
  .bp-plat-divider-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(26,58,92,.2);
    position: relative;
    z-index: 1;
  }

  /* SVG layer */
  .bp-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .bp-conn {
    fill: none;
    stroke: rgba(26,58,92,.2);
    stroke-width: 1;
    stroke-dasharray: 6 4;
    animation: bp-march 1.6s linear infinite;
  }

  .bp-conn-solid {
    fill: none;
    stroke: rgba(26,58,92,.08);
    stroke-width: 1;
  }

  /* Flowing particle dots */
  .bp-particle {
    width: 4px;
    height: 4px;
    background: #1a3a5c;
    border-radius: 50%;
    position: absolute;
    opacity: 0;
    offset-rotate: 0deg;
    animation: bp-particle var(--dur, 3s) linear infinite;
    animation-delay: var(--delay, 0s);
    box-shadow: 0 0 6px rgba(26,58,92,.3);
  }

  /* Junction dots where lines meet the platform */
  .bp-junction {
    fill: #1a3a5c;
    opacity: .3;
  }

  /* Annotations — refined with tick marks */
  .bp-ann {
    position: absolute;
    font-size: 9px;
    font-weight: 600;
    color: rgba(26,58,92,.55);
    text-transform: uppercase;
    letter-spacing: 1px;
    background: #f0f5f9;
    padding: 3px 8px;
    border: 1px solid rgba(26,58,92,.15);
    white-space: nowrap;
    z-index: 3;
  }

  /* Dimension line style annotations */
  .bp-dim {
    position: absolute;
    z-index: 3;
    pointer-events: none;
  }
  .bp-dim__line {
    fill: none;
    stroke: rgba(26,58,92,.15);
    stroke-width: 1;
  }
  .bp-dim__tick {
    fill: none;
    stroke: rgba(26,58,92,.2);
    stroke-width: 1;
  }

  /* Mobile-first: base is mobile layout */
  .bp-wrap { padding: 32px 16px 48px; }
  .bp-grid {
    grid-template-columns: 1fr;
    gap: 28px;
    min-height: auto;
  }
  .bp-svg, .bp-ann, .bp-dim, .bp-reg { display: none; }
  .bp-titleblock { display: none; }

  /* Mobile connectors between sections */
  .bp-mobile-connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 0;
  }
  .bp-mobile-connector__line {
    width: 1px;
    height: 24px;
    border-left: 2px dashed rgba(26,58,92,.25);
  }
  .bp-mobile-connector__label {
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: rgba(26,58,92,.4);
  }

  @media (min-width: 768px) {
    .bp-wrap { padding: 48px 32px 56px; }
    .bp-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
  }

  @media (min-width: 1024px) {
    .bp-wrap { padding: 72px 56px 80px; }
    .bp-grid {
      grid-template-columns: 220px 1fr 200px;
      gap: 56px;
      min-height: 440px;
    }
    .bp-svg, .bp-ann, .bp-dim, .bp-reg { display: block; }
    .bp-titleblock { display: grid; }
    .bp-mobile-connector { display: none; }
  }
`

/* ── SVG path data for smooth bezier connections ── */
// Left connections: each source node connects to the platform's left edge
// These are calculated based on the grid layout proportions
const LEFT_PATHS = [
  'M 220 76 C 244 76, 252 210, 268 210',
  'M 220 142 C 248 142, 256 210, 268 210',
  'M 220 210 L 268 210',
  'M 220 278 C 248 278, 256 210, 268 210',
  'M 220 344 C 244 344, 252 210, 268 210',
]

const RIGHT_PATHS = [
  'M 736 210 C 752 210, 756 148, 784 148',
  'M 736 210 L 784 210',
  'M 736 210 C 752 210, 756 272, 784 272',
]

function Blueprint() {
  return (
    <>
      <style>{BLUEPRINT_CSS}</style>
      <div className="bp-wrap">
        {/* Registration marks */}
        <div className="bp-reg bp-reg--tl" />
        <div className="bp-reg bp-reg--tr" />
        <div className="bp-reg bp-reg--bl" />
        <div className="bp-reg bp-reg--br" />

        {/* Title block */}
        <div className="bp-titleblock">
          <div className="bp-titleblock__title">HYPER SYSTEMS — DATA ARCHITECTURE</div>
          <div className="bp-titleblock__cell">
            <span className="bp-titleblock__label">Project</span>
            <span className="bp-titleblock__value">DATA-ARCH</span>
          </div>
          <div className="bp-titleblock__cell">
            <span className="bp-titleblock__label">Rev</span>
            <span className="bp-titleblock__value">3.2</span>
          </div>
          <div className="bp-titleblock__cell">
            <span className="bp-titleblock__label">Scale</span>
            <span className="bp-titleblock__value">1 : 1</span>
          </div>
          <div className="bp-titleblock__cell">
            <span className="bp-titleblock__label">Sheet</span>
            <span className="bp-titleblock__value">1 OF 1</span>
          </div>
        </div>

        <div className="bp-grid">
          {/* Left column — data sources */}
          <div className="bp-col">
            <div className="bp-col-label">Data Sources</div>
            {DATA_SOURCES.map((s, i) => (
              <motion.div
                key={s.name}
                className="bp-node"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * .08, duration: .45, ease: [.25, .1, .25, 1] }}
              >
                <div className="bp-node-accent" style={{ background: s.color }} />
                <div className="bp-node-icon" style={{ color: s.color }}>
                  <s.icon size={18} />
                </div>
                <span className="bp-node-name">{s.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Mobile connector: sources → platform */}
          <div className="bp-mobile-connector">
            <div className="bp-mobile-connector__line" />
            <span className="bp-mobile-connector__label">DATA SYNC</span>
            <div className="bp-mobile-connector__line" />
          </div>

          {/* Center — platform */}
          <motion.div
            className="bp-platform"
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .25, duration: .5, ease: [.25, .1, .25, 1] }}
          >
            <div className="bp-platform-corner bp-platform-corner--tl" />
            <div className="bp-platform-corner bp-platform-corner--tr" />
            <div className="bp-platform-corner bp-platform-corner--bl" />
            <div className="bp-platform-corner bp-platform-corner--br" />

            <div className="bp-plat-sec">
              <div className="bp-plat-lbl">Data Ingestion Layer</div>
              <div className="bp-plat-name">HyperFlow</div>
            </div>

            <div className="bp-plat-divider">
              <div className="bp-plat-divider-dot" />
            </div>

            <div className="bp-plat-sec">
              <div className="bp-plat-lbl">Storage &amp; Query Engine</div>
              <div className="bp-plat-name">HyperStore</div>
            </div>
          </motion.div>

          {/* Mobile connector: platform → outputs */}
          <div className="bp-mobile-connector">
            <div className="bp-mobile-connector__line" />
            <span className="bp-mobile-connector__label">QUERY LAYER</span>
            <div className="bp-mobile-connector__line" />
          </div>

          {/* Right column — outputs */}
          <div className="bp-col">
            <div className="bp-col-label">Outputs</div>
            {OUTPUTS.map((o, i) => (
              <motion.div
                key={o.name}
                className="bp-node"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: .4 + i * .08, duration: .45, ease: [.25, .1, .25, 1] }}
              >
                <div className="bp-node-icon" style={{ color: o.color }}>
                  <o.icon size={18} />
                </div>
                <span className="bp-node-name">{o.name}</span>
              </motion.div>
            ))}
          </div>

          {/* SVG connections layer */}
          <svg className="bp-svg" viewBox="0 0 1004 420" preserveAspectRatio="none">
            <defs>
              <filter id="bp-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ghost solid paths behind the dashed ones */}
            {LEFT_PATHS.map((d, i) => (
              <path key={`ls${i}`} className="bp-conn-solid" d={d} />
            ))}
            {RIGHT_PATHS.map((d, i) => (
              <path key={`rs${i}`} className="bp-conn-solid" d={d} />
            ))}

            {/* Dashed animated paths */}
            {LEFT_PATHS.map((d, i) => (
              <path key={`ld${i}`} className="bp-conn" d={d} />
            ))}
            {RIGHT_PATHS.map((d, i) => (
              <path key={`rd${i}`} className="bp-conn" d={d} />
            ))}

            {/* Junction dots at platform edges */}
            <circle className="bp-junction" cx="268" cy="210" r="3" />
            <circle className="bp-junction" cx="736" cy="210" r="3" />

            {/* Flowing particle dots along left paths */}
            {LEFT_PATHS.map((d, i) => (
              <circle
                key={`lp${i}`}
                r="2.5"
                fill="#1a3a5c"
                filter="url(#bp-glow)"
                opacity="0"
              >
                <animateMotion
                  dur={`${2.2 + i * .3}s`}
                  repeatCount="indefinite"
                  begin={`${i * .5}s`}
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
                <animate
                  attributeName="opacity"
                  values="0;.6;.6;0"
                  keyTimes="0;0.05;0.85;1"
                  dur={`${2.2 + i * .3}s`}
                  repeatCount="indefinite"
                  begin={`${i * .5}s`}
                />
              </circle>
            ))}

            {/* Flowing particle dots along right paths */}
            {RIGHT_PATHS.map((d, i) => (
              <circle
                key={`rp${i}`}
                r="2.5"
                fill="#1a3a5c"
                filter="url(#bp-glow)"
                opacity="0"
              >
                <animateMotion
                  dur={`${2.5 + i * .3}s`}
                  repeatCount="indefinite"
                  begin={`${1.5 + i * .6}s`}
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
                <animate
                  attributeName="opacity"
                  values="0;.6;.6;0"
                  keyTimes="0;0.05;0.85;1"
                  dur={`${2.5 + i * .3}s`}
                  repeatCount="indefinite"
                  begin={`${1.5 + i * .6}s`}
                />
              </circle>
            ))}
          </svg>

          {/* Annotations */}
          <div className="bp-ann" style={{ top: '8%', left: '23%' }}>DATA SYNC</div>
          <div className="bp-ann" style={{ bottom: '6%', left: '23%' }}>ETL PIPELINE</div>
          <div className="bp-ann" style={{ top: '24%', right: '17%' }}>QUERY LAYER</div>
        </div>
      </div>
    </>
  )
}

export function AUDataFlowVariants() {
  return (
    <section className="au-dataflow" id="solutions" aria-label="How your data flows">
      <div className="au-container">
        <ScrollReveal>
          <div className="au-dataflow__header">
            <p className="au-section-label">The solution</p>
            <h2 className="au-dataflow__title">{solution.headline}</h2>
            <p className="au-dataflow__subtitle">{solution.subheadline}</p>
          </div>
        </ScrollReveal>

        <Blueprint />

        <ScrollReveal delay={0.15}>
          <div className="au-dataflow__products">
            {solution.products.map((product) => (
              <div key={product.name} className="au-dataflow__product">
                <h3 className="au-dataflow__product-name">{product.name}</h3>
                <p className="au-dataflow__product-tagline">{product.tagline}</p>
                <p className="au-dataflow__product-desc">{product.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
