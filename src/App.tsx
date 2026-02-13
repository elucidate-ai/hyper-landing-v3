import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

const AuthorityPage = lazy(() => import('./pages/authority/AuthorityPage'))

function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-live="polite"
      aria-busy="true"
    >
      <span style={{ opacity: 0.4, fontSize: '0.875rem', letterSpacing: '0.05em' }}>
        Loading...
      </span>
    </div>
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
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AuthorityPage />} />
          <Route path="/authority" element={<AuthorityPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
