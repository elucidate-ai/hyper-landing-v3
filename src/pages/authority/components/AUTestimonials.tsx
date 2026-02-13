import { results } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

export function AUTestimonials() {
  return (
    <section className="au-testimonials" id="results" aria-label="Testimonials">
      <div className="au-container">
        <ScrollReveal>
          <div className="au-testimonials__header">
            <p className="au-section-label">What our clients say</p>
            <h2 className="au-testimonials__title">{results.headline}</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="au-testimonials__grid">
            {results.testimonials.map((testimonial, i) => (
              <div key={i} className="au-testimonial">
                <div className="au-testimonial__quote-mark" aria-hidden="true">&ldquo;</div>
                <p className="au-testimonial__text">{testimonial.quote}</p>

                {testimonial.result && (
                  <div className="au-testimonial__result">{testimonial.result}</div>
                )}

                <div className="au-testimonial__author">
                  <div className="au-testimonial__author-name">{testimonial.author}</div>
                  <div className="au-testimonial__author-role">
                    {testimonial.title}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
