import { useRef, useCallback, useEffect } from 'react'
import { usePostHog, PostHogCaptureOnViewed } from '@posthog/react'
import { ContentProvider } from '../../data/ContentContext'
import { defaultContent } from '../../data/content'
import './authority.css'
import { SkipToContent } from '../../shared/components/SkipToContent'
import { AUNav } from './components/AUNav'
import { AUHero } from './components/AUHero'
import { AUProblem } from './components/AUProblem'
import { AUDataFlowVariants } from './components/AUDataFlowVariants'
import { AUStatsWall } from './components/AUStatsWall'
import { AUTestimonials } from './components/AUTestimonials'
import { AUProcess } from './components/AUProcess'
import { AUComparisonMatrix } from './components/AUComparisonMatrix'
import { AUSecurity } from './components/AUSecurity'
import { AUFinalCta } from './components/AUFinalCta'
import { AUContactModal, type ContactModalHandle } from './components/AUContactModal'

export default function AuthorityPage() {
  const posthog = usePostHog()
  const contactRef = useRef<ContactModalHandle>(null)
  const openContact = useCallback(() => contactRef.current?.open(), [])

  useEffect(() => {
    posthog?.register({ page_variant: 'authority' })
  }, [posthog])

  return (
    <ContentProvider content={defaultContent}>
      <div data-page="authority">
        <SkipToContent />

        <AUNav />

        <main id="main-content">
          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'hero' }}>
            <AUHero onOpenContact={openContact} />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'problem' }}>
            <AUProblem />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'solutions' }}>
            <AUDataFlowVariants />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'stats' }}>
            <AUStatsWall />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'testimonials' }}>
            <AUTestimonials />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'process' }}>
            <AUProcess />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'comparison' }}>
            <AUComparisonMatrix />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'security' }}>
            <AUSecurity />
          </PostHogCaptureOnViewed>

          <PostHogCaptureOnViewed name="section_viewed" properties={{ section: 'final_cta' }}>
            <AUFinalCta onOpenContact={openContact} />
          </PostHogCaptureOnViewed>
        </main>

        <AUContactModal ref={contactRef} />
      </div>
    </ContentProvider>
  )
}
