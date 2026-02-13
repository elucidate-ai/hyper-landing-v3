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

        <ScrollReveal delay={0.1}>
          <div className="au-problem__grid">
            {problem.painPoints.map((point, i) => (
              <div key={i} className="au-problem__card">
                <div className="au-problem__card-number">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="au-problem__card-headline">{point.headline}</h3>
                <p className="au-problem__card-body">{point.body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="au-problem__transition">{problem.transition}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
