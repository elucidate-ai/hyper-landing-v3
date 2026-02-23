import { useRef, useCallback, useEffect } from 'react'
import { results } from '../../../data/content'
import { ScrollReveal } from '../../../shared/components/ScrollReveal'

export function AUTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const rafRef = useRef(0)

  const updateDots = useCallback((index: number) => {
    const dots = dotsRef.current
    if (!dots) return
    const buttons = dots.querySelectorAll<HTMLButtonElement>('.au-testimonials__dot')
    buttons.forEach((btn, i) => {
      btn.classList.toggle('au-testimonials__dot--active', i === index)
    })
  }, [])

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollRef.current
      if (!el) return
      const cards = el.querySelectorAll<HTMLElement>('.au-testimonial')
      if (cards.length === 0) return
      const containerLeft = el.getBoundingClientRect().left
      let closest = 0
      let minDist = Infinity
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - containerLeft)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      if (closest !== activeRef.current) {
        activeRef.current = closest
        updateDots(closest)
      }
    })
  }, [updateDots])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('.au-testimonial')
    if (index >= cards.length) return
    const containerLeft = el.getBoundingClientRect().left
    const cardLeft = cards[index].getBoundingClientRect().left
    const offset = cardLeft - containerLeft + el.scrollLeft
    el.scrollTo({ left: offset, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    updateDots(0)
  }, [updateDots])

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

          <div className="au-testimonials__dots" ref={dotsRef}>
            {results.testimonials.map((_, i) => (
              <button
                key={i}
                className={`au-testimonials__dot${i === 0 ? ' au-testimonials__dot--active' : ''}`}
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
