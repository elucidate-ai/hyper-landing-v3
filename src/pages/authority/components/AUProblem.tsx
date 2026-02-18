import { problem } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

export function AUProblem() {
  return (
    <section className="au-problem" aria-label="The problem">
      <div className="au-container">
        <ScrollReveal>
          <div className="au-problem__header">
            <p className="au-section-label">The problem</p>
            <h2 className="au-problem__title">{problem.headline}</h2>
          </div>
        </ScrollReveal>

        <div className="au-problem__list">
          {problem.painPoints.map((point, i) => (
            <ScrollReveal key={i} delay={0.08 * (i + 1)}>
              <div className="au-problem__item">
                <span className="au-problem__item-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="au-problem__item-headline">{point.headline}</h3>
                <ul className="au-problem__fragments">
                  {point.fragments.map((frag, j) => (
                    <li key={j} className="au-problem__fragment" dangerouslySetInnerHTML={{ __html: frag }} />
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
