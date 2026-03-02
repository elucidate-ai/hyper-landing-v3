import { useRef, useCallback, useEffect } from 'react'
import type { SiteContent } from '../../data/content-types'
import { ContentProvider } from '../../data/ContentContext'
import '../authority/authority.css'
import { SkipToContent } from '../../shared/components/SkipToContent'
import { AUNav } from '../authority/components/AUNav'
import { AUHero } from '../authority/components/AUHero'
import { AUProblem } from '../authority/components/AUProblem'
import { AUDataFlowVariants } from '../authority/components/AUDataFlowVariants'
import { AUStatsWall } from '../authority/components/AUStatsWall'
import { AUTestimonials } from '../authority/components/AUTestimonials'
import { AUProcess } from '../authority/components/AUProcess'
import { AUComparisonMatrix } from '../authority/components/AUComparisonMatrix'
import { AUSecurity } from '../authority/components/AUSecurity'
import { AUFinalCta } from '../authority/components/AUFinalCta'
import { AUContactModal, type ContactModalHandle } from '../authority/components/AUContactModal'

export default function IndustryPage({ content }: { content: SiteContent }) {
  const contactRef = useRef<ContactModalHandle>(null)
  const openContact = useCallback(() => contactRef.current?.open(), [])

  useEffect(() => {
    document.title = content.siteMetadata.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', content.siteMetadata.description)
    }
  }, [content.siteMetadata])

  return (
    <ContentProvider content={content}>
      <div data-page="authority">
        <SkipToContent />

        <AUNav />

        <main id="main-content">
          <AUHero onOpenContact={openContact} />

          <AUProblem />

          <AUDataFlowVariants />

          <AUStatsWall />

          <AUTestimonials />

          <AUProcess />

          <AUComparisonMatrix />

          <AUSecurity />

          <AUFinalCta onOpenContact={openContact} />
        </main>

        <AUContactModal ref={contactRef} />
      </div>
    </ContentProvider>
  )
}
