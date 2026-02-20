import { finalCta } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

interface AUFinalCtaProps {
  onOpenContact?: () => void
}

export function AUFinalCta({ onOpenContact }: AUFinalCtaProps) {
  return (
    <section className="au-final-cta" id="contact" aria-label="Call to action">
      <div className="au-container" style={{ position: 'relative' }}>
        <ScrollReveal>
          <div className="au-final-cta__badge">{finalCta.badge}</div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="au-final-cta__headline">{finalCta.headline}</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="au-final-cta__sub">{finalCta.subheadline}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="au-final-cta__buttons">
            {finalCta.ctas.map((cta) => {
              const btnClass =
                cta.variant === 'primary'
                  ? 'au-btn au-btn--primary-inverted'
                  : 'au-btn au-btn--secondary-inverted'
              return cta.action === 'contact-form' ? (
                <button
                  key={cta.label}
                  type="button"
                  className={btnClass}
                  onClick={onOpenContact}
                >
                  {cta.label}
                </button>
              ) : (
                <a key={cta.label} href={cta.href} className={btnClass}>
                  {cta.label}
                </a>
              )
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="au-final-cta__badges">
            {finalCta.trustBadges.map((badge) => (
              <span key={badge} className="au-final-cta__trust-badge">
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
