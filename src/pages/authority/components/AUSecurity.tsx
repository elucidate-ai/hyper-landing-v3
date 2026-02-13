import { security } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

/**
 * Custom SVG icons for each security feature.
 * Avoids generic lucide icons — these are purpose-built.
 */
function SecurityIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  switch (name) {
    case 'SOC 2 Type II':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2l7 4v6c0 5.25-3.5 9.75-7 11-3.5-1.25-7-5.75-7-11V6l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'GDPR Compliant':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 'HIPAA Ready':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      )
    case 'AES-256 Encryption':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      )
    case 'Role-Based Access':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'Data Residency':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2l7 4v6c0 5.25-3.5 9.75-7 11-3.5-1.25-7-5.75-7-11V6l7-4z" />
        </svg>
      )
  }
}

export function AUSecurity() {
  return (
    <section className="au-security" id="security" aria-label="Data safety">
      <div className="au-container">
        <div className="au-security__inner">
          <ScrollReveal>
            <div className="au-security__content">
              <p className="au-section-label">Data safety</p>
              <h2 className="au-security__title">{security.headline}</h2>
              <p className="au-security__subtitle">{security.subheadline}</p>
              <div className="au-security__trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2l7 4v6c0 5.25-3.5 9.75-7 11-3.5-1.25-7-5.75-7-11V6l7-4z" />
                </svg>
                SOC 2 Type II Certified
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="au-security__grid">
              {security.features.map((feature, i) => (
                <div key={i} className="au-security__card">
                  <div className="au-security__card-icon">
                    <SecurityIcon name={feature.name} />
                  </div>
                  <div>
                    <h3 className="au-security__card-name">{feature.name}</h3>
                    <p className="au-security__card-desc">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
