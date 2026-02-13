import { process } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

export function AUProcess() {
  return (
    <section className="au-process" id="process" aria-label="Our process">
      <div className="au-container">
        <ScrollReveal>
          <div className="au-process__header">
            <p className="au-section-label">The process</p>
            <h2 className="au-process__title">{process.headline}</h2>
            <p className="au-process__subtitle">{process.subheadline}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="au-process__grid">
            {process.stages.map((stage, i) => (
              <div key={i} className="au-process__step">
                <div className="au-process__step-number">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="au-process__step-phase">{stage.phase}</div>
                <h3 className="au-process__step-headline">{stage.headline}</h3>
                <p className="au-process__step-desc">{stage.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
