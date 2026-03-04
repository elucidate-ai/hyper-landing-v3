import { useState, useCallback, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../../../data/ContentContext'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'

const metricIcons = [
  // Hourglass — Time to first insight
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5.25 2.25h7.5M5.25 15.75h7.5M5.75 2.25a5.25 5.25 0 0 0 3.25 4.85A5.25 5.25 0 0 0 12.25 2.25M5.75 15.75a5.25 5.25 0 0 1 3.25-4.85 5.25 5.25 0 0 1 3.25 4.85" /></svg>,
  // Dollar sign — Total cost of ownership
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1.75v14.5M12.5 4.5H7.25a2.5 2.5 0 0 0 0 5h3.5a2.5 2.5 0 0 1 0 5H5" /></svg>,
  // Lightning bolt — Ongoing iteration speed
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 1.75 4.5 10.25H9l-1 6 5.5-8.5H10l1-6z" /></svg>,
  // Warning triangle — Risk of project failure
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6.75v2.5M9 12.25h.007M7.58 2.98 1.63 13.27a1.25 1.25 0 0 0 1.08 1.86h11.58a1.25 1.25 0 0 0 1.08-1.86L9.42 2.98a1.25 1.25 0 0 0-1.84 0z" /></svg>,
  // Graduation cap — Expertise included
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2.25 1.5 6.75 9 11.25l7.5-4.5L9 2.25zM4.5 8.85v4.5L9 15.75l4.5-2.4v-4.5" /></svg>,
  // Unlocked padlock — Switching cost / lock-in
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3.75" y="8.25" width="10.5" height="7.5" rx="1.5" /><path d="M6 8.25V5.25a3 3 0 0 1 5.87-.87" /></svg>,
]

const panelVariants = {
  enter: (skip: boolean) => skip ? {} : { opacity: 0, y: 8 },
  center: (skip: boolean) => skip ? {} : { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: (skip: boolean) => skip ? {} : { opacity: 0, y: -8, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export function AUComparisonMatrix() {
  const { comparison } = useContent()
  const approaches = comparison.approaches
  const metrics = approaches[0].metrics
  const reducedMotion = useReducedMotion()

  const [activeTab, setActiveTab] = useState(() => {
    const hlIndex = approaches.findIndex(a => a.highlighted)
    return hlIndex >= 0 ? hlIndex : 0
  })

  const handleTabKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    const current = Array.from(tabs).findIndex(t => t === document.activeElement)
    if (current < 0) return

    let next = current
    switch (e.key) {
      case 'ArrowRight': next = (current + 1) % tabs.length; break
      case 'ArrowLeft': next = (current - 1 + tabs.length) % tabs.length; break
      case 'Home': next = 0; break
      case 'End': next = tabs.length - 1; break
      default: return
    }
    e.preventDefault()
    tabs[next].focus()
    setActiveTab(next)
  }, [])

  const active = approaches[activeTab]
  const panelId = `comparison-panel-${activeTab}`
  const tabId = (i: number) => `comparison-tab-${i}`

  return (
    <section className="au-comparison" aria-label="Comparison">
      <div className="au-container">
        <ScrollReveal>
          <div className="au-comparison__header">
            <p className="au-section-label">Compare</p>
            <h2 className="au-comparison__title">{comparison.headline}</h2>
            <p className="au-comparison__subtitle">{comparison.subheadline}</p>
          </div>
        </ScrollReveal>

        {/* Desktop table layout (hidden on mobile) */}
        <ScrollReveal delay={0.1}>
          <div className="au-comparison__table-wrap">
            <table className="au-comparison__table">
              <thead>
                <tr>
                  <th className="au-comparison__table-corner" />
                  {approaches.map((a, i) => (
                    <th
                      key={i}
                      className={`au-comparison__table-th${a.highlighted ? ' au-comparison__table-th--hl' : ''}`}
                    >
                      {a.highlighted && <span className="au-comparison__table-th-badge">Recommended</span>}
                      <span className="au-comparison__table-th-name">{a.name}</span>
                      <span className="au-comparison__table-th-tag">{a.tagline}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((_, mi) => (
                  <tr key={mi} className="au-comparison__table-row">
                    <td className="au-comparison__table-label">
                      <span className="au-comparison__table-label-icon" aria-hidden="true">{metricIcons[mi]}</span>
                      {metrics[mi].label}
                    </td>
                    {approaches.map((a, ai) => (
                      <td
                        key={ai}
                        className={`au-comparison__table-cell${a.highlighted ? ' au-comparison__table-cell--hl' : ''}`}
                      >
                        {a.metrics[mi].value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Mobile tab layout (hidden on desktop) */}
        <ScrollReveal delay={0.1}>
          <div className="au-comparison__mobile">
            {/* Tab bar */}
            <div
              className="au-comparison__tabs"
              role="tablist"
              aria-label="Compare approaches"
              onKeyDown={handleTabKeyDown}
            >
              {approaches.map((a, i) => (
                <button
                  key={i}
                  id={tabId(i)}
                  role="tab"
                  aria-selected={i === activeTab}
                  aria-controls={panelId}
                  tabIndex={i === activeTab ? 0 : -1}
                  className={`au-comparison__tab${i === activeTab ? ' au-comparison__tab--active' : ''}${a.highlighted ? ' au-comparison__tab--hl' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  <span className="au-comparison__tab-name">{a.name}</span>
                  {a.highlighted && i === activeTab && (
                    <span className="au-comparison__tab-badge">Recommended</span>
                  )}
                </button>
              ))}
            </div>

            {/* Panel */}
            <AnimatePresence mode="wait" custom={reducedMotion}>
              <motion.div
                key={activeTab}
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId(activeTab)}
                className={`au-comparison__panel${active.highlighted ? ' au-comparison__panel--hl' : ''}`}
                custom={reducedMotion}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="au-comparison__panel-header">
                  <span className="au-comparison__panel-tagline">{active.tagline}</span>
                </div>
                <ul className="au-comparison__metric-list">
                  {active.metrics.map((m, mi) => (
                    <li key={mi} className="au-comparison__metric-item">
                      <span className="au-comparison__metric-icon" aria-hidden="true">{metricIcons[mi]}</span>
                      <span className="au-comparison__metric-label">{m.label}</span>
                      <span className={`au-comparison__metric-value${active.highlighted ? ' au-comparison__metric-value--hl' : ''}`}>{m.value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
