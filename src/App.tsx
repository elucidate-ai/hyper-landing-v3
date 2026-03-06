import { Suspense, lazy, useEffect, useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import type { SiteContent } from './data/content-types'
import logoSvg from '../assets/logo-blue.svg'

const AuthorityPage = lazy(() => import('./pages/authority/AuthorityPage'))
const IndustryPage = lazy(() => import('./pages/industry/IndustryPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Lazy-load industry content to keep main bundle small
const industryModules: Record<string, () => Promise<{ default?: SiteContent } & Record<string, SiteContent>>> = {
  retail: () => import('./data/industries/retail').then((m) => ({ retailContent: m.retailContent }) as never),
  property: () => import('./data/industries/property').then((m) => ({ propertyContent: m.propertyContent }) as never),
  motor: () => import('./data/industries/motor').then((m) => ({ motorContent: m.motorContent }) as never),
  logistics: () => import('./data/industries/logistics').then((m) => ({ logisticsContent: m.logisticsContent }) as never),
}

const contentKeys: Record<string, string> = {
  retail: 'retailContent',
  property: 'propertyContent',
  motor: 'motorContent',
  logistics: 'logisticsContent',
}

function IndustryRoute({ industry }: { industry: string }) {
  const [content, setContent] = useState<SiteContent | null>(null)

  useEffect(() => {
    const loader = industryModules[industry]
    if (!loader) return
    loader().then((mod) => {
      const key = contentKeys[industry]
      setContent((mod as Record<string, SiteContent>)[key])
    })
  }, [industry])

  if (!content) return <LoadingFallback />
  return <IndustryPage content={content} />
}

/**
 * Resolve industry from subdomain hostname.
 * e.g. retail.usehypr.com → "retail"
 */
function resolveIndustryFromHost(): string | null {
  const host = window.location.hostname
  const match = host.match(/^(retail|property|motor|logistics)\./)
  return match ? match[1] : null
}

function SubdomainRedirect() {
  const industry = resolveIndustryFromHost()
  if (industry) {
    return <IndustryRoute industry={industry} />
  }
  return <AuthorityPage />
}

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
            <Route path="/" element={<SubdomainRedirect />} />
            <Route path="/authority" element={<AuthorityPage />} />
            <Route path="/retail" element={<IndustryRoute industry="retail" />} />
            <Route path="/property" element={<IndustryRoute industry="property" />} />
            <Route path="/motor" element={<IndustryRoute industry="motor" />} />
            <Route path="/logistics" element={<IndustryRoute industry="logistics" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SplashWrapper>
      </Suspense>
    </>
  )
}
