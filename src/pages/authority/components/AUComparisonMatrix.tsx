import { comparison } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

function CellValue({ value, isHyperCol }: { value: string; isHyperCol: boolean }) {
  if (value === '✓') {
    return <span className="au-comparison__check">✓</span>
  }
  if (value === '✗') {
    return <span className="au-comparison__cross">✗</span>
  }
  if (value === '~') {
    return <span className="au-comparison__partial">~</span>
  }
  // Dollar signs (cost row)
  if (value.match(/^\$+$/)) {
    return (
      <span className={`au-comparison__cost${isHyperCol ? ' au-comparison__check' : ''}`}>
        {value}
      </span>
    )
  }
  return <>{value}</>
}

export function AUComparisonMatrix() {
  return (
    <section className="au-comparison" aria-label="Comparison matrix">
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
              <caption>
                Comparison of Hyper vs Databricks vs DIY approach
              </caption>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col" className="au-comparison__hyper-col">
                    Hyper
                  </th>
                  <th scope="col">Databricks</th>
                  <th scope="col">DIY</th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.capability}</td>
                    <td className="au-comparison__hyper-col">
                      <CellValue value={row.hyper} isHyperCol={true} />
                    </td>
                    <td className="au-comparison__other-col">
                      <CellValue value={row.databricks} isHyperCol={false} />
                    </td>
                    <td className="au-comparison__other-col">
                      <CellValue value={row.diy} isHyperCol={false} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
