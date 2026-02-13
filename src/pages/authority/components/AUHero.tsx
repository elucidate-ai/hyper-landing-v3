import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { hero } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'
import { AUDiagnosticModal } from './AUDiagnosticModal'

/**
 * Animated data-flow network SVG.
 * Sharp-cornered rectangles, grid lines, and connection paths
 * that animate on entrance with Framer Motion.
 */
function HeroVisual() {
  const gridLines = [0, 70, 140, 210, 280, 350, 420]
  const gridCols = [0, 80, 160, 240, 320, 400, 480]

  const sources = [
    { x: 60, y: 70, label: 'CRM' },
    { x: 60, y: 150, label: 'ERP' },
    { x: 60, y: 230, label: 'CLOUD' },
    { x: 60, y: 310, label: 'FILES' },
    { x: 60, y: 380, label: 'APIs' },
  ]

  const outputs = [
    { x: 420, y: 110, label: 'BI' },
    { x: 420, y: 210, label: 'AI' },
    { x: 420, y: 310, label: 'REPORTS' },
  ]

  // Connection paths from sources to hub
  const sourcePaths = [
    'M 80 70 C 140 70, 170 140, 195 170',
    'M 80 150 C 130 150, 160 170, 195 190',
    'M 80 230 C 130 230, 160 220, 195 210',
    'M 80 310 C 130 310, 160 250, 195 230',
    'M 80 380 C 120 380, 160 280, 195 250',
  ]

  // Connection paths from hub to outputs
  const outputPaths = [
    'M 285 180 C 330 180, 370 130, 400 110',
    'M 285 210 C 340 210, 370 210, 400 210',
    'M 285 240 C 330 240, 370 290, 400 310',
  ]

  return (
    <motion.div
      className="au-hero__visual"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <svg
        viewBox="0 0 480 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background grid */}
        {gridLines.map((y) => (
          <motion.line
            key={`h-${y}`}
            x1="0" y1={y} x2="480" y2={y}
            className="au-hero-grid-line"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        ))}
        {gridCols.map((x) => (
          <motion.line
            key={`v-${x}`}
            x1={x} y1="0" x2={x} y2="420"
            className="au-hero-grid-line"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        ))}

        {/* Source connection paths */}
        {sourcePaths.map((d, i) => (
          <motion.path
            key={`sp-${i}`}
            d={d}
            className="au-hero-path"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
          />
        ))}

        {/* Output connection paths */}
        {outputPaths.map((d, i) => (
          <motion.path
            key={`op-${i}`}
            d={d}
            className="au-hero-path"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.1, ease: 'easeOut' }}
          />
        ))}

        {/* Central hub */}
        <motion.rect
          x="195" y="150" width="90" height="120" rx="2"
          stroke="#1a3a5c" strokeWidth="2" fill="#ffffff"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          style={{ transformOrigin: '240px 210px' }}
        />
        {/* Hub divider */}
        <motion.line
          x1="195" y1="210" x2="285" y2="210"
          stroke="#1a3a5c" strokeWidth="1" opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.0 }}
        />
        {/* Hub labels */}
        <motion.text
          x="240" y="188" textAnchor="middle"
          className="au-hero-label--accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
        >
          HyperFlow
        </motion.text>
        <motion.text
          x="240" y="240" textAnchor="middle"
          className="au-hero-label--accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          HyperStore
        </motion.text>

        {/* Source nodes — sharp rectangles */}
        {sources.map((s, i) => (
          <motion.g key={`s-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          >
            <rect
              x={s.x - 8} y={s.y - 8} width="16" height="16" rx="2"
              className={i % 2 === 0 ? 'au-hero-node--filled' : 'au-hero-node--accent'}
            />
            <text
              x={s.x + 16} y={s.y + 4}
              className="au-hero-label"
            >
              {s.label}
            </text>
          </motion.g>
        ))}

        {/* Output nodes */}
        {outputs.map((o, i) => (
          <motion.g key={`o-${i}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.08, duration: 0.4 }}
          >
            <rect
              x={o.x - 8} y={o.y - 8} width="16" height="16" rx="2"
              className={i % 2 === 0 ? 'au-hero-node--filled' : 'au-hero-node--accent'}
            />
            <text
              x={o.x - 16} y={o.y + 4}
              className="au-hero-label"
              textAnchor="end"
            >
              {o.label}
            </text>
          </motion.g>
        ))}

        {/* Ambient pulsing dots on paths */}
        <circle cx="140" cy="100" r="2.5" className="au-hero-node--filled au-hero-pulse" />
        <circle cx="150" cy="210" r="2.5" className="au-hero-node--filled au-hero-pulse au-hero-pulse--delay-1" />
        <circle cx="340" cy="170" r="2.5" className="au-hero-node--filled au-hero-pulse au-hero-pulse--delay-2" />
        <circle cx="350" cy="270" r="2.5" className="au-hero-node--filled au-hero-pulse au-hero-pulse--delay-3" />
      </svg>
    </motion.div>
  )
}

export function AUHero() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <section className="au-hero" aria-label="Hero">
        <div className="au-container au-hero__inner">
          <div className="au-hero__content">
            <ScrollReveal delay={0}>
              <p className="au-hero__eyebrow">{hero.eyebrow}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="au-hero__headline">{hero.headline}</h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="au-hero__subheadline">{hero.subheadline}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="au-hero__ctas">
                <a href="#contact" className="au-btn au-btn--primary">
                  {hero.ctas[0].label}
                </a>
                <button
                  type="button"
                  className="au-btn au-btn--secondary"
                  onClick={openModal}
                >
                  {hero.ctas[1].label}
                </button>
              </div>
            </ScrollReveal>
          </div>

          <HeroVisual />
        </div>
      </section>

      <AUDiagnosticModal open={modalOpen} onClose={closeModal} />
    </>
  )
}
