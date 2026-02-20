import { comparison } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

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

export function AUComparisonMatrix() {
  const approaches = comparison.approaches
  const metrics = approaches[0].metrics

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
                <tr className="au-comparison__table-row au-comparison__table-row--best">
                  <td className="au-comparison__table-label">Best for</td>
                  {approaches.map((a, ai) => (
                    <td
                      key={ai}
                      className={`au-comparison__table-cell au-comparison__table-cell--best${a.highlighted ? ' au-comparison__table-cell--hl' : ''}`}
                    >
                      {a.bestFor}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
