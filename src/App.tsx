import { Suspense, lazy, useEffect, useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import logoSvg from '../assets/logo-blue.svg'

const AuthorityPage = lazy(() => import('./pages/authority/AuthorityPage'))

function LoadingFallback() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#f8f7f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-live="polite"
      aria-busy="true"
    >
      <img
        src={logoSvg}
        alt="Hypr"
        style={{ height: 36, opacity: 0.6 }}
      />
    </div>
  )
}

function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoaded(true)
    const timer = setTimeout(() => setVisible(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return <>{children}</>

  return (
    <>
      {children}
      <div
        ref={ref}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#f8f7f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loaded ? 0 : 1,
          transform: loaded ? 'scale(1.15)' : 'scale(1)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          pointerEvents: 'none',
        }}
      >
        <img
          src={logoSvg}
          alt=""
          style={{
            height: 36,
            opacity: loaded ? 0 : 0.6,
            transform: loaded ? 'scale(1.4)' : 'scale(1)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        />
      </div>
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <SplashWrapper>
          <Routes>
            <Route path="/" element={<AuthorityPage />} />
            <Route path="/authority" element={<AuthorityPage />} />
          </Routes>
        </SplashWrapper>
      </Suspense>
    </>
  )
}
