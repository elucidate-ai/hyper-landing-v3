import { useRef, useState, useCallback } from 'react'
import { results } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

export function AUTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const cardWidth = el.scrollWidth / results.testimonials.length
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(index, results.testimonials.length - 1))
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / results.testimonials.length
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
  }, [])

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
          <div
            className="au-testimonials__grid"
            ref={scrollRef}
            onScroll={onScroll}
          >
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

          <div className="au-testimonials__dots">
            {results.testimonials.map((_, i) => (
              <button
                key={i}
                className={`au-testimonials__dot${i === activeIndex ? ' au-testimonials__dot--active' : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
