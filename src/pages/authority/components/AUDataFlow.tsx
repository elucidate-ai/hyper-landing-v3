import { solution } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

const DATA_SOURCES = [
  { logo: 'SF', name: 'Salesforce' },
  { logo: 'HS', name: 'HubSpot' },
  { logo: 'SAP', name: 'SAP' },
  { logo: 'QB', name: 'QuickBooks' },
  { logo: 'GS', name: 'Google Sheets' },
]

const OUTPUTS = [
  { logo: 'BI', name: 'Dashboards' },
  { logo: 'AI', name: 'AI & ML' },
  { logo: 'RPT', name: 'Reports' },
]

function ArrowIndicator() {
  return (
    <div className="au-dataflow__arrows">
      <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden="true">
        <path d="M0 6h28m0 0l-4-4m4 4l-4 4" stroke="#8899aa" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export function AUDataFlow() {
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

        <ScrollReveal delay={0.1}>
          <div className="au-dataflow__visual">
            {/* Source column */}
            <div className="au-dataflow__column">
              {DATA_SOURCES.map((source) => (
                <div key={source.name} className="au-dataflow__node">
                  <span className="au-dataflow__node-logo">{source.logo}</span>
                  <span>{source.name}</span>
                </div>
              ))}
            </div>

            {/* Center: arrows + platform */}
            <div className="au-dataflow__center">
              <ArrowIndicator />

              <div className="au-dataflow__platform">
                <div className="au-dataflow__platform-block">
                  <div className="au-dataflow__platform-name">HyperFlow</div>
                  <div className="au-dataflow__platform-desc">Connect &amp; Sync</div>
                </div>
                <div className="au-dataflow__platform-block">
                  <div className="au-dataflow__platform-name">HyperStore</div>
                  <div className="au-dataflow__platform-desc">Store &amp; Query</div>
                </div>
              </div>

              <ArrowIndicator />
            </div>

            {/* Output column */}
            <div className="au-dataflow__column au-dataflow__column--right">
              {OUTPUTS.map((output) => (
                <div key={output.name} className="au-dataflow__node">
                  <span className="au-dataflow__node-logo">{output.logo}</span>
                  <span>{output.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Product detail cards */}
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
