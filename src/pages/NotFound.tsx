import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logoSvg from '../../assets/logo-blue.svg'
import './notfound.css'

function FloatingShapes() {
  return (
    <div className="nf-shapes" aria-hidden="true">
      {/* Angular fragments referencing the Hypr logo geometry */}
      <svg className="nf-shape nf-shape--1" viewBox="0 0 120 120" fill="none">
        <path d="M0 0L120 0L120 80L0 120Z" fill="currentColor" />
      </svg>
      <svg className="nf-shape nf-shape--2" viewBox="0 0 80 80" fill="none">
        <path d="M0 0L80 0L40 80Z" fill="currentColor" />
      </svg>
      <svg className="nf-shape nf-shape--3" viewBox="0 0 100 100" fill="none">
        <path d="M50 0L100 50L50 100L0 50Z" fill="currentColor" />
      </svg>
      <svg className="nf-shape nf-shape--4" viewBox="0 0 60 120" fill="none">
        <path d="M0 0L60 40L60 120L0 80Z" fill="currentColor" />
      </svg>
      <svg className="nf-shape nf-shape--5" viewBox="0 0 90 90" fill="none">
        <path d="M0 0L90 0L90 90Z" fill="currentColor" />
      </svg>
      <svg className="nf-shape nf-shape--6" viewBox="0 0 70 70" fill="none">
        <rect width="70" height="70" fill="currentColor" />
      </svg>
    </div>
  )
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = '404 — Page Not Found | Hypr'
    return () => { document.title = 'Hypr' }
  }, [])

  // Subtle parallax on mouse move
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      container.style.setProperty('--mx', `${x}`)
      container.style.setProperty('--my', `${y}`)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="nf" ref={containerRef} data-page="not-found">
      <div className="nf-grid-bg" aria-hidden="true" />

      <header className="nf-header">
        <Link to="/" className="nf-brand" aria-label="Hypr — return home">
          <img src={logoSvg} alt="" className="nf-brand__logo" />
          <span className="nf-brand__name">Hypr</span>
        </Link>
      </header>

      <FloatingShapes />

      <main className="nf-main">
        <div className="nf-content">
          <span className="nf-label">Error 404</span>
          <h1 className="nf-number">404</h1>
          <p className="nf-message">
            This page has drifted beyond our reach.
          </p>
          <div className="nf-actions">
            <Link to="/" className="nf-btn nf-btn--primary">
              Back to Home
            </Link>
            <button
              type="button"
              className="nf-btn nf-btn--secondary"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </main>

      <footer className="nf-footer">
        <span className="nf-footer__text">
          &copy; {new Date().getFullYear()} Elucidate Technology Ltd.
        </span>
      </footer>
    </div>
  )
}
