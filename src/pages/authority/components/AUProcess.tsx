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

        <div className="au-process__timeline">
          {/* Horizontal connector line (desktop) / Vertical connector (mobile) */}
          <div className="au-process__connector" aria-hidden="true">
            <div className="au-process__connector-track" />
            <div className="au-process__connector-fill" />
          </div>

          {process.stages.map((stage, i) => (
            <ScrollReveal key={i} delay={0.08 + i * 0.12} className="au-process__step-wrapper">
              <div className="au-process__step">
                {/* Timeline node marker */}
                <div className="au-process__node" aria-hidden="true">
                  <span className="au-process__node-ring" />
                  <span className="au-process__node-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content card */}
                <div className="au-process__card">
                  <div className="au-process__step-meta">
                    <span className="au-process__step-phase">{stage.phase}</span>
                    {stage.duration && (
                      <span className="au-process__step-duration">{stage.duration}</span>
                    )}
                  </div>
                  <h3 className="au-process__step-headline">{stage.headline}</h3>
                  <p className="au-process__step-desc">{stage.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
