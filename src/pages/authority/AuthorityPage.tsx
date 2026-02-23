import { useRef, useCallback } from 'react'
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
  const contactRef = useRef<ContactModalHandle>(null)
  const openContact = useCallback(() => contactRef.current?.open(), [])

  return (
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
  )
}
