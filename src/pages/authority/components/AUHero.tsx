import { Link } from 'react-router-dom'
import { useContent } from '../../../data/ContentContext'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'
import { IsometricBlocks } from './hero-graphics/IsometricBlocks'
import logoSvg from '../../../../assets/logo-blue.svg'

interface AUHeroProps {
  onOpenContact?: () => void
}

export function AUHero({ onOpenContact }: AUHeroProps) {
  const { hero } = useContent()

  function renderLinkCta(label: string, href: string, variant: 'primary' | 'secondary' | 'tertiary') {
    const className = `au-btn au-btn--${variant}`

    if (href.startsWith('/')) {
      return (
        <Link key={label} to={href} className={className}>
          {label}
        </Link>
      )
    }

    return (
      <a key={label} href={href} className={className}>
        {label}
      </a>
    )
  }

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
                  renderLinkCta(cta.label, cta.href, cta.variant)
                )
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15} className="au-hero__diagram">
          <IsometricBlocks />
        </ScrollReveal>
      </div>

      <a
        href="https://www.elucidate.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="au-hero__elucidate"
      >
        <span className="au-hero__elucidate-text">a product of</span>
        <img
          src="/assets/primary-logo-blue.svg"
          alt="Elucidate"
          className="au-hero__elucidate-logo"
        />
      </a>
    </section>
  )
}
