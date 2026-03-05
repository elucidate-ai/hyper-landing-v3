import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

// Synchronous imports — no lazy loading for SSR
import AuthorityPage from './pages/authority/AuthorityPage'
import IndustryPage from './pages/industry/IndustryPage'

// Synchronous industry content imports
import { retailContent } from './data/industries/retail'
import { propertyContent } from './data/industries/property'
import { motorContent } from './data/industries/motor'
import { logisticsContent } from './data/industries/logistics'

/**
 * All routes that should be statically prerendered at build time.
 */
export const routes: string[] = [
  '/',
  '/authority',
  '/retail',
  '/property',
  '/motor',
  '/logistics',
]

/**
 * Per-route SEO metadata, consumed by the prerender script to inject
 * <title>, <meta description>, OG tags, etc. into each static page.
 */
export const routesMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Hypr | Dedicated Data Engineering', description: 'Dedicated data engineering for mid-market companies.' },
  '/authority': { title: 'Hypr | Dedicated Data Engineering', description: 'Dedicated data engineering for mid-market companies.' },
  '/retail': { title: retailContent.siteMetadata.title, description: retailContent.siteMetadata.description },
  '/property': { title: propertyContent.siteMetadata.title, description: propertyContent.siteMetadata.description },
  '/motor': { title: motorContent.siteMetadata.title, description: motorContent.siteMetadata.description },
  '/logistics': { title: logisticsContent.siteMetadata.title, description: logisticsContent.siteMetadata.description },
}

/**
 * Render the app for a given URL path, returning an HTML string.
 * Called by the prerender script during `vite build --ssr`.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<AuthorityPage />} />
          <Route path="/authority" element={<AuthorityPage />} />
          <Route path="/retail" element={<IndustryPage content={retailContent} />} />
          <Route path="/property" element={<IndustryPage content={propertyContent} />} />
          <Route path="/motor" element={<IndustryPage content={motorContent} />} />
          <Route path="/logistics" element={<IndustryPage content={logisticsContent} />} />
        </Routes>
      </StaticRouter>
    </StrictMode>
  )
}
