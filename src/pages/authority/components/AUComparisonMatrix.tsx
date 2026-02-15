import { useRef, useState, useCallback } from 'react'
import { comparison } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

const metricIcons = [
  // Clock — Deployment
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="7.25" /><path d="M9 5v4l2.5 2.5" /></svg>,
  // Users — Team size
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6.5" cy="5.5" r="2.25" /><path d="M2 15v-1a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4v1" /><circle cx="13" cy="6" r="1.75" /><path d="M13.5 10a3.5 3.5 0 0 1 2.5 3.35V15" /></svg>,
  // Coins — Monthly cost
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1.75v14.5M12.5 4.5H7.25a2.5 2.5 0 0 0 0 5h3.5a2.5 2.5 0 0 1 0 5H5" /></svg>,
  // Wrench — Maintenance
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11.5 2.5a4.25 4.25 0 0 0-4 5.65L3 12.65V15h2.35l4.5-4.5A4.25 4.25 0 1 0 11.5 2.5z" /></svg>,
]

export function AUComparisonMatrix() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const cardWidth = el.scrollWidth / comparison.approaches.length
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(index, comparison.approaches.length - 1))
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / comparison.approaches.length
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
  }, [])

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

        <ScrollReveal delay={0.1}>
          <div
            className="au-comparison__cards"
            ref={scrollRef}
            onScroll={onScroll}
          >
            {comparison.approaches.map((approach, i) => (
              <article
                key={i}
                className={`au-comparison__card${approach.highlighted ? ' au-comparison__card--highlighted' : ''}`}
              >
                <div className="au-comparison__card-head">
                  <span className="au-comparison__card-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="au-comparison__card-name">{approach.name}</h3>
                  <p className="au-comparison__card-tagline">{approach.tagline}</p>
                </div>

                <div className="au-comparison__metrics">
                  {approach.metrics.map((metric, j) => (
                    <div key={j} className="au-comparison__metric">
                      <div className="au-comparison__metric-left">
                        <span className="au-comparison__metric-icon" aria-hidden="true">
                          {metricIcons[j]}
                        </span>
                        <span className="au-comparison__metric-label">{metric.label}</span>
                      </div>
                      <span className="au-comparison__metric-value">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <div className="au-comparison__best-for">
                  <span className="au-comparison__best-for-label">Best for</span>
                  <span className="au-comparison__best-for-text">{approach.bestFor}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="au-comparison__dots">
            {comparison.approaches.map((_, i) => (
              <button
                key={i}
                className={`au-comparison__dot${i === activeIndex ? ' au-comparison__dot--active' : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
