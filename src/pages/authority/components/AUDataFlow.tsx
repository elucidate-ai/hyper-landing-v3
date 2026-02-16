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

function ArrowIndicator() {
  return (
    <motion.div
      className="au-dataflow__arrows"
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden="true">
        <path d="M0 6h28m0 0l-4-4m4 4l-4 4" stroke="#8899aa" strokeWidth="1.5" />
      </svg>
    </motion.div>
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

        <div className="au-dataflow__visual">
          {/* Source column */}
          <div className="au-dataflow__column">
            {DATA_SOURCES.map((source, i) => (
              <motion.div
                key={source.name}
                className="au-dataflow__node"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ borderColor: '#1a3a5c', y: -2 }}
                whileTap={{ borderColor: '#1a3a5c', y: -1 }}
              >
                <span className="au-dataflow__node-icon">
                  <source.icon size={20} color={source.color} />
                </span>
                <span>{source.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Center: arrows + platform */}
          <div className="au-dataflow__center">
            <ArrowIndicator />

            <motion.div
              className="au-dataflow__platform"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="au-dataflow__platform-block">
                <div className="au-dataflow__platform-name">HyperFlow</div>
                <div className="au-dataflow__platform-desc">Connect &amp; Sync</div>
              </div>
              <div className="au-dataflow__platform-block">
                <div className="au-dataflow__platform-name">HyperStore</div>
                <div className="au-dataflow__platform-desc">Store &amp; Query</div>
              </div>
            </motion.div>

            <ArrowIndicator />
          </div>

          {/* Output column */}
          <div className="au-dataflow__column au-dataflow__column--right">
            {OUTPUTS.map((output, i) => (
              <motion.div
                key={output.name}
                className="au-dataflow__node"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ borderColor: '#1a3a5c', y: -2 }}
                whileTap={{ borderColor: '#1a3a5c', y: -1 }}
              >
                <span className="au-dataflow__node-icon">
                  <output.icon size={20} color={output.color} />
                </span>
                <span>{output.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

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
