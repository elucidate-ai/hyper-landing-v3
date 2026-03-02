import { useRef, useEffect } from 'react'
import { useContent } from '../../../data/ContentContext'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'
import {
  setupGsapScroll,
  gsap,
} from '../../../shared/utils/gsapScrollSetup'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

/**
 * Parse a stat value like "5 weeks", "20+ hours/week", "60-70%", "95%+"
 * into a numeric target and the text around it.
 */
function parseStat(value: string): {
  prefix: string
  number: number
  suffix: string
} {
  const match = value.match(/^(.*?)(\d+(?:\.\d+)?)(.*?)$/)
  if (!match) return { prefix: '', number: 0, suffix: value }

  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  }
}

export function AUStatsWall() {
  const { results } = useContent()
  const sectionRef = useRef<HTMLElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    setupGsapScroll()

    const ctx = gsap.context(() => {
      results.stats.forEach((stat, i) => {
        const el = valueRefs.current[i]
        if (!el) return

        const parsed = parseStat(stat.value)
        const obj = { val: 0 }

        gsap.to(obj, {
          val: parsed.number,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate() {
            const isInteger = Number.isInteger(parsed.number)
            const displayNum = isInteger
              ? Math.round(obj.val)
              : obj.val.toFixed(1)
            el.textContent = `${parsed.prefix}${displayNum}${parsed.suffix}`
          },
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [prefersReducedMotion])

  return (
    <section
      className="au-stats"
      ref={sectionRef}
      aria-label="Key statistics"
    >
      <ScrollReveal>
        <div className="au-stats__grid">
          {results.stats.map((stat, i) => (
            <div key={i} className="au-stats__item">
              <div
                className="au-stats__value"
                ref={(el) => {
                  valueRefs.current[i] = el
                }}
                aria-label={`${stat.value} ${stat.label}`}
              >
                {prefersReducedMotion ? stat.value : '0'}
              </div>
              <div className="au-stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
