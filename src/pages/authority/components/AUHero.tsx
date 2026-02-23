import { hero } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'
import { IsometricBlocks } from './hero-graphics/IsometricBlocks'
import logoSvg from '../../../../assets/logo-blue.svg'

interface AUHeroProps {
  onOpenContact?: () => void
}

export function AUHero({ onOpenContact }: AUHeroProps) {
  return (
    <section className="au-hero" aria-label="Hero">
      <div className="au-container au-hero__inner">
        <div className="au-hero__content">
          <ScrollReveal delay={0}>
            <p className="au-hero__eyebrow">
              <img src={logoSvg} alt="" className="au-hero__eyebrow-logo" />
              {hero.eyebrow}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="au-hero__headline">{hero.headline}</h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="au-hero__subheadline">{hero.subheadline}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="au-hero__ctas">
              {hero.ctas.map((cta) =>
                cta.action === 'contact-form' ? (
                  <button
                    key={cta.label}
                    type="button"
                    className={`au-btn au-btn--${cta.variant}`}
                    onClick={onOpenContact}
                  >
                    {cta.label}
                  </button>
                ) : (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className={`au-btn au-btn--${cta.variant}`}
                  >
                    {cta.label}
                  </a>
                )
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15} className="au-hero__diagram">
          <IsometricBlocks />
        </ScrollReveal>
      </div>
    </section>
  )
}
