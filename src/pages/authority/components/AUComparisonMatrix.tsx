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
